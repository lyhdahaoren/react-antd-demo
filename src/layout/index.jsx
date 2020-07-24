import * as React from 'react'
import { Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;

//子路由组件（如果还有子路由继续嵌套）
//路由组件
import Routes from '@/router/route'
//menu
import JzMenu from './silderMenu'
import Headers from './header'
import TagsWrapper from "./tagsNavWrapper";
//样式组件
import { LayBox } from "../styledComponents/layout";

class JzLayOut extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <LayBox>
        <Layout>
          <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                zIndex: 1000
              }}
          >
            <JzMenu {...this.props} />
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <div className='top'>
              <Headers></Headers>
              <TagsWrapper></TagsWrapper>
            </div>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial',paddingTop:'95px' }}>
              <div className="site-layout-background ass" style={{ padding: 24, textAlign: 'center' }}>
                <Routes routesList={this.props.itemList} />
                ...
                <br />
                Really
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                long
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                ...
                <br />
                content
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </LayBox>
    )
  }
}

export default JzLayOut
