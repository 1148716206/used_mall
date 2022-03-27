import { message } from 'antd';
import axios from 'axios';


axios.interceptors.request.use(config => {
    const passURL = ['/api/login', '/api/register'];
    if (passURL.includes(config.url)) return config;

    const tk = localStorage.getItem('@#@TOKEN');
    if (tk) {
        config.headers.Authorization = 'Bearer ' + tk;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

axios.interceptors.response.use(response => {
    const { status, msg } = response.data;
    if (status === 401 && msg === "TOKEN ERROR") {
        message.error('没有权限，请登录')
        setTimeout(() => {
            window.location.href = '/login';  
        }, 1000);
    }
    return response;
});
export default axios;