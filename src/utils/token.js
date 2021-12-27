// 封装 token 增删改查
const Token_key = 'geek_pc_token'

const getToken = () => localStorage.getItem(Token_key)

const setToken = token => localStorage.setItem(Token_key,token)

const clearToken = () => localStorage.removeItem(Token_key)

//是否授权
const isAuth = ()=> !!getToken()

export {
    getToken,
    setToken,
    clearToken,
    isAuth
}