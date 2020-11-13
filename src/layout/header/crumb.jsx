import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Span = styled.span`
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`;

@inject("store1", "setting")
@observer
class Crumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  move = (path) => {
    this.props.history.replace(path);
  };
  render() {
    const length = this.props.store1.crumb.length;
    const { isMobile } = this.props.setting;
    return (
      <>
        {!isMobile ? (
          <Breadcrumb>
            <Breadcrumb.Item href="/index">
              <HomeOutlined />
            </Breadcrumb.Item>
            {this.props.store1.crumb.map((item, index) => {
              return (
                <Breadcrumb.Item key={index}>
                  {item.exact && index !== length - 1 ? (
                    <Span onClick={() => this.move(item.path)}>
                      {item.name}
                    </Span>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        ) : (
          <p></p>
        )}
      </>
    );
  }
}

export default withRouter(Crumb);
