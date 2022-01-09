//自定义hooks
import { useEffect } from "react"
import request from '@/utils/request'
import { getChannel } from "@/store/actions/article";
import { useDispatch, useSelector } from "react-redux";

// 获取 频道数据
export const useGetChannel = () => {
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getChannel())
    }, [])
    return useSelector((state) => state.article.channelList)
}