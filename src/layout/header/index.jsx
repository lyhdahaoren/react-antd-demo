import React from "react";
//面包屑
import Crumb from "./crumb";
import Rightmenu from './rightmenu'
import {Layout} from "antd";
const { Header } = Layout;

export default function (props) {
return(
      <Header className="site-layout-background1" style={{ position: 'sticky', top: 0, left: 0 }}>
        <Crumb></Crumb>
        <Rightmenu>
123
        </Rightmenu>
      </Header>
  )
}
