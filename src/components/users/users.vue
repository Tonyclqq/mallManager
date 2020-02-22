<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <!-- /首页/用户管理/用户列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input 
            @clear="loadUserList"
            clearable
            placeholder="请输入内容" 
            v-model="query" 
            class="input-search">
          <el-button 
              @click="searchUser"
              slot="append" 
              icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="role_name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="创建时间">
        <!-- 如果单元格内显示的内容不是字符串(文本)，
        需要给被显示的内容外包裹一个template-->
        <!-- template内部要使用数据 设置slot-scope属性
        该属性的值是要使用数据create_time的数据源userList-->
        <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
        userlist.row ------》数组中的每个对象-->
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4963"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="">
          <el-button type="primary" size="mini" plain icon="el-icon-edit" circle></el-button>
           <el-button type="danger" size="mini" plain icon="el-icon-delete" circle></el-button>
          <el-button type="success" size="mini" plain icon="el-icon-check" circle></el-button>
          <el-button type="danger" size="mini" plain icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
     <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </el-card>
</template>

<script>
export default {
  name: "users",
  components: {},
  props: {},
  data() {
    return {
      query: "",
      //表格绑定的数据
      userList: [],
      //分页相关的数据
      total: -1,
      pagenum: 1,
      pagesize: 2
    };
  },

  created() {
    this.getUserList();
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    //清空搜索框  重新获取数据
    loadUserList(){
         this.getUserList()
    },
    //搜索用户
    searchUser(){
        this.getUserList()
    },
    //分页相关的方法
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val
       // this.pagenum = 1
        this.getUserList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum =val
        this.getUserList()
      },
    //获取用户列表的请求
    async getUserList() {
      //     参数名	参数说明	备注
      // query	查询参数	可以为空
      // pagenum	当前页码	不能为空
      // pagesize	每页显示条数	不能为空
      //需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // 第一种写法
      //const res = await this.$http.get("users", {
      //   params: {
      //     query: this.query,
      //     pagenum: this.pagenum,
      //     pagesize: this.pagesize
      //   }
      // });
      //第二种写法
      const res = await this.$http({
        methods: "get",
        url: "users",
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        //1.给表格数据赋值
        this.userList = users;
        //2.给total赋值
        this.total = total;
        //3.提示用户数据获取成功
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    }
  },

  watch: {}
};
</script>
<style  scoped>
.box-card {
  height: 100%;
}
.input-search {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
</style>