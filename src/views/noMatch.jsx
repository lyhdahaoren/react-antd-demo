import React from "react";
import SvgIcon from "../components/public/svg";
import * as flex from "../styledComponents/public";
import Styled from "styled-components";
import { withRouter } from "react-router";

const NotFound = Styled.div`
  .img404 {
    font-size: 500px;
  }
  ${flex.flex_column_c};
  .method{
    font-size:16px;
    text-align: center;
  }
`;

class Not extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      set: "",
      time: 5,
    };
  }
  componentDidMount() {
    let set = setInterval(() => {
      if (this.state.time === 0) {
        clearInterval(set);
        this.props.history.go(-1);
        return;
      }
      this.setState({
        time: this.state.time - 1,
      });
    }, 1000);
    this.setState({
      set,
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.set);
  }

  render() {
    return (
      <NotFound>
        <SvgIcon iconClass="error-404" svgClass="img404" />
        <div className="method">
          <p>404</p>
          <p>{this.state.time}秒后自动返回上一页</p>
        </div>
      </NotFound>
    );
  }
}

export default withRouter(Not);
