import { message } from 'antd'
import { hasToken,getToken } from './token'
import axios from 'axios'
//导入 store 和 history 获取 调用redux 和 路由跳转能力
import store from '@/store'
import history from './history'
import { logout } from '@/store/actions/login'
// import { getToken, hasToken, removeToken } from 'utils/storage'
// import history from 'utils/history'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000,
})

// 配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (hasToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (err) {
    if (!err.response) {
      message.error('网络繁忙，请稍后重试')
      return Promise.reject(err)
    }
    if (err.response.status === 401) {
      // token过期了
      // 提示消息
      message.error('登录信息过期', 1)
      // 清除token
      store.dispatch(logout())
      // 跳转到登录 history
      console.log(history.location.pathname)
      history.replace({
        pathname: '/login',
        // token失效，跳转到登录页之前的那个页面
        state: {
          from: history.location.pathname
        }
      })
    }
    // 对响应错误做点什么
    return Promise.reject(err)
  }
)

export default instance