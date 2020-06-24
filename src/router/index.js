import Loadable from 'react-loadable';

//路由代码分割
const loadable = (filename) => Loadable({
  loader:() => import(`@/views/${filename}`),
  loading:() => (null)
});

//路由列表
const routesList = [
  {
    path:'/app',
    name:'首页',
    component:loadable('app'),
    Redirect:'/app/index',
    children:[
      {
        path:'/app/index',
        name:'index',
        component:loadable('app/index')
      },
    ]
  },
  {
    path:'/login',
    name:'登录',
    component:loadable('login'),
  }
];

export default routesList;