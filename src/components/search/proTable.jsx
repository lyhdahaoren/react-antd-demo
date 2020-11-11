import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
    search: true,
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
    valueEnum: {
      all: {
        text: '全部',
        status: 'Default',
      },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
    width: '10%',
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: '10%',
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, id, color }) => (
          <Tag color={color} key={id}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: '20%',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
        链路
      </a>,
      <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="warning">
        报警
      </a>,
      <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          {
            key: 'copy',
            name: '复制',
          },
          {
            key: 'delete',
            name: '删除',
          },
        ]}
      />,
    ],
  },
];
export default () => {
  const actionRef = useRef();
  return (
    <ProTable
      columns={columns}
      pagination={{
        showQuickJumper: true,
      }}
      actionRef={actionRef}
      request={async (params = {}) =>
        request('https://proapi.azurewebsites.net/github/issues', {
          params,
        })
      }
      rowKey="id"
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="3" type="primary">
          <PlusOutlined />
          新建
        </Button>,
      ]}
    />
  );
};