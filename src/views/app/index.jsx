import * as React from 'react'
import Cookie from 'js-cookie'
import {inject, observer} from "mobx-react";
import IndexImg from '@/assets/images/timg.gif'

@inject('store')
@observer
class Login extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render(){
    return(
      <>
        <img src={IndexImg} />
      </>
    )
  }
}


export default Login;
