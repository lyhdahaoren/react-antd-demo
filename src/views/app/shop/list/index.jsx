import React from "react";
import Search from "@/components/search";
import { Tag, Space, Button } from "antd";

class ListIndex extends React.Component {
  state = {
    loading: true,
    dataSource: [],
    formList: [
      {
        type: "input",
        label: "商户ID",
        name: "level",
        title: "商户ID",
        dataIndex: "level",
        key: "level",
      },
      {
        type: "input",
        label: "商户名称",
        name: "name",
        title: "商户名称",
        dataIndex: "name",
        key: "name",
      },
      {
        type: "input",
        label: "渠道ID",
        name: "channelId",
        title: "渠道ID",
        dataIndex: "channelId",
        key: "channelId",
      },
      {
        type: "input",
        label: "渠道名称",
        name: "channel",
        title: "渠道名称",
        dataIndex: "channel",
        key: "channel",
      },
      {
        type: "Select",
        label: "商户类型",
        name: "shopType",
        title: "商户类型",
        dataIndex: "shopType",
        key: "shopType",
      },
      {
        title: "开启状态",
        dataIndex: "openStatus",
        key: "openStatus",
        render: (text) => (
          <Tag color={text ? "green" : "red"}>{text ? "开启" : "关闭"}</Tag>
        ),
      },
      {
        type: "Select",
        label: "入驻状态",
        name: "status",
        title: "入驻状态",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "操作人",
        dataIndex: "people",
        key: "people",
      },
      {
        title: "操作时间",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "操作",
        key: "action",
        width: 120,
        fixed: "right",
        render: (text, record) => (
          <Space size="middle">
            <a>{record.status ? "关闭" : "开启"}</a>
            <a>编辑</a>
          </Space>
        ),
      },
    ],
    option: {
      isSubmit: true,
      isReset: true,
    },
  };

  getQueryList = (query) => {
    console.log(query);
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        dataSource: [],
      });
    }, 2000);
  };
  addPage = () => {
    this.props.history.push("/shop/list/add");
  };

  render() {
    return (
      <>
        <Search
          getQuery={this.getQueryList}
          dataSource={this.state.dataSource}
          formList={this.state.formList}
          columns={this.state.formList}
          option={this.state.option}
          loading={this.state.loading}
        ></Search>
      </>
    );
  }
}

export default ListIndex;
