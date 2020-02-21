<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //登录请求
    async handleLogin() {
      const res = await this.$http.post("login", this.formdata);
      console.log(res);
      //对象结构赋值
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        //0.保存token
        localStorage.setItem('token',data.token)
        //1.跳转到home
        this.$router.push({ name: "home" });
        //提示成功
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    }
  }
};
</script>
<style  scoped>
.login-wrap {
  height: 100%;
  background-color: #324152;
  /*弹性盒子布局 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>