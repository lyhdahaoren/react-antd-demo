import React from "react";
import { Avatar, Menu, Dropdown } from "antd";
import { withRouter } from "react-router";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { RightMenu } from "../../styledComponents/layout";
import Cookie from "js-cookie";
import { inject, observer } from "mobx-react";
import SvgIcon from "@/components/public/svg";

@inject("user", "store1", "setting")
@observer
class Rightmenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  menu = () => {
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">修改密码</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1" onClick={() => this.loginOut()}>
          退出登录
        </Menu.Item>
      </Menu>
    );
  };

  changeTheme(val) {
    this.props.setting.setTheme(val === "dark" ? "light" : "dark");
  }
  changeTags(val) {
    this.props.setting.setOpenTags(!val);
  }
  DropMeau = (setting) => {
    const _this = this;
    return (
      <Menu>
        <Menu.Item key="0" onClick={() => _this.changeTags(setting.isOpenTags)}>
          {setting.isOpenTags ? "关闭页签" : "开启页签"}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1" onClick={() => _this.changeTheme(setting.theme)}>
          {setting.theme === "dark" ? "亮色导航" : "暗色导航"}
        </Menu.Item>
      </Menu>
    );
  };
  loginOut = () => {
    this.props.store1.clearTags();
    this.props.store1.setActiveKey(0);
    Cookie.remove("token");
    this.props.history.replace("/login");
  };

  render() {
    const { info } = this.props.user;
    const { setting } = this.props;
    return (
      <RightMenu>
        {this.props.children}
        <Dropdown overlay={() => this.DropMeau(setting)} trigger={["click"]}>
          <div className="add">
            <SvgIcon
              iconClass="settings"
              style={{ color: "#8a8a8a", fontSize: "25" }}
            ></SvgIcon>
          </div>
        </Dropdown>
        <Dropdown overlay={() => this.menu()} trigger={["click"]}>
          <div>
            <Avatar size={40} icon={<UserOutlined />} />
            <span style={{ margin: "0 10px" }}>{info.username}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </RightMenu>
    );
  }
}

export default withRouter(Rightmenu);
