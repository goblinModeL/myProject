import axios from "axios";

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE, // 设置基础 URL
    timeout: 10000, // 超时时间 10s
    withCredentials: true, // 允许携带 cookie
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // 统一在请求头携带 token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.data.code !== 200) {
            return Promise.reject(response.data);
        }
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                console.error("未授权，重新登录");
                // 这里可以触发登出逻辑，比如清除 token 并跳转登录页
                localStorage.removeItem("token");
                window.location.href = "/login";
            } else {
                console.error(data.message || "请求出错");
            }
        } else {
            console.error("网络错误或服务器未响应");
        }
        return Promise.reject(error);
    }
);

export default service;
