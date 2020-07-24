import Styled from 'styled-components'
import { flex_c_c } from "./public";

const TagsWrapper = Styled.div`
  width:100%;
  .scroll-outer{
    background:#f0f0f0;
    box-shadow: inset 0 0 3px 2px hsla(0,0%,39.2%,.1);
  }
  .scroll-body{
      display: inline-block;
      padding: 1px 4px 0;
      overflow: visible;
      white-space: nowrap;
      span{
        div{
          width:100px;
          height: 32px;
          line-height: 32px;
          border: 1px solid #e8eaec !important;
          color: #515a6e!important;
          background: #fff!important;
          padding: 0 12px;
          display:inline-block
        }
      }
  }
  .ant-tag{
    ${flex_c_c};
    padding-top:5px;
    padding-bottom:5px;
    background:#fff;
  }
`;

export default TagsWrapper
