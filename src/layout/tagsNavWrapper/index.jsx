import React from "react";
import TagsWrapper from "../../styledComponents/tagsWrapper";
import {inject, observer} from "mobx-react";
import { Tag } from 'antd';
import SvgIcon from "../../components/public/svg";

@inject('store1')
@observer
class tagsWrapper extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    const { tags = [] } = this.props.store1
    console.log(tags)
    return(
      <TagsWrapper>
        <div className='scroll-outer'>
          <div className='scroll-body'>
            <span>
              {
                tags.map((item,index)=>{
                  return(
                      <Tag icon={<span style={{fontSize:'20px',display:'block',height:'20px'}}><SvgIcon iconClass='rac' /></span>} closable key={index}>
                        {item.name}
                      </Tag>
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

export default tagsWrapper
