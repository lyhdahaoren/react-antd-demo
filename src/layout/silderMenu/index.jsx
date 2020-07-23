import React from 'react'
import { Menu } from "antd";
import { MenuContent } from "./indexStyle";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';

import List from '@/router'
import {inject, observer} from "mobx-react";

import SvgIcon from "../../components/public/svg";

const { SubMenu } = Menu;


@inject('store1')
@observer
class JzMenu extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
    openKeys : [],
    crumbData : []
  }

  componentWillMount() {
    const arr = this.getFaterRoute(this.props.location.pathname);
    this.setState({
      openKeys : arr
    })
    this.computedCrumbData(arr);
  }

  componentDidMount() {
    this.props.history.listen((val)=>{
      const arr = this.getFaterRoute(val.pathname);
      console.log('霸霸们', arr)
      this.computedCrumbData(arr);
    })
  }

  //获取当前路由的父级们
  getFaterRoute = (val)=> {
    let defaultArr = [];
    val.split('/').filter((item,index) => index !== 0).map(item=>{
      const last = defaultArr[defaultArr.length - 1] || '';
      defaultArr.push(`${last}/${item}`)
    })
    return defaultArr
  }
  //同步面包屑
  computedCrumbData = (val)=> {
    const list = this.props.store1.routes.length ? this.props.store1.routes : List[0].children
    let arr = [];
    let faterRoute = list;
    val.map(item=>{
      for(let i = 0; i < faterRoute.length; i++) {
        if(faterRoute[i].path === item){
          arr.push({
            name: faterRoute[i].name,
            path: faterRoute[i].path
          })
          faterRoute = faterRoute[i].children;
          break;
        }
      }
    })
    console.log('面包屑', arr)
    this.props.store1.setCrumbData(arr)

  }

  //动态生成submenu
  ReturnMenu = (props) => {
    const list = props.list.length ? props.list : List[0].children
    return (
      list.map((item,index)=>{
        if(item.children && item.children.length){
          return (
              <SubMenu key={item.path} icon={ item.icon ? <SvgIcon iconClass={item.icon} /> : <MailOutlined />} title={item.name}>
                {
                  this.ReturnMenu({list:item.children})
                }
              </SubMenu>
          )
        }else{
          return (
              <Menu.Item key={item.path} icon={item.icon || <MailOutlined />} onClick={()=>this.props.history.push(`${item.path}`)}>{item.name}</Menu.Item>
          )
        }
      })
    )
  }

  //手风琴效果(可展开收起)
  onOpenChange = openKeys => {
    let latestOpenKey = '';
    if(openKeys.length < this.state.openKeys.length){
      latestOpenKey = this.state.openKeys.find(key => openKeys.indexOf(key) === -1);
    }else{
      latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    }
    if(latestOpenKey){
      const aboutLast = openKeys.filter(i => latestOpenKey.indexOf(i) !== -1)
      this.setState({
        openKeys : aboutLast
      })
    }
  };

  render() {
    return(
        <MenuContent>
          <div className="logo">桔子数科</div>
          <Menu
              // onClick={this.handleClick}
              theme={'dark'}
              defaultSelectedKeys={[this.props.location.pathname]}
              mode="inline"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
          >
            {
              this.ReturnMenu({list:this.props.store1.routes})
            }
          </Menu>
        </MenuContent>
    )
  }
}

export default JzMenu
