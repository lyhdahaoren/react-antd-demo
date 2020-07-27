import React from "react";
//面包屑
import Crumb from "./crumb";
import Rightmenu from './rightmenu'
import {Layout} from "antd";
const { Header } = Layout;

export default function (props) {
return(
      <Header className="site-layout-background1">
        <Crumb></Crumb>
        <Rightmenu>
          <div className='add' style={{marginRight:'10px'}}>
            我是很多增加的按钮
          </div>
        </Rightmenu>
      </Header>
  )
}
