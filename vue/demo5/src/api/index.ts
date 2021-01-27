import axios from 'axios';

// 实例化
const instance = axios.create({
    baseURL: '',
    withCredentials: true, // 是否允许带cookie
    timeout: 20000,
});

// 请求拦截器
instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    // 对响应错误做点什么
    console.log('拦截器报错');
    return Promise.reject(error);
});

const axiosPost = (url: string, params: object) => {
    return new Promise((resolve, reject) => {
        instance.post(url, params).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
};

const axiosGet = (url: string, params: object) => {
    return new Promise((resolve, reject) => {
        instance.get(url, { params }).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
};

export { axiosPost, axiosGet }