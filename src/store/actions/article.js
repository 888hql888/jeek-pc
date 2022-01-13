import request from "@/utils/request";
import { GET_CHANNEL_List, GET_ARTICLE_LIST } from "../constants";
//获取频道数据
export const getChannel = () => {
  return async (dispatch) => {
    const res = await request.get("/channels");
    dispatch({
      type: GET_CHANNEL_List,
      data: res.data.channels,
    });
  };
};
//获取文章数据
export const getArticleList = (params) => {
  return async dispatch => {
    const res = await request({
      url: '/mp/articles',
      params
    })
    dispatch({
      type: GET_ARTICLE_LIST,
      data: res.data
    })
  }
}
//删除文章
export const delArticle = (id) => {
  return async () => {
    await request({
      method: 'delete',
      url: `/mp/articles/${id}`
    })
  }
}
//发表文章
export const publishArticle = (draft,data) => {
  return async () => {
    await request({
      method: 'post',
      url: `/mp/articles`,
      data,
      params:{
        draft
      }
    })
  }
}