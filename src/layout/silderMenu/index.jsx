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
    unListen : '',
    selectKeys: [],
    openKeys : [],
    crumbData : []
  }

  componentDidMount() {
    this.changeStatus(this.props.location.pathname)
    if(this.state.unListen) return;
    this.state.unListen = this.props.history.listen((val)=>{
      this.changeStatus(val.pathname)
    })
  }

  componentWillUnmount() {
    // 取消监听
    this.state.unListen && this.state.unListen();
  }

  //初始或者路由切换触发面包屑 导航栏变化
  changeStatus = (val) => {
    const arr = this.getFaterRoute(val);
    this.setState({
      openKeys : arr
    })
    console.log('我是', val)
    this.setState({
      selectKeys : [val]
    });
    this.computedCrumbData(arr);
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

  //同步面包屑，同步tags
  computedCrumbData = (val)=> {
    const list = this.props.store1.routes.length ? this.props.store1.routes : List[1].children
    let arr = [];
    let faterRoute = list;
    val.map(item=>{
      for(let i = 0; i < faterRoute.length; i++) {
        if(faterRoute[i].path === item){
          arr.push({
            name: faterRoute[i].name,
            path: faterRoute[i].path
          })
          faterRoute = faterRoute[i].children || [];
          break;
        }
      }
    })
    console.log('面包屑', arr)
    this.props.store1.setCrumbData(arr)
    let lastData = arr[arr.length - 1] || '';
    this.checkRouteBytags(lastData)
  }

  //判断当前route是否存在tags中

  checkRouteBytags = (val)=>{
    let { tags } = this.props.store1
    if(!tags.find(item=>item.path === val.path)){
      this.props.store1.setTags([...tags,val])
    }
  }

  //动态生成submenu
  ReturnMenu = (props) => {
    const list = props.list.length ? props.list : List[1].children
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
              selectedKeys={this.state.selectKeys}
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
