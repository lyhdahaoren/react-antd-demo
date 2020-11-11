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
    path:'/',
    name:'框架',
    component:loadable('apps'),
    Redirect: '/a',
    children:[
      {
        path:'/a',
        meta:{
          name: '123'
        },
        exact:true,
        icon: 'saas',
        name:'撒旦法历史肯定会发给德里克发过火撒旦法历史肯定会发给德里克发过火',
        component:loadable('app/index'),
      },
      {
        path:'/e',
        meta:{
          name: '123'
        },
        exact:true,
        icon: 'saas',
        name:'撒旦法历史肯定会发给德里克发过火',
        component:loadable('app/index'),
      },
      {
        path:'/f',
        meta:{
          name: '123'
        },
        exact:true,
        icon: 'saas',
        name:'首页',
        component:loadable('app/index'),
      },
      {
        path:'/b',
        meta:{
          name: '123'
        },
        icon: 'saas',
        name:'我是个栏目',
        component:loadable('app/index'),
        children:[
          {
            path: '/b/a',
            name: '我是个栏目的子栏目',
            component:loadable('page'),
          }
        ]
      },
      {
        path:'/c',
        meta:{
          name: '123'
        },
        icon: 'saas',
        name:'我是个栏目1',
        component:loadable('app/index'),
        children:[
          {
            path: '/c/b',
            Redirect:'/c/b/a',
            name: '我是个栏目1的子栏目1（我重定向到了列表页）',
            hideMenu:true,
            children: [
              {
                path: '/c/b/a',
                name: '我是个栏目1的子栏目1的列表，但是我隐藏了（列表，详情，新增，修改）',
                component:loadable('page'),
              },{
                path: '/c/b/b',
                name: '我是个栏目1的子栏目1的详情，但是我隐藏了（列表，详情，新增，修改）',
                component:loadable('page'),
              }
            ],
            component:loadable('page'),
          },
        ]
      },
      {
        path:'/d',
        meta:{
          name: '123'
        },
        icon: 'saas',
        name:'dashboard',
        component:loadable('app/index'),
        children:[
          {
            path: '/d/ba',
            name: '123123',
            component:loadable('page'),
            children:[
              {
                path: '/d/ba/a',
                name: '123123',
                component:loadable('page'),
              }
            ]
          },
          {
            path: '/d/bb',
            name: '123123',
            component:loadable('page'),
          }
        ]
      },
    ]
  }
];

export default routesList;
