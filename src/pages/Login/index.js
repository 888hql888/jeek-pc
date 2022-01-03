import React,{useState} from "react";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import logo from "@/assets/logo.png";
import styles from "./index.module.scss";
import {login} from '@/store/actions/login'
import { useHistory, useLocation } from "react-router";
import {useDispatch} from 'react-redux'
export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [loading,setLoading] =  useState(false)
  const onFinish = async (values) => {
    setLoading(true)
     try{
        await dispatch(login(values))
        message.success('登录成功~~~')
        // 登录到上次登录的地址 并且不往栈里添加记录
        const from = location.state ? location.state.from : '/home'
        history.replace(from)
     }catch(e){
       setLoading(false)
       message.error(e)
     }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.loginWraper}>
      <Card className={styles.logincard}>
        <img src={logo} className={styles.logoImg}></img>
        <Form
          name="basic"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            agree: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="mobile"
            rules={[{ required: true,pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
                { required: true, message: '验证码不能为空' },
              { pattern: /^\d{6}$/, message: '验证码格式错误' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
            rules={[
                {
                    type:'boolean',
                    validator:(rule,value)=>{
                     if(!value){
                         return Promise.reject(new Error('请阅读并同意条款和协议'))
                     }else return Promise.resolve()
                    }
                }
            ]}
          >
            <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
