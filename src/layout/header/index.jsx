import React from "react";
// 面包屑
import Crumb from "./crumb";
import Rightmenu from "./rightmenu";
import { Layout } from "antd";
import { inject, observer } from "mobx-react";

const { Header } = Layout;

@inject("setting")
@observer
class Headers extends React.Component {
  render() {
    return (
      <Header className="site-layout-background1">
        <Crumb></Crumb>
        <Rightmenu></Rightmenu>
      </Header>
    );
  }
}

export default Headers;
