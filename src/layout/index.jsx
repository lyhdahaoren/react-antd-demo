import * as React from "react";
import { Layout } from "antd";

// 子路由组件（如果还有子路由继续嵌套）
// 路由组件
import Routes from "@/router/route";
// menu
import JzMenu from "./silderMenu";
import Headers from "./header";
import TagsWrapper from "./tagsNavWrapper";
// 样式组件
import { LayBox } from "../styledComponents/layout";
import { inject, observer } from "mobx-react";

const { Content, Footer, Sider } = Layout;

@inject("setting")
@observer
class JzLayOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    this.checkWidthCallback();
    window.addEventListener("resize", this.onresize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onresize);
  }

  onresize = () => {
    this.checkWidthCallback();
  };

  checkWidthCallback = () => {
    const { setC } = this.props.setting;
    const Width =
      window.innerWidth || // 浏览器窗口的内部宽度（包括滚动条）
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // 控制个人信息项
    if (Width < 750) {
      setC.call(this.props.setting, true);
    } else {
      setC.call(this.props.setting, false);
    }

    // 控制主体 菜单栏
    const { collapsed } = this.state;
    if (Width < 1100) {
      if (collapsed) return;
      this.onCollapse(true);
    } else {
      if (!collapsed) return;
      this.onCollapse(false);
    }
  };

  onCollapse = (collapsed) => {
    if (collapsed) {
      this.child.setState(
        {
          openKeys: [],
        },
        () => {
          this.setState({
            collapsed,
          });
        }
      );
    } else {
      this.setState(
        {
          collapsed,
        },
        () => {
          this.child.changeStatus(this.props.location.pathname);
        }
      );
    }
  };

  onRef = (ref) => {
    this.child = ref;
  };

  render() {
    const { theme, isOpenTags } = this.props.setting;
    return (
      <LayBox collapsed={this.state.collapsed}>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              zIndex: 1000,
            }}
            theme={theme}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <JzMenu
              title="hello world"
              onRef={this.onRef}
              collapsed={this.state.collapsed}
              {...this.props}
            />
          </Sider>
          <Layout className="site-layout">
            <div className="top">
              <Headers></Headers>
              {isOpenTags ? <TagsWrapper></TagsWrapper> : null}
            </div>
            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
                paddingTop: `${isOpenTags ? "95px" : "56px"}`,
              }}
            >
              <div
                className="site-layout-background ass"
                style={{ padding: 24 }}
              >
                <Routes routesList={this.props.itemList} />
              </div>
            </Content>

            <Footer style={{ textAlign: "center" }}>
              Juzi ©2020 Created by Juzi FED
            </Footer>
          </Layout>
        </Layout>
      </LayBox>
    );
  }
}

export default JzLayOut;
