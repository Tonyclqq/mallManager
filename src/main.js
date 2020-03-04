import Vue from 'vue'
import App from './App.vue'

//导入自己组建的面包屑组件,MyBread其实是组件选项所在的对象{template:'},
import MyBread from 'components/cuscom/myBread.vue'
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
//引入moment时间插件
import moment from 'moment'
//全局过滤器 --处理日期
Vue.filter('fmtdate',(v)=>{
  return  moment(v).format('YYYY-MM-DD')
})
//全局自定义组件
Vue.component(MyBread.name ,MyBread)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
