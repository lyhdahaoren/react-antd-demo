import React from "react"
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import {inject, observer} from "mobx-react";


@inject('store1')
@observer
class Crumb extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Breadcrumb>
          <Breadcrumb.Item href="/a">
            <HomeOutlined />
          </Breadcrumb.Item>
          {
            this.props.store1.crumb.map((item,index)=>{
              return(
                <Breadcrumb.Item key={index}>
                  <span>{item.name}</span>
                </Breadcrumb.Item>
              )
            })
          }
        </Breadcrumb>
    );
  }
}

export default Crumb
