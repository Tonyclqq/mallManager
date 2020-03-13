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

   64. 项目-商品管理-功能演示

       1. 商品列表-添加商品
       2. 分类参数
          1. 动态参数(√)
          2. 静态参数(X)
       3. 商品分类
          1. 表格中的树形结构

   65. 项目-商品管理-商品列表-准备组件

       1.  goodslist.vue(只完成了一个数据渲染，其他搜索的功能还没完成)
       2.  配置路由 表示path是goods
       
   66. 项目-商品管理-添加商品-新建组件配置路由

       1. goods/goodsadd.vue
       2. 配置路由 path:/‘goodsadd’
       3. 点击列表组件中ed添加商品按钮 js编程式导航

   67. 项目-商品管理-添加商品-步骤条

       1. 面包屑
       2. 消息提示 el-alert
       3. 步骤条 el-steps
          1. :active=“1”如果=2，表示当前是第二步

   68. 项目--商品管理--添加商品--tabs

       1. ```
          引入了el-tabs  表单元素  v-model="active"
          如果选中的第二个el-tab-pane  此时active的值就是该tab的name值  也就是2
          让el-steps步骤条的:active属性的值和v-model绑定的属性 是同一个
          ```

       2. 

       3. ```html
            <el-tabs v-model="active" tab-position="left" style="height: 200px;">
              <el-tab-pane name="1" label="基本信息">基本信息</el-tab-pane>
              <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
              <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
              <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
              <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
            </el-tabs>
          ```

   69. 项目-商品管理-添加商品-基本信息-表单绑定数据

       1. 最外层包裹 el-form   调整了样式 voerfolw:auto
       2. v-model=“form”
       3. form数据的来源 添加商品的网络请求
       4. 基本信息tab--一般表单元素的数据绑定(名称/加个/重量/数量)

   70. 项目-商品管理-添加商品-基本信息-级联选择器-文档-引入

       1. :options=数据list[]

       2. v-model=“selectedOptions”最终选择的label对应的value会在selectedOptions数组中

       3. :props=“{label:?,value:,children:?}”

       4. ```js
          list:[
              {
                  goodsnname:'家电'
                  id:1,
                  childrenn:[
                  	{
                  		goodsname:'a家电'
                          id:100,
                          childrenn:[
                  			
                  		]
             			}
                  ]
              }
          ]
          ```

       5. @change=“选择改变时触发”

       6. ```html
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            :props="defaultProp"
            @change="handleChange">
          </el-cascader>
          ```

   71. 项目-商品管理-添加商品-基本信息-级联选择器-获取分类数据

       1. created(){}
       2. methods:{ getGoodCate(){发送请求 type=3}}
       3. this.options = res.data.data
       4. defaultProp:{label:’cate_name’,value:’id’,children:’children’}
       5. selectedOptions:[1,3,6]设置默认分类

   72. 项目-商品管理-添加分类-商品参数-获取动态参数数据

       1. 必须要先选择三级分类--》点击第二个tab才会获取数据

       2. if(this.active===‘2’){if(this.selectoroptions.length!====3){提示return}发送请求}

       3. ```
          categories/${this.selectedOptions[2]}/attributes?sel=many
          ```

          sel=many  获取的是动态参数数据

   73. 项目-商品管理-添加商品-商品参数-复选框组-文档-引入

       1. 商品参数-----》动态参数数据  ---》this.arrDyparams
       2. el-form-item+复选框组
       3. v-for 遍历el-form-item和里面的el-checkbox
       4. this.arrDyparams 中的每个对象的 attr_vals字符串  ---split数组
       5. `item.attr_vals = item.attr_vals.length===0 ? []: item.attr_vals.trim().split(',')`

   74. 项目-商品管理-添加商品-商品参数-复选框组-调整样式

       1. border
       2. el-checkbox-group v-model=“item1.attr_vals”.

   75. 项目-商品管理-添加商品-商品属性-获取静态参数

       1. 如果选中了第三个tab  this.active===‘3’同时分类数组长度=====3
       2. sel=only
       3. 静态参数的数据 是给商品属性用的

   76. 项目-商品管理-添加商品-商品参数-布局

       1. v-for遍历

       2. ```html
          <el-form-item 
              :label="item.attr_name" 
              v-for="(item , i) in arrStaticparams" 
              :key="i">
              <el-input v-model="item.attr_vals"/>
          </el-form-item>
          ```

   77. 项目-商品管理-添加商品-图片上传-文档-引入

       1. el-uoload
       2. action 全路径
       3. headers  头部
       4. :on-remove= “移除图片触发的方法”
       5. :on-preview=“”
       6. :on-success=“”

   78. 项目-商品管理-添加商品-图片上传-配置属性

       1. action=“http开头的全路径”
       2. headers:{Authorization:localStorage.getItem('token')}
       3. 除了登录请求 都需要设置头部
       4. file.response.data.tmp_path
       5. file.data.tmp_path图片临时上传的路径

   79. 项目-商品管理-添加商品-商品内容-富文本编辑器

       1. `npm install vue-quill-editor --save`
       2. 局部安装，引入-注册-安装
       3. 插件查找----》github + npm  +vue官网
       4. v-model=“form.goods_introduce”

   80. 项目-商品管理-添加商品-表单数据分析

       1. ```js
          /**goods_name	商品名称	不能为空
                   goods_cat	以为','分割的分类列表	不能为空   ---》级联选择器绑定的数据
                   goods_price	价格	不能为空
                   goods_number	数量	不能为空
                   goods_weight	重量	不能为空
                   goods_introduce	介绍	可以为空
                   pics	上传的图片临时路径（对象）	可以为空
                   attrs	商品的参数（数组） 
          */
          ```

   81. 项目-商品管理-添加商品-表单数据处理-分类和图片

       1. this.form.goods = this.selectoption.join(‘,’)

       2. 在临时上传成功是 给Pics添加元素

       3. 在移除图片

          1. findIndex 找索引
          2. splice(索引，1)

       4. ```js
            handleRemove(file) {
                //file.response.data.tmp_path
                console.log(file);
                //this.form.pics移除当前x掉的图片
                //先获取该图片的索引
                //[{pic:图片路径},]
                let index = this.form.pics.findIndex(item => {
                 return item.pic === file.response.data.tmp_path
                })
                this.form.pics.splice(index,1)
              },
              handleSuccess(file) {
                //tmp_path: "tmp_uploads\cb16fd357dc1db154650c18cd8f30fcb.png"
                console.log(file);
                this.form.pics.push({
                  pic:file.data.tmp_path
                })
              },
          ```

   82. 项目-商品管理-添加商品-表单数据处理-attrs

       1. 文档要求 this.form.attrs[{attr_id:?,attr_value:?}]
       2. 动态参数数组+静态参数数组 map遍历 返回新数组 arr1 &arr2
       3. 合并数组  this.form.attrs = [...arr1,...arr2]
       4. 发送请求
       5. 回到商品列表页

   83. 项目-商品管理-分类参数-新建组件-路由配置

       1. goods/cateparams.vue
       2. 路由配置 path:”/params”

   84. 项目-商品管理-分类参数-动态参数-布局-配置级联选择器

       1. el-form  > el-form-item > el-cas级联选择器
       2. 把goodsadd.vue中的级联选择器进行修改
       3. create(){this.getGoodsCate()}

   85. 项目-商品管理-分类参数-动态参数-获取动态参数数据

       1. 级联选择器选项发生改变时，同时选择了三级分类

       2. 获取动态参数数组

       3. ```js
           async handleChange() {
                if(this.selectedOptions.length === 3){
                   const res = await this.$http.get(
                    `categories/${this.selectedOptions[2]}/attributes?sel=many`
                  );
                  this.arrDyparams = res.data.data;
                  this.arrDyparams.forEach(item => {
                    item.attr_vals =
                      item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
                  });
                }
              },
          ```

   86. 项目-商品管理-分类参数-动态参数-表格渲染

       1. el-table :data=“arrDyparams”
       2. 属性名称  prop=“attr_name”
       3. 第一列 type=“expand”

   87. 项目-商品管理-分类参数-动态参数-动态编辑-tag-文档-引入

       1. 动态tag编辑

       2. 删除

       3. 添加

       4. ###### html(el-tag+el-input-button)+css+js(handleClose  +showInput+handleInputConfirm )

   88. 项目-商品管理-分类参数-动态参数-动态编辑-tag-配置-完成

       1. el-tag v-for=“tag in scope.row.attr_vals”
       2. handleInputConfirm(scope.row.attr_vals)
       3. handleInputConfirm(scope.row.attr_vals)
       4. handleClose(scope.row.attr_vals,tag)

   89. 项目-商品管理-分类参数-动态参数-删除-发送请求

       1. ```js
           async handleClose(scope_row,tag) {
                  scope_row.attr_vals.splice(scope_row.attr_vals.indexOf(tag), 1);
                  //发送请求   categories/:id/attributes/:attrId
                  //put 请求体
                  /**
                   * 
                   * attr_name
                   * attr_sel
                   * attr_vals
                   */
                  let putData = {
                    attr_name:scope_row.attr_name,
                    attr_sel:'many',
                    attr_vals:scope_row.attr_vals.join(','),
                  }
                  const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${scope_row.attr_id}`,putData)
                  console.log(res)
                },
          ```

       2. attr_vals以`,`分割的字符串

       3. 删除请求的接口  put请求体 接口文档中没有

       4. ```js
          attr_name:scope_row.attr_name,
          attr_sel:'many',
          attr_vals:scope_row.attr_vals.join(','),
          ```

   90. 项目-商品管理-分类参数-动态参数-添加-发送请求

       1. ```js
           async handleInputConfirm(scope_row) {
                  let inputValue = this.inputValue;
                  if (inputValue) {
                    scope_row.attr_vals.push(inputValue);
                    //发送请求
                    let putData = {
                    attr_name:scope_row.attr_name,
                    attr_sel:'many',
                    attr_vals:scope_row.attr_vals.join(','),
                  }
                  const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${scope_row.attr_id}`,putData)
                  console.log(res)
                  }
                  this.inputVisible = false;
                  this.inputValue = '';
                },
          ```

       2. 添加属性值和删除属性值是同一个请求

   91. 项目-商品管理-分类参数-静态参数-布局-获取数据

       1. 点击第二个tab请求静态参数数组数据
       2. el-table布局
       3. 把动态参数的表格进行修改

   92. 项目---商品管理---商品分类---准备组件---路由配置

       1. 准备组件goods/goodscate.vue
       2. 路由配置：path:’/categories’

   93. 项目---商品管理---商品分类---准备组件---代码梳理

       1. 对话框中的级联选择器数据还未获取

   94. 项目---商品管理---商品分类-element-tree-grid-文档-引入

       1. 单元格--->树形结构 el-table  ->elementui table插件

       2. 插件名  element-tree-grid -->增强了el-table的单元格

       3. npm i element-tree-grid

       4. 导入

       5. 局部注册

       6. <el-tree-grid></el-tree-grid>

       7. treekey:nodekey：结点唯一标识

       8. parentKey:父节点的id

          levelkey：当前节点的级别

          childkey：字节点

   95. 项目---商品管理---商品分类-element-tree-grid-配置

       1. treeKey等属性值的来源 el-table :data=“list”

       2. ```
           <el-tree-grid 
                    prop="cat_name"
                    lavel="分类名称"
                    treeKey="cat_id"
                    parentKey="cat_pid"
                    levelKey="cat_level"
                    childKey="children"
                    ></el-tree-grid>
          ```

   96. 项目-商品管理-商品分类--添加分类-打开对话框

       1. 点添加家分类按钮---打开对话框
       2. 获取二级分类的数据  type=2
       3. 不能给三级分类子集添加四级分类

   97. 项目-商品管理-商品分类--添加分类--发送请求

       1. 只能添加三级分类

       2. ```js
          async addCate() {
                /*
                          cat_pid	分类父 ID	不能为空
                          cat_name	分类名称	不能为空
                          cat_level	分类层级	不能为空
                          //三种情况  1.一级分类  selectionOptions.length==0  cat_pid=0 cat_level=0
                                      2.二级分类  selectionOptions.length==1  cat_pid=selectionOptions[0]  cat_level=1
                                      3.三级分类  selectionOptions.length==2  cat_pid=selectionOptions[1]  cat_level=2
                       */
                if (this.selectedOptions.length === 0) {
                  this.form.cat_pid = 0;
                  this.form.cat_level = 0;
                } else if (this.selectedOptions.length === 1) {
                  this.form.cat_pid = this.selectedOptions[0];
                  this.form.cat_level = 1;
                } else if (this.selectedOptions.length === 2) {
                  this.form.cat_pid = this.selectedOptions[1];
                  this.form.cat_level = 2;
                }
                const res = await this.$http.post(`categories`,this.form)
                console.log(res)
                //更新视图
                this.getGoodsCate()
                //关闭对话框
                this.dialogFormVisibleAdd =false ;
                this.form ={}
              },
          ```

   98. 项目-订单管理-订单列表-准备组件-路由配置

       1. order/order.vue
       2. 路由配置path:”/oreders”
       3. 编辑按钮--》打开对话框--》省市区引入

   99. 项目-订单管理-订单列表-省市区引入

       1. 在.vue中可以引入.js库swiper.js

   100. 项目-数据统计-数据报表-Echarts-文档-引入

        1. npm i echarts -S

        2. 导入

        3. 试图 提供一个容器(需要设置宽和高)

        4. mychart.init(容器)

        5. 配置选项(配置数据)options

        6. mychart.setOption(option)

        7. mounted(){this.useEcharts()}

        8. ```vue
           <template>
             <el-card>
               <my-bread level1="数据统计" level2="数据报表"></my-bread>
               <div id="main" style="width:600px; height:400px"></div>
             </el-card>
           </template>
           
           <script>
               var echarts = require("echarts");
             export default {
              name: 'report',
               components: {},
               props:{},
               data () {
                 return {
           
                 };
               },
               beforeMount() {},
               mounted() {
                   this.useEchart()
               },
           
               methods: {
                   async useEchart(){
                        var myChart = echarts.init(document.getElementById('main'))
                       // const res = await this.$http.get(`reports/type/1`)
                       let option1= {
                           title:{
                               text:"堆叠区域图"
                           },
                           tooltip:{
                               trigger:"axis",
                               axisPointer:{
                                   type:"cross",
                                   label:{
                                       backgroundColor:"#6a7985"
                                   }
                               }
                           },
                           toolbox:{
                               feature:{
                                   saveAsImage:{}
                               }
                           },
                           grid:{
                               left:"3%",
                               right:"4%",
                               bottom:"3%",
                               containLabel:true
                           }
                       }
                       const res = await this.$http.get(`reports/type/1`)
                        let option2 = res.data.data
                        let option = {...option1,...option2}
                        myChart.setOption(option)
           
                   }
               },
           
               watch: {}
           
             }
           
           </script>
           <style  scoped>
           </style>
           ```


# vue全家桶对项目的优化

## 1.1项目优化策略

- 生成打包报告
- 第三方库启用cdn
- element-ui组件按需加载
- 路由懒加载
- 首页内容定制

## 1.2为项目添加进度条的效果

1. 安装包`npm i nprogress -S`

2. 在axios的请求和响应中去调用nprogress.start()&nprogress.done()函数

3. //导入nprogress 包 对应的js和css

4. ```
   import NProgress from 'nprogress'
   import 'nprogress/nprogress.css'
   ```

5. 请求拦截器

6. ```js
   axios.interceptors.request.use(config =>{
   	NProgress.start()
   	return config
   })
   ```

   想要拦截器

7. ```js
   axios.interceptors.response.use(config =>{
   	NProgress.done()
   	return config
   })
   ```

## 项目优化
###  项目优化策略
1. 生成打包报告
打包时，为了直观地发现项目中存在的问题，可以在打包时生成报告。生成报告的方式有两种：
①通过命令行参数的形式生成报告

```js
// 通过 vue-cli 的命令选项可以生成打包报告 // --report 选项可以生成 report.html 以帮助分析包内容 vue-cli-service build --report
```
②通过可视化的UI面板直接查看报告（推荐） 在可视化的UI面板中，通过控制台和分析面板，可以方便地看到项目中所存在的问题。

## 1.4通过vue.config.js修改webpack的默认配置

- 通过vue-cli4.0工具生成的项目，默认隐藏了所有的webpack的配置项，目的是为了屏蔽项目的配置过程，让coder把工作中心放到具体功能和业务逻辑的实现上
- 如果程序员有修改 webpack 默认配置的需求，可以在项目根目录中，按需创建 vue.config.js 这个配置文件，从而对项目的打包发布过程做自定义的配置（具体配置参考 https://cli.vuejs.org/zh/config/#vue-config-js）。

## 1.5 为开发模式与发布模式指定不同的打包入口

默认情况下，Vue项目的开发模式与发布模式，共用同一个打包的入口文件（即 src/main.js）。为了将项目的开发过程与发布过程分离，我们可以为两种模式，各自指定打包的入口文件，即：

- 开发模式的入口文件为 src/main-dev.js
- 发布模式的入口文件为 src/main-prod.js

## configureWebpack 和 chainWebpack

在 vue.config.js 导出的配置对象中，新增 configureWebpack 或 chainWebpack 节点，来自定义 webpack 的打包配置。 在这里， configureWebpack 和 chainWebpack 的作用相同，唯一的区别就是它们修改 webpack 配置的方式不同：
①chainWebpack 通过链式编程的形式，来修改默认的 webpack 配置
②configureWebpack 通过操作对象的形式，来修改默认的 webpack 配置 两者具体的使用差异，可参考如下网址： https://cli.vuejs.org/zh/guide/webpack.html#webpack-%E7%9B%B8%E5%85%B3

**示例**`通过chainWebpack`自定义打包入口

```js
module.exports = { chainWebpack: config => { config.when(process.env.NODE_ENV === 'production', config => { config.entry('app').clear().add('./src/main-prod.js') }) config.when(process.env.NODE_ENV === 'development', config => { config.entry('app').clear().add('./src/main-dev.js') }) } 
}
```

## 1.6 通过 externals 加载外部 CDN 资源

1. 具体配置代码如下：（在vue.config.js中配置）
```js
config.set('externals', {
vue: 'Vue', 
'vue-router': 'VueRouter',
axios: 'axios', 
lodash: '_',
echarts: 'echarts',
nprogress: 'NProgress',
'vue-quill-editor': 'VueQuillEditor'
})
```
2. 在index.html文件的头部中，添加项目中所需要的CDN资源

3. 比如

4. ```html
   <!-- nprogress 的样式表文件 -->
   <link rel="stylesheet"href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css" /> <!-- 富文本编辑器 的样式表文件 -->
   <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.core.min.css" /> 
   <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.snow.min.css" /> 
   <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.bubble.min.css" />
   ```

5. 需要在index.html文件的头部，添加$\color{red}{js}$的CDN资源引用

6. ```
   <script src="https://cdn.staticfile.org/vue/2.5.22/vue.min.js"></script> 
   
   <script 
   src="https://cdn.staticfile.org/vue-router/3.0.1/vue-router.min.js"></script> 
   
   <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script> 
   
   <script src="https://cdn.staticfile.org/lodash.js/4.17.11/lodash.min.js"></script>
   
   <script src="https://cdn.staticfile.org/echarts/4.1.0/echarts.min.js"></script>
   
   <script src="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js"></script> 
   
   <!-- 富文本编辑器的 js 文件 --> <script src="https://cdn.staticfile.org/quill/1.3.4/quill.min.js"></script>
   
   <script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.4/dist/vue-quill-editor.js"></script>
   ```


## 1.7通过CDN优化ELementUi的打包

虽然在开发阶段，我们启用了 element-ui 组件的按需加载，尽可能的减少了打包的体积，但是那些被按需加载的组件，还是占用了较大的文件体积。此时，我们可以将 element-ui 中的组件，也通过 CDN 的形式来加载，这样能够进一步减小打包后的文件体积。

具体操作流程如下：
①在 main-prod.js 中，注释掉 element-ui 按需加载的代码
②在 index.html 的头部区域中，通过 CDN 加载 element-ui 的 js 和 css 样式

```js
<!-- element-ui 的样式表文件 --> <link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.8.2/theme-chalk/index.css" /> 

<!-- element-ui 的 js 文件 --> 
<script src="https://cdn.staticfile.org/element-ui/2.8.2/index.js"></script>
```

## 1.8首页内容自定制

不同的打包环境下，首页内容可能会有所不同。我们可以通过插件的方式进行定制，插件配置如下

```js
chainWebpack: config => { config.when(process.env.NODE_ENV === 'production', config => { config.plugin('html').tap(args => { args[0].isProd = true return args }) }) config.when(process.env.NODE_ENV === 'development', config => { config.plugin('html').tap(args => { args[0].isProd = false return args }) }) 
}
```

## 1.9路由懒加载配置

```js

const Right = () => import('components/rights/right.vue');
```

# 项目上线

1. 通过node创建web服务器

2. `创建 node 项目，并安装 express，通过 express 快速创建 web 服务器，将 vue 打包生成的 dist 文件夹，托管为静态资源即可，关键代码如下：`

3. ```js
   const express = require('express')
   // 创建 web 服务器
   const app = express()
   // 托管静态资源
   app.use(express.static('./dist'))
   // 启动 web 服务器
   app.listen(80, () => {
   console.log('web server running at http://127.0.0.1')
   })
   ```

4. 开启gzip设置

5. 使用 gzip 可以减小文件体积，使传输速度更快。

6. 可以通过服务器端使用 Express 做 gzip 压缩。其配置如下：

7. ```js
   // 安装相应包 npm install compression -S 
   // 导入包 const compression = require('compression'); 
   // 启用中间件 app.use(compression());
   ```

8. 


















