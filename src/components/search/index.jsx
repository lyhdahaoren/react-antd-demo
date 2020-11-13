import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Select,
  Cascader,
} from "antd";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = (values) => {};
  componentDidMount() {}
  render() {
    const { option, formList } = this.props;
    const { RangePicker } = DatePicker;
    return (
      <div>
        <Form
          layout="inline"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          // onFinishFailed={onFinishFailed}
        >
          {formList &&
            formList.map((t, i) => {
              return (
                <div key={i} style={{ marginBottom: "10px" }}>
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
                      <RangePicker {...t.option} />
                    </Form.Item>
                  ) : null}
                  {t.type === "Select" ? (
                    <Form.Item
                      key={i}
                      label={t.label}
                      name={t.name}
                      rules={t.rules}
                    >
                      <Select placeholder="请选择" {...t.option} />
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
                </div>
              );
            })}
          {option ? (
            option.isSubmit ? (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
              </Form.Item>
            ) : null
          ) : null}
        </Form>
      </div>
    );
  }
}

export default Search;
