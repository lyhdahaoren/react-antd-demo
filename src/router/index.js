import Loadable from "react-loadable";
// 路由代码分割
const loadable = (filename) =>
  Loadable({
    loader: () => import(`@/views/${filename}`),
    loading: () => null,
  });

// 路由列表
const routesList = [
  {
    path: "/login",
    name: "登录",
    exact: true,
    component: loadable("login"),
  },
  {
    path: "/404",
    name: "页面未找到",
    exact: true,
    component: loadable("noMatch"),
  },
  {
    path: "/500",
    name: "无权限访问",
    exact: true,
    component: loadable("noAuth"),
  },
  {
    path: "/",
    name: "框架",
    component: loadable("apps"),
    Redirect: "/index",
    children: [
      {
        path: "/index",
        meta: {
          name: "123",
        },
        exact: true,
        icon: "saas",
        name: "首页",
        component: loadable("app/index"),
      },
      {
        path: "/shop",
        meta: {
          name: "123",
        },
        icon: "shop",
        name: "商户管理",
        component: loadable("app/shop/base"),
        children: [
          {
            path: "/shop/list",
            meta: {
              name: "123",
            },
            exact: true,
            name: "商户列表",
            component: loadable("app/shop/list"),
          },
          {
            path: "/shop/list/add",
            meta: {
              name: "123",
            },
            hideMenu: true,
            exact: true,
            name: "添加商户",
            component: loadable("app/shop/add"),
          },
        ],
      },
      {
        path: "/approval",
        meta: {
          name: "123",
        },
        icon: "approval",
        name: "审批管理",
        component: loadable("app/approval/base"),
        children: [
          {
            path: "/approval/list",
            meta: {
              name: "123",
            },
            exact: true,
            name: "待审批商户",
            component: loadable("app/approval/list"),
          },
        ],
      },
    ],
  },
];

export default routesList;
