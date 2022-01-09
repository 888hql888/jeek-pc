import React from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Select,
  message,
  Input,
} from "antd";
import { Link } from "react-router-dom";
import Channel from "@/components/Channel";
import styles from "./index.module.scss";
export default function Publish() {
  const onFinish = (value) => {
    console.log(value, "value...");
  };
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="home/publish">发布文章</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form
          name="basic"
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="标题" name="status">
            <Input></Input>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Channel></Channel>
          </Form.Item>
          <Form.Item label="封面" name="cover">
            <Radio.Group >
              <Radio value={1}>单图</Radio>
              <Radio value={2}>三图</Radio>
              <Radio value={3}>无图</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 20 }}>
            <Button type="primary" htmlType="submit">
              发布文章
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
