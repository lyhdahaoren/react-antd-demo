import Styled from "styled-components";
import { flex_b_c, flex_c_c } from "./public";

const Login = Styled.div`
   position:absolute;
   width:100%;
   height:100%;
   overflow:hidden;
   .bg{
     position: fixed;
     top:0;
     width: 100%;
     height: 100%;
     left:0;
     background:url(${require("@/assets/images/xkbg.png")}) no-repeat;
     background-size: 1000px 250px;
     background-repeat: repeat-x;
     background-position: center bottom;
   }
   canvas{
     background:linear-gradient(to bottom, #333 , #7d4cd9);;
   }
   .loginForm{
      position:absolute;
      right:5%;
      border-radius:8px;
      top:50%;
      transform:translate(0,-60%);
      width:350px;
      background:rgba(255,255,255,1);
      min-height:300px;
      .welcome{
        ${flex_b_c};
        height:50px;
        padding:10px;
        border-bottom:1px solid #dedede;
        p{
          margin:0;
          ${flex_c_c}
          img{
            width:20px;
          }
        }
      }
   }
`;

export default Login;
