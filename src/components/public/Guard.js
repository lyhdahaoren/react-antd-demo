import * as React from "react";
import { withRouter } from "react-router-dom";
import Cookie from "js-cookie";

//路由守卫组件
class Guard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: false,
    };
  }
  componentDidMount() {
    let { pathname } = this.props.location;
    if (!Cookie.get("token")) {
      if (pathname !== "/login") {
        this.props.history.replace("/login");
      } else {
        this.setState({
          isUser: true,
        });
      }
    } else {
      this.setState({
        isUser: true,
      });
    }
    //可以做一些权限判断  或者  其他判断
    //window.scrollTo(0,0);
  }
  render() {
    return (
      <>
        {/*处理权限的展示*/}
        {this.state.isUser ? <div>{this.props.children}</div> : null}
      </>
    );
  }
}

export default withRouter(Guard);
