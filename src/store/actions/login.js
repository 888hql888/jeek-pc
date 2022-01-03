//处理登录相关的action
import { LOGIN,LOGOUT } from '../constants'
import request from '@/utils/request'
import {setToken,removeToken} from '@/utils/token'

// 获取并存储token到 redux 和 本地
export const login = (data) => {
    return async dispatch => {
        const res = await request({
            method: 'post',
            url: '/authorizations',
            data
        })
        const token = res.data.token
        //存储到redux
        dispatch({
            type:LOGIN,
            data:token
        })
        //存储到本地
        setToken(token)
    }
}

//登出
export const logout = ()=>{
    return dispatch => {
        dispatch({
            type:LOGOUT
        })
    }
}