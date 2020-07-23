import * as React from 'react'
import Cookie from 'js-cookie'
//引入样式组件
import Logins from '@/styledComponents/login'
import {inject, observer} from "mobx-react";

//子路由组件（如果还有子路由继续嵌套）
//路由组件
import Routes from '@/router/route'


@inject('store')
@observer
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ipt:''
    }
  }

  componentDidMount(){
    console.log(this.props)
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

  render(){
    return(
      <>
        <div>123</div>
        <Routes routesList={this.props.itemList} />
      </>
    )
  }
}


export default Login;
