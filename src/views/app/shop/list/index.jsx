import React from "react";
import Search from "@/components/search";

class ListIndex extends React.Component {
  state = {
    formList: [
      {
        type: "input",
        label: "商户ID",
        name: "level",
      },
      {
        type: "input",
        label: "商户名称",
        name: "name",
      },
      {
        type: "input",
        label: "渠道ID",
        name: "channelId",
      },
      {
        type: "input",
        label: "渠道名称",
        name: "channel",
      },
      {
        type: "Select",
        label: "商户类型",
        name: "shopType",
      },
      {
        type: "Select",
        label: "入驻状态",
        name: "status",
      },
    ],
    option: {
      isSubmit: true,
    },
  };
  render() {
    return (
      <>
        <Search
          formList={this.state.formList}
          option={this.state.option}
        ></Search>
      </>
    );
  }
}

export default ListIndex;
