import axios from 'axios';

// 基本路径配置
const Util = {
  apiPath: 'http://localhost:8080/'
};

// Ajax通用配置
Util.ajax = axios.create({
  baseURL: Util.apiPath
});

// 响应拦截器
Util.ajax.interceptors.response.use((res) => {
  return res.data;
});

export default Util;
