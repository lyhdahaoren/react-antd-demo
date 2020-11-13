import * as React from "react";

import JzLayOut from "../layout";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  componentDidMount() {}

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <>
        <JzLayOut {...this.props}></JzLayOut>
      </>
    );
  }
}

export default App;
