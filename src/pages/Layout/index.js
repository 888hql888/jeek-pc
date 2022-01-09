import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Popconfirm } from "antd";
import { Route, Link,Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChartOutlined,
  CopyOutlined,
  CheckOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
//路由组建
import Article from "../Article";
import Publish from "../Publish";
import Home from "../Home";
import { getUser } from "@/store/actions/user";
import { logout } from "@/store/actions/login";
import styles from "./index.module.scss";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default function MyLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const pathName = location.pathname;
  const user = useSelector((state) => state.user.userInfo);
  // 获取用户个人资料 从action中发起请求
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const onConfirm = () => {
    dispatch(logout());
    //回到登录页
    history.push("/login");
  };
  return (
    <div className={styles.root}>
      <Layout style={{overflow:'auto'}}>
        <Header className="header">
          <div className="logo" />
          <div className="profile">
            <span>{user.name}</span>
            <Popconfirm
              title="你确定要退出本系统吗?"
              okText="确定"
              cancelText="取消"
              placement="bottomRight"
              onConfirm={onConfirm}
            >
              <span>
                <LogoutOutlined></LogoutOutlined> 退出
              </span>
            </Popconfirm>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[pathName]}
              defaultOpenKeys={["/home"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="/home" icon={<BarChartOutlined />}>
                <Link to="/home">数据概览</Link>
              </Menu.Item>
              <Menu.Item key="/home/article" icon={<CopyOutlined />}>
                <Link to="/home/article">内容管理</Link>
              </Menu.Item>
              <Menu.Item key="/home/publish" icon={<CheckOutlined />}>
                <Link to="/home/publish">发布文章</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {/* 二级路由 */}
              <Switch>
                <Route path="/home" component={Home} exact></Route>
                <Route path="/home/article" component={Article}></Route>
                <Route path="/home/publish" component={Publish}></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
