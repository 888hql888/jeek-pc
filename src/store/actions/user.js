import { GET_USER_INFO } from '../constants'
import request from '@/utils/request'

// 获取用户资料
export const getUser = () => {
    return async dispatch =>{
     const res = await request.get('/user/profile')
     dispatch({
         type:GET_USER_INFO,
         data:res.data
     })
    }
}