import * as React from "react";
import Cookie from "js-cookie";
// 引入样式组件
import Logins from "@/styledComponents/login";
import { inject, observer } from "mobx-react";
import Star from "./components/Star";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Logo from "@/assets/images/logo.png";
import SvgIcon from "../components/public/svg";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

@inject("store", "user")
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipt: "",
    };
  }

  componentDidMount() {}

  onFinish = (val) => {
    Cookie.set("token", val.qrcode);
    this.props.user.setInfo(val);
    this.props.history.replace("/index");
  };

  render() {
    return (
      <Logins>
        <Star>
          <div className="loginForm">
            <div className="welcome">
              <p>
                <img src={Logo} alt="" />
                <span>xxxx</span>
              </p>
              <p>欢迎登录</p>
            </div>
            <div style={{ padding: "10px", marginTop: "20px" }}>
              <Form
                {...layout}
                name="nest-messages"
                onFinish={(() => this.onFinish)()}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名!",
                    },
                  ]}
                >
                  <Input placeholder="账号" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "请输入密码!" }]}
                >
                  <Input
                    placeholder="密码"
                    prefix={<SvgIcon iconClass="password" />}
                  />
                </Form.Item>
                <Form.Item
                  name="qrcode"
                  rules={[{ required: true, message: "请输入验证码!" }]}
                >
                  <Input
                    placeholder="验证码"
                    prefix={<SvgIcon iconClass="qrcode" />}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <p style={{ textAlign: "center" }}>随便输入账号密码验证码</p>
          </div>
        </Star>
      </Logins>
    );
  }
}

export default Login;
