import React from "react";
import SvgIcon from "../components/public/svg";
import * as flex from "../styledComponents/public";
import Styled from 'styled-components'
import { withRouter } from "react-router";

const NotFound = Styled.div`
  font-size:1000px;
  ${flex.flex_c_c};
  .method{
    font-size:16px;
  }
`;

class Not extends React.PureComponent{
  constructor(props) {
    super(props);
  }
  state = {
    set:'',
    time: 5
  }
  componentDidMount() {
    let set = setInterval(()=>{
      console.log(this.state.time)
      if(this.state.time === 0){
        clearInterval(set);
        this.props.history.go(-1)
        return
      }
      this.setState({
        time:this.state.time - 1
      })
    },1000)
    this.setState({
      set
    })
  }
  componentWillUnmount() {
    console.log('我清除了定时器')
    clearInterval(this.state.set)
  }

  render() {
    return (
      <NotFound>
        <SvgIcon iconClass='error-404' />
        <div className='method'>
          <p>{this.state.time}秒后自动返回上一页</p>
        </div>
      </NotFound>
    )
  }
}

export default withRouter(Not)
