import React from 'react'
import { withRouter } from "react-router";
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
    this.props.onRef(this)
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
      openKeys : arr,
      selectKeys : [val]
    })
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
    const list = this.props.store1.routes.length ? this.props.store1.routes : List[2].children
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
    if(arr.length && arr.length !== val.length){
      this.props.history.replace('/404')
      document.title = '404'
    }else{
      document.title = arr.length ? arr[arr.length - 1].name || '' : List.find(t => t.path === val[0]).name
    }
    this.props.store1.setCrumbData(arr)
    let lastData = arr[arr.length - 1] || '';
    this.checkRouteBytags(lastData)
  }

  //判断当前route是否存在tags中
  checkRouteBytags = (val)=>{
    let { tags } = this.props.store1
    tags = tags.filter(t => t)
    const item = tags.find(item=>item.path === val.path)
    const index = tags.findIndex(item=>item.path === val.path)
    if(!item){
      this.props.store1.setTags([...tags,val])
    }
    this.props.store1.setActiveKey(index !== -1 ? index : tags.length)
  }

  //动态生成submenu
  ReturnMenu = (props) => {
    const list = props.list.length ? props.list : List[2].children
    return (
      list.map((item,index)=>{
        if(item.children && item.children.length && !item.hideMenu){
          return (
              <SubMenu key={item.path} icon={ item.icon ? <span role="img" aria-label="team" className="anticon anticon-team"><SvgIcon iconClass={item.icon} /></span> : null} title={item.name}>
                {
                  this.ReturnMenu({list:item.children})
                }
              </SubMenu>
          )
        }else{
          return (
              <Menu.Item key={item.path} icon={ item.icon ?
                  <span role="img" aria-label="team" className="anticon anticon-team"><SvgIcon iconClass={item.icon}/></span> : null} onClick={()=>this.props.history.push(item.Redirect ? item.Redirect : item.path)}>{item.name}</Menu.Item>
          )
        }
      })
    )
  }

  //手风琴效果(可展开收起)
  onOpenChange = keys => {
    const { list } = this.props
    const lists = list && list.length ? list : List[2].children
    const { openKeys } = this.state
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (lists.findIndex(listItem => listItem.path === latestOpenKey) === -1) {
      this.setState({
        openKeys : keys
      })
    } else {
      this.setState({
        openKeys : latestOpenKey ? [latestOpenKey] : []
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
              mode="inline"
              selectedKeys={this.state.selectKeys}
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

export default withRouter(JzMenu)
