import Loadable from 'react-loadable';
//路由代码分割
const loadable = (filename) => Loadable({
  loader:() => import(`@/views/${filename}`),
  loading:() => (null)
});

//路由列表
const routesList = [
  {
    path:'/login',
    name:'登录',
    exact:true,
    component:loadable('login'),
  },
  {
    path:'/404',
    name:'页面未找到',
    exact:true,
    component:loadable('noMatch'),
  },
  {
    path:'/500',
    name:'无权限访问',
    exact:true,
    component:loadable('noAuth'),
  },
  {
    path:'/',
    name:'框架',
    component:loadable('apps'),
    Redirect: '/index',
    children:[
      {
        path:'/index',
        meta:{
          name: '123'
        },
        exact:true,
        icon: 'saas',
        name:'首页',
        component:loadable('app/index'),
      },
      {
        path:'/comp',
        meta:{
          name: '123'
        },
        icon: 'component',
        name:'组件',
        component:loadable('app/comp/base'),
        children: [
          {
            path:'/comp/charts',
            meta:{
              name: '123'
            },
            exact:true,
            icon: 'chart',
            name:'图表',
            component:loadable('app/comp/chart/chart'),
          },
          {
            path:'/comp/drop',
            meta:{
              name: '123'
            },
            exact:true,
            icon: 'chart',
            name:'列表拖拽',
            component:loadable('app/comp/drop/sortable'),
          },
        ]
      }
    ]
  }
];

export default routesList;
