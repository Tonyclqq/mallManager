import axios from 'axios'

const MyHttpServe = {}
MyHttpServe.install = (Vue) => {
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"

    axios.interceptors.request.use(config => {
        if (config.url !== 'login') {
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers["Authorization"] = AUTH_TOKEN;
        }
    }, err => {
        // eslint-disable-next-line no-console
        console.log(err)
    })
    axios.interceptors.response.use(res => {
        return res.data
    }, err => {
        // eslint-disable-next-line no-console
        console.log(err)
    })
    // 4. 添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServe