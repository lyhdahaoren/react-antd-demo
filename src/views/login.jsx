import * as React from 'react'
import Cookie from 'js-cookie'
//引入样式组件
import Logins from '@/styledComponents/login'
import {inject, observer} from "mobx-react";

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
    // console.log(process.env.REACT_APP_ENV)
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
      <Logins>
        <label form='#id'>用户名</label>
        <input type="text" id='id' onChange={(e)=>this.changeData(e)}/>
        <button onClick={()=>this.put()}>登录</button>
      </Logins>
    )
  }
}


export default Login;