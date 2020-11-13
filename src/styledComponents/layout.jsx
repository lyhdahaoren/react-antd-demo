import Styled from "styled-components";
import { flex_b_c, flex_s_c, flex_c_c } from "./public";

export const LayBox = Styled.div`
  transition:all 0.2s;
  padding-left:${(props) => (!props.collapsed ? "200px" : "80px")};
  .site-layout .site-layout-background1 {
    padding: 0 20px;
    background: #fff;
    ${flex_b_c};
  }
  .ass{
    background: #fff;
  }
  .top{
    position:fixed;
    left:0;
    z-index:999;
    transition:all 0.2s;
    width:100%;
    padding-left:${(props) => (!props.collapsed ? "200px" : "80px")};
    top:0
  }
  .add {
    ${flex_c_c};
    margin-right: 20px;
    height: 64px;
  }
`;

export const RightMenu = Styled.div`
  ${flex_s_c}
`;
