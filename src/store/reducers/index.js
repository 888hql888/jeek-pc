//引入 合并 多个 reducer的组件
import {combineReducers} from 'redux'

// 导入需要的reducer
import login from '../reducers/login'

// 生成总的 reducer
const rootReducer = combineReducers({
    login
})

// 暴露
export default rootReducer