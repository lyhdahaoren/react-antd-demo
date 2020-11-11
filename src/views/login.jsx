import * as React from 'react'
import Cookie from 'js-cookie'
//引入样式组件
import Logins from '@/styledComponents/login'
import { inject, observer } from "mobx-react";
import Star from "./components/Star";
import { Form, Input, InputNumber, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import Logo from '@/assets/images/logo.png'
import SvgIcon from "../components/public/svg";
var Tween = {
  Linear: function (t, b, c, d) { return c * t / d + b; },
  Quad: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  },
  Cubic: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  },
  Quart: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
  },
  Quint: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  Sine: {
    easeIn: function (t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOut: function (t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
  },
  Expo: {
    easeIn: function (t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function (t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  Circ: {
    easeIn: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  Elastic: {
    easeIn: function (t, b, c, d, a, p) {
      if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
      if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOut: function (t, b, c, d, a, p) {
      if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
      if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    easeInOut: function (t, b, c, d, a, p) {
      if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
      if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }
  },
  Back: {
    easeIn: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
  },
  Bounce: {
    easeIn: function (t, b, c, d) {
      return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
    },
    easeOut: function (t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOut: function (t, b, c, d) {
      if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
      else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
  }
}
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

@inject('store', 'user')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipt: '',
    }
  }

  componentDidMount() {

  }

  onFinish = (val) => {
    Cookie.set('token', val.qrcode);
    this.props.user.setInfo(val)
    this.props.history.replace('/a')
  }


  render() {
    return (
      <Logins>
        <Star>
          <div className='loginForm'>
            <div className='welcome'>
              <p>
                <img src={Logo} alt="" />
                <span>xxxx</span>
              </p>
              <p>欢迎登录</p>
            </div>
            <div style={{ padding: '10px', marginTop: '20px' }}>
              <Form {...layout} name="nest-messages" onFinish={(() => this.onFinish)()} validateMessages={validateMessages}>
                <Form.Item
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!'
                    },
                  ]}
                >
                  <Input placeholder="账号" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    { required: true, message: '请输入密码!' }
                  ]}
                >
                  <Input placeholder="密码" prefix={<SvgIcon iconClass='password' />} />
                </Form.Item>
                <Form.Item
                  name='qrcode'
                  rules={[
                    { required: true, message: '请输入验证码!' }
                  ]}
                >
                  <Input placeholder="验证码" prefix={<SvgIcon iconClass='qrcode' />} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <p style={{ textAlign: 'center' }}>随便输入账号密码验证码</p>
          </div>
        </Star>
      </Logins>
    )
  }
}


export default Login;
