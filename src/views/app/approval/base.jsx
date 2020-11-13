import React from "react";
// 子路由组件（如果还有子路由继续嵌套）
// 路由组件
import Routes from "@/router/route";

class ApprovalBase extends React.Component {
  render() {
    return (
      <>
        <Routes routesList={this.props.itemList} />
      </>
    );
  }
}

export default ApprovalBase;
