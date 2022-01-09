// 自定义 创建 BrowserHistrory 的 方法

// 自定义history对象
// import { createBrowserHistory } from 'history'

// const history = createBrowserHistory()

// export default history


// BrowserHistory 和 HashHistory 都是 由 react-router-dom中的 Route + history 合成的
// 要实现 这两个路由 只要在原本的路由Route中引入 history就可以了
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

export default history


