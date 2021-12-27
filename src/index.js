import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './utils/request'
import 'antd/dist/antd.css'
import App from './App';
// 导入 Provider 让redux数据共享每个组件
import {Provider} from 'react-redux'
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

