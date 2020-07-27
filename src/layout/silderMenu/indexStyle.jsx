import React from 'react'
import styled from 'styled-components'
import { flex_c_c } from "../../styledComponents/public";

export const MenuContent = styled.div`
  .ant-menu-submenu svg,.ant-menu-item svg{
    vertical-align: middle;
    margin-right:5px;
  }
  .logo{
    margin:20px 16px;
    height:40px;
    background:#777;
    color:#fefefe;
    border-radius:6px;
    ${flex_c_c};
  }
`
