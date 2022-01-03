// reducer 是一个纯函数 接收什么类型的参数 返回什么类型的结果
import { LOGIN, LOGOUT } from "../constants"
const initValue = {
    token:''
}
export const login = (pre=initValue,action) => {
    const {data,type} = action
    if(type===LOGIN){
        return {...pre,token:data}
    }
    else if(type===LOGOUT) return{...pre,token:''}
    else return pre
}
