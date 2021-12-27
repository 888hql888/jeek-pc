// 导入创建 store的函数 和 使用中间件函数
import {createStore,applyMiddleware} from 'redux'

// 导入 thunk 让 action 可以支持处理函数形式(从而可以在action内执行异步操作 如发送ajax请求)
import thunk from 'redux-thunk'

// 导入 查看 redux 状态的工具
import {composeWithDevTools} from 'redux-devtools-extension'

// 导入reducer
import rootReducer from './reducers'

import { getToken } from '@/utils'

// 声明中间件接受
const middlewares = composeWithDevTools(applyMiddleware(thunk))

// 获取初始值
const initState = {
    login:getToken()
}

// 创建 store 接收 三个参数 1.reducer处理文件 2.默认初始值 3.中间件
const store = createStore(rootReducer,initState,middlewares)

// 暴露 store
export default store