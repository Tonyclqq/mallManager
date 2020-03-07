<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="~assets/img/logo.png" alt="无法显示图片" />
        </el-col>
        <el-col :span="18" class="middle">
          <h3>后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a 
               class="loginout" 
               href="#"
               @click.prevent="handleSignout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边栏导航 -->
        <!-- 侧导航栏路由开启-->
        <el-menu
          :unique-opened="true"
          :router="true">
          <!-- 1 -->
          <el-submenu :index="''+item1.order" v-for="(item1,i) in menus" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item 
              :index="item2.path" 
              v-for="(item2,i2) in item1.children" 
              :key="i2">
              <i class="el-icon-circle-check"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {
      menus:[]
    };
  },
  //new Vue之前自动触发 
  beforeCreate(){
    //获取token
    // const token = localStorage.getItem('token')
    // if(!token) {
    //   this.$router.push({name:'login'})
    // }
  },
  created(){
    this.getMenus()
  },
  methods:{
    //获取左侧导航数据
    async getMenus(){
      const res = await this.$http.get(`menus`)
      this.menus = res.data.data
    },
    handleSignout(){
      //1.清楚token
      localStorage.clear()
      //2.提示
      this.$message.success('退出成功')
      //3.来到login组件
      this.$router.push({name:'login'})
    }
  }
};
</script>
<style  scoped>
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
/* */
.middle {
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>