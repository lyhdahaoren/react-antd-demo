import * as React from 'react'
import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

//路由守卫组件
class Guard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isUser:true
    }
  }
  componentWillMount(){
    console.log('守卫成功');
    if(this.props.location.path != '/login'){
      if(!Cookie.get('token')){
        this.props.history.replace('/login')
      }
    }
    //可以做一些权限判断  或者  其他判断
    //window.scrollTo(0,0);

  }
  render(){
    return(
      <>
        {/*处理权限的展示*/}
        {
          this.state.isUser ? (
            <div>
              {this.props.children}
            </div>
          ) : null
        }
      </>
    )
  }
}


export default withRouter(Guard);

