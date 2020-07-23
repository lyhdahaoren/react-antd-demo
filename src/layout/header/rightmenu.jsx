import React from "react";
import { Avatar, Menu, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import { RightMenu } from "../../styledComponents/layout";

const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">修改密码</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">布局设置</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">退出登录</Menu.Item>
    </Menu>
);


class Rightmenu extends React.PureComponent{
  constructor(props) {
    super(props);
  }
  render() {
    return(
        <RightMenu>
          {
            this.props.children
          }
          <Dropdown overlay={menu} trigger={['click']}>
            <div>
              <Avatar size={40} icon={<UserOutlined />} />
              <span style={{margin: '0 10px'}}>我是你爸爸~</span>
              <DownOutlined />
            </div>
          </Dropdown>
        </RightMenu>
    )
  }
}

export default Rightmenu
