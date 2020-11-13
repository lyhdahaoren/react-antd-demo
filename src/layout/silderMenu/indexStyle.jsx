import styled from "styled-components";
import { flex_c_c, ellipsis } from "../../styledComponents/public";

export const MenuContent = styled.div`
  .logo {
    margin: 20px 16px;
    height: 40px;
    background: #777;
    color: #fefefe;
    border-radius: 6px;
    ${flex_c_c};
    img {
      width: 30px;
      height: 30px;
    }
    div {
      ${ellipsis}
    }
  }
`;
