// 封装鉴权组件 根据token决定是否打回登录页
import { hasToken } from "@/utils/token";
import React from 'react'
import { Route,Redirect,useLocation } from "react-router-dom";
export default function PrivateRoute({children,...rest}) {
    const location = useLocation()
    return (
        <Route {...rest} render={()=>{
            if(hasToken()) return children
            else{
              return(
                  <Redirect to={{pathname:'/login',state:{from:location.pathname}}}></Redirect>
              )
            }
        }}>
        </Route>
    )
}
