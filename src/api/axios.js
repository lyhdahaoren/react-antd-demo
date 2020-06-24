import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie'

//封装统一axios类，后续可持续集成，针对不同后端接口 不同返回机制做封装
class initAxios {
    constructor(u){
        this.url = u;
        this.Instance = null;
        this.isRefreshing = false;//token是否失效
        this.subscribers = [];
        this.init()
        this.configs = {}
        // this.reLoad = null;
    }
    init(){
        const Instance = axios.create();
        // Alter defaults after instance has been created
        Instance.defaults.baseURL = this.url;
        Instance.defaults.timeout = 10000;
        Instance.defaults.maxContentLength = 1000;
        Instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Instance.defaults.paramsSerializer = function (params) {
            return qs.stringify(params, {
                arrayFormat: 'brackets'
            })
        }
        // 携带不同源的cookie数据
        Instance.defaults.withCredentials = true;
        // Add a request interceptor
        Instance.interceptors.request.use(this.requestUse.bind(this), (error) => {
            return Promise.reject(error);
        });
        // Add a response interceptor
        Instance.interceptors.response.use(this.responseUse.bind(this), (error) => {
            // Toast.info('network error', 2);
            return Promise.reject({msg:'出错'+error});
        });
        this.Instance = Instance;
    }

    //Instance

    returnInstance(){
        return this.Instance;
    }

    //自行添加
    addSomeConfig(obj){
        this.configs = Object.assign(this.configs,obj);
    }

    //token失效换取新token，并把所有的错误接口重新发送
    async checkToken(){
        let d = await this.Instance.get('/token/replace',{params:{token:Cookies.get('token')}});
        Cookies.set('token',d.data.token);
        this.isRefreshing = false;
        this.subscribers.map((item)=>item());
        this.subscribers = [];
    }
    //添加token失效期间发出的请求
    addSubscriber(type,url,data,callback){
        this.subscribers.push(async function() {
            let a = await this.Instance[type](url,type == 'get' ?  {params:data} : data);
            callback(a)
        }.bind(this))
    }

    //暴露post方法，在拦截请求前，拦截请求后做相应的事
    async post(url,data,callback = ()=>{}){
        //请求前判断是否token失效锁
        if(this.isRefreshing){
            this.addSubscriber('post',url,data,callback);
        }else{
            //token未失效发送请求
            let a = await this.Instance.post(url,data);
            //promise axios response拦截后 继续拦截相应token失效接口并保存，调用换token方法
            if (a.code == '500006' && !this.isRefreshing) {
                this.addSubscriber('post',url,data,callback);
                this.isRefreshing = true;
                this.checkToken();
            }else{
                callback(a);
                return a;
            }
        }
    }

    //get是否与post 合并为一个request方法？？
    async get(url,params,callback = ()=>{}){
        if(this.isRefreshing){
            this.addSubscriber('get',url,params,callback);
        }else{
            let a = await this.Instance.get(url,{params});
            if (a.code == '500006' && !this.isRefreshing) {
                this.addSubscriber('get',url,params,callback);
                this.isRefreshing = true;
                this.checkToken();
            }else{
                callback(a)
            }
        }
    }

    requestUse(config){
        if(config.method == 'get'){
            if (typeof config.params != 'object') {
                config.params = {}
            }
            config.params['token'] = Cookies.get('token') || '';
        }else{
            if (typeof config.data != 'object') {
                config.data = {}
            }
            config.data.token = Cookies.get('token') || '';
        }
        if(this.configs['request']) this.configs['request'](config);
        return config;
    }

    async responseUse(response){
        //做一些基础响应判断
        return response.data;
    }
}

export default initAxios;