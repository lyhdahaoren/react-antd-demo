import * as React from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <p>欢迎使用同爸爸打我！</p>
      </>
    );
  }
}

export default Login;
