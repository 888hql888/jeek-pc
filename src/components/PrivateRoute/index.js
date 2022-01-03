import { hasToken } from '@/utils/token'
import { Redirect, Route, useLocation } from 'react-router-dom'
export default function PrivateRoute({ children, ...rest }) {
  const location = useLocation()
  console.log(location)
  return (
    <Route
      {...rest}
      render={() => {
        if (hasToken()) {
          // 登录了
          return children
        } else {
          return (
            <Redirect
              // 拦截到登录页的时候，需要把当前的路径传递过去，保证登录成功能够跳转回来
              to={{ pathname: '/login', state: { from: location.pathname } }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}