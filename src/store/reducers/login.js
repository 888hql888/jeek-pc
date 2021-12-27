//专门处理 login 的 reducer
// 注意： reducer 是一个纯函数 输入什么 得到什么

const initValue = "";

const login = (pre = initValue, action) => {
  const { data, type } = action;
  switch (type) {
    case "loginIn":
      return pre;
      break;
    case "loginOut":
      return pre;
      break;
    default:
      return pre;
      break;
  }
};
export default login