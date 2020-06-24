import Styled,{css} from 'styled-components'

const flex = css`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
`;

const Login = Styled.div`
  width:600px;
  height:300px;
  margin:100px auto;
  background:#ccc;
  ${flex};
`;

export default Login;