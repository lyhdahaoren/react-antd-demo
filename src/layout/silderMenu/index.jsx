import React from "react";
import { withRouter } from "react-router";
import { Menu } from "antd";
import { MenuContent } from "./indexStyle";

import List from "@/router";
import { inject, observer } from "mobx-react";

import SvgIcon from "../../components/public/svg";

import Logo from "@/assets/images/logo.png";

const { SubMenu } = Menu;

@inject("store1", "setting")
@observer
class JzMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    unListen: "",
    selectKeys: [],
    openKeys: [],
    crumbData: [],
  };

  componentDidMount() {
    this.props.onRef(this);
    this.changeStatus(this.props.location.pathname);
    if (this.state.unListen) return;
    this.setState({
      unListen: this.props.history.listen((val) => {
        this.changeStatus(val.pathname);
      }),
    });
  }

  componentWillUnmount() {
    // 取消监听
    this.state.unListen && this.state.unListen();
  }

  // 初始或者路由切换触发面包屑 导航栏变化
  changeStatus = (val) => {
    // list 为后台角色权限路由
    const list = this.props.store1.routes.length
      ? this.props.store1.routes
      : List[3].children;
    // allList 为前端设置所有路由
    let allList = List;
    const isFlag404 = this.getUrlInLine(val, allList);
    const isFlag500 = this.getUrlInLine(val, list);
    if (!isFlag404.flag) {
      this.props.history.replace("/404");
      document.title = "404";
      return;
    }
    const arrd = ["/login", "/404", "/500"];
    if (!isFlag500.flag && arrd.indexOf(val) === -1) {
      this.props.history.replace("/500");
      document.title = "500";
      return;
    }
    const arr = this.getFaterRoute(val);
    this.setState({
      openKeys: arr,
      selectKeys: arr,
    });
    const pparr = arr.map((t) => {
      return this.getUrlInLine(t, allList).obj;
    });
    document.title = isFlag500.obj.name;
    this.computedCrumbData(pparr, isFlag500.obj);
  };

  // 获取当前路由的父级们
  getFaterRoute = (val) => {
    let defaultArr = [];
    val
      .split("/")
      .filter((item, index) => index !== 0)
      .map((item) => {
        const last = defaultArr[defaultArr.length - 1] || "";
        defaultArr.push(`${last}/${item}`);
        return null;
      });
    return defaultArr;
  };

  // 查询当前url 是否有权限或者404

  getUrlInLine(url, arr) {
    let index = 0;
    let flag = {
      flag: false,
      obj: {},
    };
    while (index < arr.length) {
      const arrs = arr[index].children;
      if (arr[index].path === url) {
        flag = {
          flag: true,
          obj: arr[index],
        };
        return flag;
      } else {
        if (arrs) {
          if (!flag.flag) {
            flag = this.getUrlInLine(url, arrs);
          } else {
            return flag;
          }
        }
      }
      index++;
    }
    return flag;
  }

  /**
   * 同步面包屑，同步tags
   * @param {val} 当前路由层级   例：/a/b/c   val为[/a, /a/b, /a/b/c]
   */
  computedCrumbData = (arr, last) => {
    this.props.store1.setCrumbData(arr);
    this.checkRouteBytags(last);
  };

  // 判断当前route是否存在tags中
  checkRouteBytags = (val) => {
    if (!val || !Object.keys(val).length) {
      return;
    }
    let { tags } = this.props.store1;
    tags = tags.filter((t) => t);
    const item = tags.find((item) => item.path === val.path);
    const index = tags.findIndex((item) => item.path === val.path);
    if (!item) {
      this.props.store1.setTags([...tags, val]);
    }
    this.props.store1.setActiveKey(index !== -1 ? index : tags.length);
  };

  // 动态生成submenu
  ReturnMenu = (props) => {
    const list = props.list.length ? props.list : List[3].children;
    return list.map((item, index) => {
      if (item.children && item.children.length && !item.hideMenu) {
        return (
          <SubMenu
            key={item.path}
            icon={
              item.icon ? (
                <span
                  role="img"
                  aria-label="team"
                  className="anticon anticon-team"
                >
                  <SvgIcon iconClass={item.icon} />
                </span>
              ) : null
            }
            title={item.name}
          >
            {this.ReturnMenu({ list: item.children })}
          </SubMenu>
        );
      } else {
        if (!item.hideMenu) {
          return (
            <Menu.Item
              key={item.path}
              icon={
                item.icon ? (
                  <span
                    role="img"
                    aria-label="team"
                    className="anticon anticon-team"
                  >
                    <SvgIcon iconClass={item.icon} />
                  </span>
                ) : null
              }
              onClick={() =>
                this.props.history.push(
                  item.Redirect ? item.Redirect : item.path
                )
              }
            >
              {item.name}
            </Menu.Item>
          );
        }
      }
    });
  };

  // 手风琴效果(可展开收起)
  onOpenChange = (keys) => {
    const { list } = this.props;
    const lists = list && list.length ? list : List[3].children;
    const { openKeys } = this.state;
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (lists.findIndex((listItem) => listItem.path === latestOpenKey) === -1) {
      this.setState({
        openKeys: keys,
      });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const { title, collapsed } = this.props;
    const { theme } = this.props.setting;
    return (
      <MenuContent>
        <div className="logo">
          <img
            src={Logo}
            style={title && !collapsed ? { marginRight: "10px" } : {}}
            alt=""
          />
          <div>{title && !collapsed ? title : null}</div>
        </div>
        <Menu
          // onClick={this.handleClick}
          theme={theme}
          mode="inline"
          selectedKeys={this.state.selectKeys}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {this.ReturnMenu({ list: this.props.store1.routes })}
        </Menu>
      </MenuContent>
    );
  }
}

export default withRouter(JzMenu);
