import { GET_USER_INFO } from "../constants"
const initValue = {
    userInfo:{
    }
}

export const user = (pre=initValue,action)=>{
    const {type,data}=action
    if(type===GET_USER_INFO){
        return {
            ...pre,
            userInfo:data
        }
    }else return {...pre}
}