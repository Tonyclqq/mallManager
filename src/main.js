import Vue from 'vue'
import App from './App.vue'
//引入路由文件
import router from './router/idnex'
//引入全局css
import 'assets/css/reset.css'
//使用element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入网络请求    把aixos做成插件进行全局使用 
import MyHttpServe from 'plugins/http'
Vue.use(MyHttpServe)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
