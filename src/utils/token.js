// 封装本地存储的操作
const TOKEN_KEY = 'loginToken'

export function getToken() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function hasToken() {
  return !!getToken()
}
