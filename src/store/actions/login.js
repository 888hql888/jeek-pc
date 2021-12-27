import request from '@/utils/request'
import {setToken,clearToken} from '@/utils'
import {LOGIN,LOGOUT} from '../constants'

// 登陆
const login = (data) => {
    return async (dispatch) => {
        const res = await request({
            method:'post',
            url:'/authorizations',
            data
        })
        const token = res.data.token
        //存储到本地
        setToken(token)
        //redux存储
        dispatch({
            type:LOGIN,
            data:token
        })
    }
}

// 登出
const logout = () => {
    return (dispatch) => {
        //本地清除
        clearToken()
        //redux清除
        dispatch({
            type:LOGOUT,
            data:''
        })
    }
}

export {
    login,
    logout
}