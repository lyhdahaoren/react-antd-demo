import * as React from 'react'
import Cookie from 'js-cookie'
//引入样式组件
import Logins from '@/styledComponents/login'
import {inject, observer} from "mobx-react";

//子路由组件（如果还有子路由继续嵌套）
//路由组件
import Routes from '@/router/route'

import Search from '@/components/search/index'
import ProTable from '@/components/search/proTable'

import { Button } from 'antd'

@inject('store')
@observer
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ipt:'',
      fromList: [
        {
          name: 'userName',
          type: 'input',
          label: '姓名',
          rules: null
        },
        {
          name: 'date-picker',
          type: 'datePicker',
          label: '日期选择器',
          rules: null,
          option: {
            showTime: true
          }
        },
        {
          name: 'range-picker',
          type: 'RangePicker',
          label: '日期起始选择器',
          rules: null,
          option: {
            showTime: true
          }
        },
        {
          name: 'select',
          type: 'Select',
          label: '选择器',
          rules: null,
        },
        {
          name: 'cascader',
          type: 'Cascader',
          label: '级联选择器',
          rules: null,
        },
      ],
      option: {
        isSubmit: true
      }
    }
  }

  componentDidMount(){
  }

  changeData = (e)=>{
    this.setState({
      ipt:e.target.value
    })
  };

  put = ()=>{
    Cookie.set('token',this.ipt)
    this.props.history.replace('/app')
  };
  submit = (_this) => {
  }

  render(){
    return(
      <>
        {/* <Search fromList={this.state.fromList} option={this.state.option}>
        </Search> */}
        <ProTable></ProTable>
        <Routes routesList={this.props.itemList} />
      </>
    )
  }
}


export default Login;
