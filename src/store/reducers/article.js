import { GET_CHANNEL_List,GET_ARTICLE_LIST } from "../constants"
const initValue = {
    channelList:[],
    articleData:{}
}
export const article = (pre=initValue,action)=>{
    const {type,data} = action
    if(type===GET_CHANNEL_List){
        return {...pre,channelList:data}
    }else if(type===GET_ARTICLE_LIST){
        return {...pre,articleData:data}
    }
    else return {...pre}
}