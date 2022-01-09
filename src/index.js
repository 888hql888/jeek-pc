import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./utils/request";
import "antd/dist/antd.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
ReactDOM.render(
  // configProvider为国际化组件
  <ConfigProvider locale={locale}>
     <Provider store={store}>
    <App />
  </Provider>
  </ConfigProvider>
,
  document.getElementById("root")
);
