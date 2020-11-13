import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
// 引入路由list
import routesList from "@/router";

// 路由组件
import Routes from "@/router/route";

// 国际化
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

// icon
import "@/assets/icon";

// mobx
import { Provider } from "mobx-react";
import store from "@/store";
moment.locale("zh-cn");

ReactDOM.render(
  // 是否开启严格模式
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <Provider {...store}>
      <Router>
        <Routes routesList={routesList} />
      </Router>
    </Provider>
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
