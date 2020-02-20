# mallmanager53

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


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

## 接口文档：dosc/index.html



## 项目-准备-批处理

1. 来到要执行执行指令的路径 api-server
2. 新建start.txt
3. start.txt写入要执行的指令node app.js 保存
4. 修改start.txt  -——》start.bat
5. 双击start.bat文件

## 项目准备-vue-cli脚手架创建项目
 > 我用的vue-cli4.x版本

