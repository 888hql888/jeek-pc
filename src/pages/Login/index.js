import React, { useState } from "react";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import styles from "./index.module.scss";
import logo from "@/assets/logo.png";

import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { login } from "@/store/actions/login";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  // 输入值 且 校验通过 
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await dispatch(login(values)) //出错直接跑catch
      message.success('登陆成功',1,()=>{
          const from = location.state ? location.state : '/home'
          history.replace(from)
      })
    } catch (e) {
      message.error(e,1,()=>{});
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.root}>
      <Card className="login-container">
        {/* 图片 */} <img className="login-logo" src={logo}  />
        {/* 表单 */}
        <Form
          name="basic"
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            mobile: "13911111111",
            code: "246810",
            agree: true,
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "手机号不能为空!",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号格式错误",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "验证码不能为空",
              },
              {
                pattern: /^\d{6}$/,
                message: "验证码格式错误",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                required: true,
                validator: (rule, value) => {
                  if (value) return Promise.resolve();
                  else return Promise.reject(new Error("请同意本协议."));
                },
              },
            ]}
          >
            <Checkbox> 我已阅读并同意[隐私条款] 和[用户协议] </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
