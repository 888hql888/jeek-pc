// 导入创建store的构造函数 和 中间件
import {createStore,applyMiddleware} from 'redux'
// 导入 redux 工具
import { composeWithDevTools } from 'redux-devtools-extension'
// 导入 thunk函数 实现action函数体内可以实现副作用
import thunk from 'redux-thunk'
// 导入 总的reducer
import rootReducer from './reducers'

import { getToken } from '@/utils/token'
// 整合中间件
const middles = composeWithDevTools(applyMiddleware(thunk))
// 初始化模块参数
const initValue = {
    login:{
        token:getToken()
    }
}
const store = createStore(rootReducer,initValue,middles)

export default store