import React from "react";
import { Avatar, Menu, Dropdown } from "antd";
import { withRouter } from "react-router";
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import { RightMenu } from "../../styledComponents/layout";
import Cookie from 'js-cookie'
import {inject, observer} from "mobx-react";

@inject('user','store1','setting')
@observer
class Rightmenu extends React.PureComponent{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props)
  }

  menu = () => {
    return (
        <Menu>
          <Menu.Item key="0">
            <a href="http://www.alipay.com/">修改密码</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="http://www.taobao.com/">布局设置</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={() => this.loginOut()}>退出登录</Menu.Item>
        </Menu>
    )
  };

  loginOut = ()=> {
    this.props.store1.clearTags()
    this.props.store1.setActiveKey(0)
    Cookie.remove('token')
    this.props.history.replace('/login')
  }

  render() {
    const { info } = this.props.user
    return(
      <RightMenu>
        {
          this.props.children
        }
        <Dropdown overlay={()=>this.menu()} trigger={['click']}>
          <div>
            <Avatar size={40} icon={<UserOutlined />} />
            <span style={{margin: '0 10px'}}>{info.username}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </RightMenu>
    )
  }
}

export default withRouter(Rightmenu)
