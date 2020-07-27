import React from "react";
import TagsWrapper from "../../styledComponents/tagsWrapper";
import {inject, observer} from "mobx-react";
import { Tag } from 'antd';
import SvgIcon from "../../components/public/svg";
import { withRouter } from "react-router";

@inject('store1')
@observer
class tagsWrapper extends React.Component{
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    console.log(this.props.store1.activeKey)
  }

  go(val){
    if(val.path !== this.props.location.pathname){
      this.props.history.push(val.path)
      window.scrollTo(0,0)
    }
  }
  close(e,index){
    e.stopPropagation()
    let { tags = [], activeKey } = this.props.store1;
    // tags = tags.filter(t => t)
    tags.splice(index,1)
    this.props.store1.setTags(tags)
    if(tags.length === 0){
      this.props.history.replace('/a')
    }else{
      if(activeKey === index){
        this.props.history.go(-1)
      }else{
        if(index < activeKey){
          this.props.store1.setActiveKey(activeKey - 1)
        }
      }
    }
  }

  render() {
    let { tags = [],activeKey } = this.props.store1
    tags = tags.filter(t=>t)
    return(
      <TagsWrapper>
        <div className='scroll-outer'>
          <div className='scroll-body'>
            <span>
              {
                tags.map((item,index)=>{
                  return(
                      <div className='asdd' key={index} onClick={()=>this.go(item)}>
                        <Tag onClose={($event) => this.close($event,index)} icon={<span className={`diandian ${activeKey === index ? 'active' : ''}`} style={{fontSize:'30px',display:'block',height:'30px'}}><SvgIcon iconClass='rac' /></span>} closable key={index}>
                          {item.name}
                        </Tag>
                      </div>
                  )
                })
              }
            </span>
          </div>
        </div>
      </TagsWrapper>
    )
  }
}

export default withRouter(tagsWrapper)
