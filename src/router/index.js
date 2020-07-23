import Loadable from 'react-loadable';
//路由代码分割
const loadable = (filename) => Loadable({
  loader:() => import(`@/views/${filename}`),
  loading:() => (null)
});

//路由列表
const routesList = [
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
        name:'dashboard',
        component:loadable('app/index'),
      },
      {
        path:'/b',
        meta:{
          name: '123'
        },
        icon: 'saas',
        name:'dashboard',
        component:loadable('app/index'),
        children:[
          {
            path: '/b/a',
            name: '123123',
            component:loadable('login'),
          }
        ]
      },
      {
        path:'/c',
        meta:{
          name: '123'
        },
        icon: 'saas',
        name:'dashboard',
        component:loadable('app/index'),
        children:[
          {
            path: '/c/b',
            name: '123123',
            component:loadable('login'),
          }
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
            component:loadable('login'),
            children:[
              {
                path: '/d/ba/a',
                name: '123123',
                component:loadable('login'),
              },
              {
                path: '/d/ba/b',
                name: '123123',
                component:loadable('login'),
                children:[
                  {
                    path: '/d/ba/b/a',
                    name: '123123',
                    component:loadable('login'),
                  },
                  {
                    path: '/d/ba/b/b',
                    name: '123123',
                    component:loadable('login'),
                    children:[
                      {
                        path: '/d/ba/b/b/a',
                        name: '123123',
                        component:loadable('login'),
                      },
                      {
                        path: '/d/ba/b/b/b',
                        name: '123123',
                        component:loadable('login'),
                        children:[
                          {
                            path: '/d/ba/b/b/b/a',
                            name: '123123',
                            component:loadable('login'),
                          }
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
          },
          {
            path: '/d/bb',
            name: '123123',
            component:loadable('login')
          }
        ]
      },
    ]
  },
  {
    path:'/login',
    name:'登录',
    exact:true,
    component:loadable('login'),
  }
];

export default routesList;
