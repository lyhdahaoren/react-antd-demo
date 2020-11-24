import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  DatePicker,
  Select,
  Cascader,
} from "antd";
import Styles from "./index.module.less";
import JzTable from "./table";
const { Option } = Select;
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: this.props.formList,
      defaultOptions: {
        page: 1,
        pageNumber: 10,
      },
    };
    this.formRef = React.createRef();
  }
  onFinish = (values) => {
    const { getQuery } = this.props;
    const { defaultOptions } = this.state;
    getQuery({
      ...values,
      ...defaultOptions,
    });
  };
  componentDidMount() {
    this.submits();
  }

  submits = (options) => {
    if (options) {
      this.setState({
        defaultOptions: options,
      });
    }
    this.formRef.current.submit();
  };

  render() {
    const { option } = this.props;
    const { formList, defaultOptions } = this.state;
    const { RangePicker } = DatePicker;
    return (
      <div>
        <Form
          layout="inline"
          name="basic"
          className={Styles["ant-advanced-search-form"]}
          ref={this.formRef}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Row>
            {formList &&
              formList.map((t, i) => {
                return (
                  <Col
                    key={i}
                    style={{ marginBottom: "10px" }}
                    xl={t.type ? 6 : 0}
                    xs={t.type ? 24 : 0}
                    lg={t.type ? 6 : 0}
                    md={t.type ? 8 : 0}
                    sm={t.type ? 12 : 0}
                  >
                    {t.type === "input" ? (
                      <Form.Item
                        key={i}
                        label={t.label}
                        name={t.name}
                        rules={t.rules}
                      >
                        <Input placeholder={t.placeholder || "请输入"} />
                      </Form.Item>
                    ) : null}
                    {t.type === "datePicker" ? (
                      <Form.Item
                        key={i}
                        label={t.label}
                        name={t.name}
                        rules={t.rules}
                      >
                        <DatePicker {...t.option} />
                      </Form.Item>
                    ) : null}
                    {t.type === "RangePicker" ? (
                      <Form.Item
                        key={i}
                        label={t.label}
                        name={t.name}
                        rules={t.rules}
                      >
                        <RangePicker />
                      </Form.Item>
                    ) : null}
                    {t.type === "Select" ? (
                      <Form.Item
                        key={i}
                        label={t.label}
                        name={t.name}
                        rules={t.rules}
                      >
                        <Select placeholder="请选择" {...t.option}>
                          {t.options
                            ? t.options.map((t, index) => {
                                return (
                                  <Option value={t.value} key={index}>
                                    {t.label}
                                  </Option>
                                );
                              })
                            : null}
                        </Select>
                      </Form.Item>
                    ) : null}
                    {t.type === "Cascader" ? (
                      <Form.Item
                        key={i}
                        label={t.label}
                        name={t.name}
                        rules={t.rules}
                      >
                        <Cascader {...t.option} />
                      </Form.Item>
                    ) : null}
                  </Col>
                );
              })}
          </Row>
          <Row
            style={{
              width: "100%",
            }}
          >
            <Col
              span={24}
              style={{
                textAlign: "right",
              }}
            >
              {option.isReset ? (
                <Button onClick={() => this.formRef.current.resetFields()}>
                  重置
                </Button>
              ) : null}

              {option.isSubmit ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                >
                  查询
                </Button>
              ) : null}
            </Col>
          </Row>
        </Form>
        <div className={Styles.children}>{this.props.children}</div>
        <div>
          <JzTable {...this.props} change={this.submits}></JzTable>
        </div>
      </div>
    );
  }
}

export default Search;
