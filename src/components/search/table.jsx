import React, { Component } from "react";
import { Table } from "antd";

class JzTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        onChange: (page, pagesize) => {
          this.props.change({
            page: page,
            pageNumber: pagesize,
          });
        },
        onShowSizeChange: (current, size) => {
          this.setState({
            current: 1,
          });
          this.props.change({
            page: 1,
            pageNumber: size,
          });
        },
      },
      dataSource: [
        {
          name: 1,
        },
        {
          name: 2,
        },
        {
          name: 1,
        },
        {
          name: 2,
        },
        {
          name: 1,
        },
        {
          name: 2,
        },
        {
          name: 1,
        },
        {
          name: 2,
        },
        {
          name: 1,
        },
        {
          name: 2,
        },
        {
          name: 1,
        },
        {
          name: 2,
        },
        {
          name: 1,
        },
        {
          name: 2,
        },
      ],
    };
  }
  componentDidMount() {}
  render() {
    const { columns, dataSource, loading } = this.props;
    const { pagination, current } = this.state;
    let list = dataSource.length ? dataSource : this.state.dataSource;
    list = list.map((t, index) => {
      return {
        ...t,
        key: index,
      };
    });
    return (
      <div>
        <Table
          pagination={pagination}
          dataSource={list}
          columns={columns}
          loading={loading}
          current={current}
          scroll={{ x: 1000 }}
          sticky
        ></Table>
      </div>
    );
  }
}

export default JzTable;
