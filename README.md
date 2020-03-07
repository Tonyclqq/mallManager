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

   2. >[Vue开发插件]([https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6](https://cn.vuejs.org/v2/guide/plugins.html#开发插件))

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

      5. 项目-登录-保存 -token 值

         1. > 目的：如果用户没登录，---->直接来到home组件
            >
            > 在登录成功时，保存正确用户的token值
            >
            > ```js
            > localStorage.setItem('token',data.token)
            > //第一个参数为保存的名字，第二个为保存的数据
            > ```

## 项目-首页（home）-布局容器-使用-样式调整

1. 项目-首页-布局容器-使用-样式调整

   1. ```html
      /*home.vue*/
      <template>
      <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container>
          <el-aside class="aside" width="200px">Aside</el-aside>
          <el-main class="main">Main</el-main>
        </el-container>
      </el-container>
      </template>
      ```

   2. ```css
      .container {
        height: 100%;
      }
      .header {
      
        background-color: #b3c0d1;
      }
      .aside {
        background-color: #d3dce6;
      }
      .main {
      background-color: #e9eef3;
      }
      ```

   3. 项目-首页-布局容器-使用-样式调整

   4. 项目-首页-侧边栏-导航栏-文郎

      1. > el-menu

      2. > 属性： router 开启路由模式 true index值==path值

      3. > unique-opened是否只保持一个子菜单的展开

   5. 项目-首页-侧边栏-引入导航组件-调整

      1. > 调整el-menu

      2. > index值不能一样

   6. x项目-首页-进入首页的权限验证

      1. > 如果没有登录过，就不能进入到home组件
         >
         > ```js
         > /*要在创建目标那之前触发*/
         > //new Vue之前自动触发 
         > beforeCreate(){
         >  //获取token
         >  const token = localStorage.getItem('token')
         >  if(!token) {
         >    this.$router.push({name:'login'})
         >  }
         > }
         > ```

   7. x项目-首页-头部-退出功能

      1. ```
         methods:{
             handleSignout(){
               //1.清楚token
               localStorage.clear()
               //2.提示
               this.$message.success('退出成功')
               //3.来到login组件
               this.$router.push({name:'login'})
             }
           }
         ```

   8. 项目-用户管理-用户列表-新建组件-路由配置

      1. home.vue 开启了路由模式 index值 --->path值
      2. home.vue    man- --->router-view   main里面要写入router-view标签
      3. 新建users.vue   
      4. router/index.js   在路由表home中children配置users的路由

   9. 项目-用户管理-用户列表-面包屑和搜索框

      1. el-card  卡片  小容器
      2. 面包屑  
      3. el-row>el-col>el-input+el-button

   10. 项目-用户管理-用户列表-引入表格组件

       1. > el-table(data数据源[ ])  > el-table-column(label表头/prop=“数据”) >字符串数据

       2. ```html
          <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
          ```

   11. 项目-用户管理-用户列表-表头处理

       1. > 按照效果  调整了表头的数量和Label

       2. > type=”index”   ---->该列的每个单元格的内容从1开始的序号

   12. 项目-用户管理-用户列表-请求数据-设置请求头

       1. created(){  this.getUserList()}

       2. ```
          methods:{getUserList(){发送请求}}
          ```

       3. 接口文档中，除了登陆之外的所有请求，都需要授权 ---->设置请求头

       4. 找axios中关于请求头设置的代码

          1. ```
             const AUTH_TOKEN = localStorage.getItem("token");
                  	  this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
             ```

       5. 发送请求

   13. 项目-用户管理-用户列表-渲染数据-一般数据

       1. 解构赋值：给this.userlist = res.data.data.users

       2. ```
          prop=""
          username
          email
          mobile
          create_time
          mg_state
          ```

   14. 项目-用户管理-用户列表-渲染数据-日期格式处理

       1. main.js全局过滤器 fmtdate

       2. 第一步：prop=“create_time | fmtdate” 不行

       3. 第二步：如果单元格的内容只能显示文本

          1. ```html
             <el-table-column 
                  prop="create_time" 
                  label="创建时间">
                 {{create_time | fmtdate }}
             </el-table-column>
             ```

       4. 如果想要显示不是文本，需要给该内容外层加容器tempalte

          1. > 不同的组件的数据不是共享的，而是独立的作用域	

          2. ```html
             <el-table-column 
                   prop="create_time" 
                   label="创建时间">
                  <template>
                  {{create_time | fmtdate }}
                  </template>
             </el-table-column>
             ```

       5. 最终写法

          1. > 1. slot-scope 作用：传值
             > 2. slot-scope的值会自动去上一级找最外层标签el-table所绑定的数据userList
             > 3. slot-scope=“scope” 此时 “scope”==userlist数组
             > 4. scope.row是数组的每个对象
             > 5. scope.row.create_time我们要用的数据

          2. ```
             <el-table-column 
                   label="创建时间">
                  <template slot-scope="scope">
                   {{scope.row.create_time | fmtdate}}
                  </template>
             </el-table-column>
             ```

   15. 项目-用户管理-用户列表-渲染数据-用户状态开开关

       1. ```html
          <el-table-column  label="用户状态">
                <template slot-scope="scope">
                   <el-switch 
                        v-model="scope.row.mg_state" 
                        active-color="#13ce66" 
                        inactive-color="#ff4963">
                   </el-switch>
                </template>
               </el-table-column>
          ```

   16. 项目-用户管理-用户列表-渲染数据-操作按钮

       1. 操作里面不是字符串
       2. template 容器 slot-scope = “scope”
       3. el-button
       4. size =“mini ”   plain=“true”

   17. 项目-用户管理-用户列表-分页组件-文档-引入

       > 该接口支持分页  url参数中有 pagenum pagesize

       1. @size-change   每页显示条数变化时，触发
       2. @current-change 当前页改变时，触发
       3. current-page 设置当前页是第几页
       4. page-sizes=[2,4,6,8]每页多少条数据数组
       5. page-size设置显示多少条
       6. total数据总数

   18. 项目-用户管理-用户列表-分页组件-配置数据

       1. current-page=“pagenum”
       2. page-size =2
       3. :total= “total”

   19. 项目-用户管理-用户列表-分页组件-分页请求

       1. 每页显示条数改变  ---》 this.pagesize = var   ---》this.getUserList()
       2. 页码改变时  ---->this.pagenum =val  --this.getUserlist()
       3. 希望档每页条数改变时，从第一页开始显示this.pagenum = 1 ----->currpage = 1

   20. 项目-用户管理-用户列表-搜索用户

       1. 给搜索数日狂绑定query v-model=“query”
       2. 点击搜索按钮  发送请求
       3. 一键清除 clearable
       4. 点击清除按钮  ---.重新获取数据

   21. 项目-用户管理-用户列表-添加用户-显示对话框

       1. 引入对话框  ---el-form

       2. 点击添加用户的按钮 --》显示对话框  this.dialogFormVIsibileAdd = true

       3. 配置对话框

          1. ```
             :model=form:{看接口文档中添加用户时用哪个数据}
             ```

          2. this.dialogFormVIsibileAdd =false

       4. el-form > el-input  v-model=“form.xxx”

   22. 项目-用户管理-用户列表-添加用户-发送请求

       1. post this.form

       2. 关闭对话框

       3. 清空对话框

       4. 更新视图

       5. 提示框

       6. > post status ===201

   23. 项目-用户管理-用户列表-删除用户-打开确认框

       1. this.$confirm().then.catch()
       2. 点击确定 -》.then的参数
       3. 点击取消--->.catch的参数

   24. 项目-用户管理-用户列表-删除用户-处理相应

       1. 点击确定   发送delete请求

       2. 提示

       3. 更新数据

       4. 回到第一页展示

       5. ```js
              showDeleUserMsgBox(userId) {
                this.$confirm("删除用户?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(async () => {
                    //发送删除的请求:id -------->用户id
                    //1.data中找userId  ×
                    //2.把userId以showDeleUserMsgBox参数形式进来
                    const res = await this.$http.delete(`users/${userId}`);
                    console.log(res);
                    if (res.data.meta.status === 200) {
                      this.pagenum = 1
                      //更新视图
                      this.getUserList()
                      //提示
                      this.$message({
                        type: "success",
                        message: res.data.meta.msg
                      });
                    }
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消删除"
                    });
                  });
              },
          ```

          

   25. 项目-用户管理-用户列表-编辑用户-显示对话框

       1. > 点击操作中的编辑按钮-打开编辑对话框
          >
          > 提供该对话框显示/隐藏控制属性 dialogFormVisibleEdit

       2. 找到编辑按钮 @click

       3. 打开对话框

       4. 把之前添加对话框进行复制-修改

       5. ：form用的是之前添加用户时的form

   26. 项目-用户管理-用户列表-编辑用户--显示编辑器

       1. 点击edit编辑按钮 scope.row
       2. 在showEditUserDia方法中 this.form user  user其实是scope.row
       3. 用户名---》禁用

   27. 项目-用户管理-用户列表-编辑用户-发送请求

       1. 找到对话框的确定按钮  ---->edituser（）---》发送请求
       2. this.form = user
       3. id  = this.form.id
       4. 先点编辑再点添加--->打开添加对话框之前   ----this.form = {}

   28. 项目-用户管理-用户列表-修改用户状态

       1. 找到开关 @change=“changeMgState(scope.row)”

       2. changeMsagState(){发送请求}

       3. > users/:uId/state/:type uid用户id   v-model数据双向绑定。。

   29. 项目-用户管理-用户列表-分配角色-功能演示

       1. 点击按钮  -》打开对话框
       2. 对话框中有下拉框
       3. 修改当前用户的角色
       4. 5个角色名来源于请求
          1. 每个角色的权限是不同的

   30. 项目-用户管理-用户列表-分配角色-显示对话框

       1. 点击操作中的按钮 --->打开对话框

       2. 引入对话框(有下拉框)

          1. > 下拉框特性 如果select绑定的数据的值和option的value的纸一样，此时现实的是该option的la'bel的值

       3. 把option分成两类 请选择(-1) 和v-for遍历option

       4. data提供了el-select 的v-model所绑定的数据currRoleId = -1

   31. 项目-用户管理-用户列表-分配角色-显示对话框-下拉框

       1. el-select 和el-option
       2. 当改变label时，----》该label显示----》改变了value --》el-select  v-model绑定的数据自动关联

   32. 项目-用户管理-用户列表-分配角色-显示当前用户角色

       1. 通过请求获取所有角色 roles
       2. v-for el-option :label =“item.roleName” :value=”“item.id”
       3. 通过请求获取当前用户的rid
       4. 给el-select 中v-model的绑定的数据赋值 this.currRoleId = res.data.data.rid
       5. rid接口文档的参数名是role_id
       
   33. 项目-用户管理-用户列表-分配角色-修改用户角色

       1. 通过试图操作--->修改了label -->value值变化----->el-select v-model绑定的数据变化

       2. currRoleId

          1. 在setRple方法中要使用用户id，在data声明currUserId：-1
          2. 在showSetUserRoleDia(){this.currUserId=  user.id}

       3. ```js
           async setRol(){
                // eslint-disable-next-line no-unused-vars
                const res = await this.$http.put(`users/${this.curruserId}/role`,{
                  rid:this.currRoleId
                })
                //关闭对话框
                this.dialogFormVisibleRol = false
                
              },
          ```

   34. 项目-用户管理-用户列表-合并分支-推送

       1. git add . 先提交
       2. git commit -m “注释”  提交的内容
       3. git branch    查看分支
       4. git checkout master      切换到主分支
       5. git merge dev-users      将dev-users分支合并到主分支
       6. git push -u origin master提交到远程服务器
       
   35. 项目-权限管理-新建分支-功能表演

       1. git checkout -b dev-rights  **创建并切换分支**
       2. 权限管理
          1. 角色列表
       3. 权限列表

   36. 项目-权限管理-权限列表-新建组件-路由配置

       1. 新建right.vue
       2. home.vue改标识
       3. 配置路由

   37. 项目-权限管理-权限列表-自定义面包屑组件

       1. 好多组件都有面包屑 ->二次封装面包屑组件
       2. 新建myBread.vue
       3. 在自定义组件中提供数据 level1,level2 --->props:[来源使用组件时，传的值]
       4. 注册为全局组件，main.js引入，Vue.component(MyBread.name ,MyBread)

   38. 项目-权限管理-权限列表-获取权限列表数据

       1. 除了登陆之外的所有请求 都需要设置头部信息
       2. type参数 值 list或者tree

   39. 项目-权限管理-权限列表-axios-拦截器统一设置请求头

       1. > 除了登陆之外的所有请求-都需要设置头部信息

          > 在请求发起之前 要添加头部 axios文档

          > 请求拦截器 config.header

          > 响应拦截器(目前没使用)
       
   40. 项目-权限管理-权限列表-表格展示

       1. 引入el-table 绑定数据rightList(authName   path   level)

   41. 项目-权限管理-权限列表-表格展示-层级展示

       1. level === ‘0’ 一级
       2. template slot-scope =“scope”
       3. v-if = “scope.row.level === ‘0’ ” 一级
       
   42. 项目-权限管理-权限列表-表格展示-固定表头

       1. 给el-table设置固定高
       2. overflow:auto

   43. 项目-权限管理-角色列表-新建路由-配置路由

       1. 新建role.vue组件
       2. 配置路由

   44. 项目-权限管理-角色列表-面包屑和添加按钮

       1. 自定义面包屑
       2. 添加按钮

   45. 项目-权限管理-角色列表-获取角色列表数据

       1. 发送请求 `this.$http.get(`roles`)`

   46. 项目-权限管理-角色列表-表格展示

       1. 将user.vue中的表格进行复制修改
       2. :data=“rolelist”
       3. roleName
       4. roleDesc
       5. 操作

   47. 项目-权限管理-角色列表-表格展示-展开行功能分析

       1. type=“expand”
       2. template > 该角色的权限(三级)
       3. 页面布局如果是行列问题  ->for循环   --》v-for嵌套 el-tag标签

   48. 项目-权限管理-角色列表-表格展示-展开行-一级权限

       1. 分析数据roleList > 每个对象中的children中authName

       2. 布局  

          1. ```
             一行
             	第一列 el-tag
             	第二列	一行
             			(两列)el-colA  > el-tag
             				 el-colB  > el-tag
             ```

       3. 一级权限展示v-for 最外城的el-row scope.row.children

   49. 项目-权限管理-角色列表-表格展示-展开行-二级权限

       1. 在第一列(一级权限)的基础上 展示二级权限

       2. ```html
          <el-row v-for="(item2,i) in item1.children" :key="i">
                  <el-col :span="4">
                         <el-tag >{{item2.authName}} </el-tag>
                  </el-col>
                  <el-col :span="20">
              	</el-col>
          </el-row>
          ```

   50. 项目-权限管理-角色列表-表格展示-展开行-二级权限

       1. 在二级权限展示完毕基础上
          1. v-for 便利的是item2.children   el-tag

   51. 项目-权限管理-角色列表-表格展示-展开行-样式调整

       1. el-tag 颜色 type=“success”
       2. closeable         关闭按钮
       3. <i class="el-icon-arrow-right"></i>    图标

   52. 项目-权限管理-角色列表-表格展示-展开行-处理无权限的展示

       1. 角色无权限时

       2. ```html
          <span v-if="scope.row.children.length === 0">未分配权限</span>
          ```

   53. 项目-权限管理-角色列表-表格展示-展开行-取消权限

       1. 点击  X，取消该角色的权限
       2. 给el-tag @close =“deleRight(scope.row.id , itemx.id)”  点击关闭事件
       3. deleRight(roleId,rightId){发送请求}
       4. this.$http.delete(`roles/${roleId}/rights/${rightId}`)
       5. 更新整个视图
       6. 删除成功 返回了该角色的剩余权限

   54. 项目-权限管理-角色列表-表格展示-展开行-取消权限-优化

       1. 删除成功--》更新了整个表格 --->没必要
       2. 删除成功   返回了该角色的剩余权限
       3. 删除成功 - 》更新了当前角色的children
       
   55. 项目-权限管理-角色列表-表格展示-修改权限-显示对话框

       1. 点击操作的check按钮  --->打开对话框
       2. 提供对话框
       3. 给check按钮 @click=“dialogFormVisibleRight(scope.row)”

   56. 项目-权限管理-角色列表-表格展示-修改权限-树形结构-文档分析

       1. ```
          <!-- 树形结构
                  data-- 数据源[]
                  show-checkbox 选择框
                  node-key 每个节点的唯一标识 通常是data数据源中key名id
                  default-expanded-keys 默认展开[要展开的节点的id]
                  default-checked-keys  要选择的节点的id
                  props 配置项{label,children}   label：节点的文字标题,children：节点的子节点
                  值都来源于data绑定的数据源中的该数据的可以名-->
                <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2,3]"
                  :default-checked-keys="[5]"
                  :props="defaultProps"
                ></el-tree>
          ```

   57. 项目-权限管理-角色列表-表格展示-修改权限-树形结构-配置数据

       1. data中 treelist
       2. 打开对话框是 获取树形结构的权限列表数据
       3. const res = await this.$http.get(`rights/tree`)
       4. this.treelist = res.data.data
       5. el-tree :data=“treeList”
       6. el-tree node-key=“id”
       7. :props = {label:’authName’,children:’children’}
       8. 默认展开和选择还没写

   58. 项目-权限管理-角色列表-表格展示-修改权限-树形结构-展开所有项

       1. el-tree default-expand-all
       2. default-expanded-keys=“[所有权限的id]” foreah嵌套

   59. 项目-权限管理-角色列表-表格展示-修改权限-树形结构-显示角色拥有的权限

       1. el-tree default-checked-key=“[]”

       2. data arrcheck

       3. ```
          role for 嵌套 获取最里面叶子节点的id
          let arrtemp2 = [];
                role.children.forEach(item1 => {
          
                  item1.children.forEach(item2 => {
                    
                    item2.children.forEach(item3 => {
                      arrtemp2.push(item3.id);
                    });
                  });
                }); 
          ```

       4.  this.arrCheck = arrtemp2
       
   60. 项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-实现

       1. 点击对话框的缺点 发送请求

       2. roleId rid

       3. roleId 在打开对话框的方法中 this.roleId = role.id

          1. 获取全选的节点id数组  getCheckedKeys
          2. 获取半选的节点id数组  getHalfCheckedKeys

       4. 在js中调用el-tree的js方法

          1. 给le-tree设置ref
          2. this.$refs.ref的值tree.js方法（3.1，3.2的方法名

       5. 返回两个数组arr1 和arr2

       6. ES6 展开运算符

       7. > let arr = [...arr1,...arr2]

       8.  this.$http.post(`roles/${this.currRoleOd}/rights`,{rids:arr.join(',')})

       9.  //关闭对话框

             this.dialogFormVisibleRight = false

       10. //更新视图

              this.getRoleList()
       
   61. 项目-首页-侧边栏-动态导航
   
       1. get(‘menus’)获取导航的所有数据
   
       2. order
   
       3. path标识
   
       4. children
   
       5. v-for
   
       6. > 在写之后的路由配置时，path不能瞎写了
   
   62. 项目-效果演示-不同角色用户登录-显示对应权限
   
       1. 每个角色有不同的权限
       2. 新建用户   分配角色
       3. 回到登录页  登陆新用户   ->token
       4. 渲染home组建的侧边栏时 使用header 中的token
       5. 发送getMenus()也会使用header
       
   63. 项目-不同角色用户登录-显示对应权限-导航守卫
   
       1. 在home.vue中判断token，很麻烦
   
       2. 导航守卫
   
          1. 配置生效前 先来到路由守卫的回调函数
   
          2. to 要去的路由配置   from当前的路由配置
   
          3. next()让当前的路由配置继续生效
   
          4. ```js
             router.beforeEach((to,from,next)=>{
                 if(to.path === '/login'){
                     next()
                 } else {
                     const token = localStorage.getItem('token')
                     if(!token){
                         Message.warning('请先登录')
                         router.push({name:'login'})
                     } else {
                         next()
                     }
                     
                 }
             })
             ```
   
   64. 









