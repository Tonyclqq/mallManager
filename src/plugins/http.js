import axios from 'axios'
//导入nprogress 包 对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const MyHttpServe = {}
MyHttpServe.install = (Vue) => {
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
    //在request拦截器中展示进度条 nprogress.start()
    axios.interceptors.request.use(function(config){
        NProgress.start()
        if(config.url !=='login'){
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers["Authorization"] = AUTH_TOKEN;
        }
        return config
    },function(error){
        return Promise.reject(error)
    })
    //在response拦截器中，隐藏进度条  nprogress.done()
    axios.interceptors.response.use(config =>{
        NProgress.done()
        return config
    })
    // 4. 添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServe