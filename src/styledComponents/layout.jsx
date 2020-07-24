import React from "react";
import Styled from 'styled-components'
import { flex_b_c, flex_s_c } from "./public"

export const LayBox = Styled.div`
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
    width:100%;
    padding-left:200px;
    top:0
  }
`;

export const RightMenu = Styled.div`
  ${flex_s_c}
`
