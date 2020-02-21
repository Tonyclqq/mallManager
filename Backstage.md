## 项目准备-项目功能演示

1. 登录

2. 首页

   1. 用户管理
      1. 用户列表
   2. 权限管理
      1. 角色列表
      2. 权限列表
   3. 商品管理
      1. 商品列表
      2. 商品分类
      3. 分类参数
   4. 订单管理
      1. 订单列表
   5. 数据统计
      1. 数据报表

   > 项目中出现多次重复的试图，不重复写

## 项目准备---->项目准备素材说明

1. `Mysql`图形界面工具`navicat`导入`db`文件夹下的`mydb.sql`;

2. 修改`config`文件夹下的`default.json`中的数据库信息

   1. ```json
      "db_config" : {
      		"protocol" : "mysql",
      		"host" : "127.0.0.1",
      		"database" : "tonyc",
      		"user" : "root",
      		"password" : "123456",
      		"port" : 3306
      	}
      ```

      

3. 在后台根目录运行 app.js文件，  命令：`node app.js`

## 接口文档：/dosc/index.html



## 项目-准备-批处理

1. 来到要执行执行指令的路径 api-server
2. 新建start.txt
3. start.txt写入要执行的指令node app.js 保存
4. 修改start.txt  -——》start.bat
5. 双击start.bat文件

## 项目准备-vue-cli脚手架创建项目

## 项目使用Elemeng-UI库

> elemengt-ui是由饿了么团队开发
>
> 适用于vue项目的PC项目

1. 安装 element-ui

2. 在main.js中引用

   1. ```
      import ElementUI from 'element-ui';
      import 'element-ui/lib/theme-chalk/index.css';
      Vue.use(ElementUI)
      ```

## 项目-版本-控制-git

> git/svn

1. git init 

2. git status

3. git add . 

4. git commit -m “注释”

5. ```
   git remote add origin ssh地址 //关联仓库
   ```

6. ```
   git push -u origin master   //推送到远程
   ```

## 新建登录组件配置路由

1. 新建一个分支 专门写登录功能

   1. ```
      git branch 查看分支
      git checkout -b dev-login
      ```

   2. 新建组件

2. 安装路由插件，创建路由

3. ```js
   import vue from 'vue'
   import vueRouter from 'vue-router'
   vue.use(vueRouter)
   
   const login = () => import('components/login/login.vue');
   
   const routes = [
       {path: '', redirect: '/login' },
       {name:'login', path: '/login', component: login },
   ]
   const router = new vueRouter({
      routes
   })
   
   export default router
   ```

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   import router from './router/idnex'
   
   Vue.config.productionTip = false
   
   new Vue({
     router,//---------------
     render: h => h(App),
   }).$mount('#app')
   
   ```

   ```html
   <template>
     <div id="app">
       <router-view></router-view> /*-------------------*/
     </div>
   </template>
   ```

   **关于路由的步骤**
   
   1. ​	安装路由		npm i vue-router -S
   
   2. ​    引入vue和vue-router  
   
      1. ```
         import vue from 'vue'
         import vueRouter from 'vue-router'
         将插件注入到vue中
         vue.use(vueRouter)
         ```
   
   3. 引入路由组件，创建路由表
   
      1. ```
         const login = () => import('components/login/login.vue');
         
         const routes = [
             {path: '', redirect: '/login' },
             {name:'login', path: '/login', component: login },
         ]
         ```
   
   4. 创建路由实例,添加路由表到路由实例当中，导出路由实例
   
      1. ```
         const router = new vueRouter({
            routes
         })
         
         export default router
         ```
   
   5. 在main.js中引用路由实例，并挂载到Vue实例上
   
   6. 在App.vue中，添加<router-view></router-view>
   
4. **注意：**

   1. commit每完成一个小功能就commit一次
   2. push操作在master去完成

5. 引入表单组件

   1. ```
      引入
      ```

      ```
      调整标签(h2+button)
      ```

      ```
      label-position = "top"
      ```

      

   2. 调整样式

      1. height:100%   ------->注意：高度是一级一级的继承的要给#app添加100%

6. 项目-登录插件-axios 插件

   1. > axios不是Vue插件，但可以开发一个插件
   
   2. 
      >[Vue开发插件]([https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6](https://cn.vuejs.org/v2/guide/plugins.html#开发插件))
      
   3. ```js
      在src目录下创建一个plugins/http.js
      /*---------------------------------------*/
      把axios制作为一个vue的插件
      import axios from 'axios'
      const MyHttpServe = {}
      MyHttpServe.install = (Vue) => {
          // 4. 添加实例方法
          Vue.prototype.$http = axios
      }
      export default MyHttpServe
      
      /*---------------------------------------*/
      在  main.js中使用
      
      import MyHttpServe from 'plugins/http'
      Vue.use(MyHttpServe)
      ```
   
7. 项目-登录-发送登录请求

   1. login.vue 文件

   2. ```js
      methods:{
      	 handleLogin() {
            this.$http.post("login", this.formdata).then(res => {
              //console.log(res)
              //对象结构赋值
              const {
                //data,
                meta: { msg, status }
              } = res.data;
              if (status === 200) {
                //1.跳转到home
                this.$router.push({ name: "home" });
                //提示成功
                this.$message.success(msg)
              } else {
                this.$message.warning(msg)
              }
            });
          }
      }
      ```

      `this.$message.success(msg)`和` this.$message.warning(msg)`  

      (这两个提示是element提供的插件)[https://element.eleme.cn/#/zh-CN/component/message]

   3. 此时的数据请求为异步操作的代码，想要把异步代码看起来像同步代码要用到ES7  `async+await`
   
      1. 让异步代码看起来像同步代码
   
      2. ```js
         /*-------------源代码***************/
          handleLogin() {
               this.$http.post("login", this.formdata).then(res => {
                 //console.log(res)
                 //对象结构赋值
                 const {
                   //data,
                   meta: { msg, status }
                 } = res.data;
                 if (status === 200) {
                   //1.跳转到home
                   this.$router.push({ name: "home" });
                   //提示成功
                   this.$message.success(msg)
                 } else {
                   this.$message.warning(msg)
                 }
               });
             }
         ```
   
      3. ```
         因为发送的网络请求为异步操作，找到异步操作有结果的代码前面加一个await,同时接收异步操作的结果res
         同时找到距离异步操作有结果的代码最近的方法，前面加async
         具体如下
         ```
   
      4. ```
         async handleLogin() {
               const res = await this.$http.post("login", this.formdata);
               const {
                 //data,
                 meta: { msg, status }
               } = res.data;
               if (status === 200) {
                 console.log(res);
                 //1.跳转到home
                 this.$router.push({ name: "home" });
                 //提示成功
                 this.$message.success(msg);
               } else {
                 this.$message.warning(msg);
               }
             }
         ```
   
      5. 



​      

​      

​      