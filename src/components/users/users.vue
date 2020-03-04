/* eslint-disable no-unused-vars */
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
          class="input-search"
        >
          <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
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
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4963"
            @change="changeMgState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-edit"
            circle
            @click="showEditUserDia(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            icon="el-icon-delete"
            circle
            @click="showDeleUserMsgBox(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            plain
            icon="el-icon-check"
            circle
            @click="showSetUserRoleDia(scope.row)"
          ></el-button>
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
        :total="total"
      ></el-pagination>
      <!-- 5.对话框 -->
      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px">
            <el-input v-model="form.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑用户的对话框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <el-input v-model="form.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确定</el-button>
        </div>
      </el-dialog>

      <!-- 分配角色的对话框 -->
      <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
           {{currUserName}}
          </el-form-item>
          <el-form-item label="角色" label-width="100px">
              <!-- 如果select的绑定的数据的值 和 option的value一样，就会显示该option的label值 -->
            <el-select v-model="currRoleId" >
              <el-option label="请选择" :value="-1" ></el-option>
              <el-option 
              :label="item.roleName" 
              :value="item.id" 
              v-for="(item,i) in roles"
              :key="i"
              ></el-option> 
            </el-select>


          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
          <el-button type="primary" @click="setRol">确 定</el-button>
        </div>
      </el-dialog>
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
      pagesize: 2,
      //添加
      dialogFormVisibleAdd: false,
      //编辑
      dialogFormVisibleEdit: false,
      //分配角色
      dialogFormVisibleRol:false,
      //添加用户的表单数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //分配角色
      currRoleId:-1,
      curruserId:-1,
      currUserName:'',
      //保存所有的角色数据
      roles:[]
    };
  },

  created() {
    this.getUserList();
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    //分配角色-发送请求
    async setRol(){
      // eslint-disable-next-line no-unused-vars
      const res = await this.$http.put(`users/${this.curruserId}/role`,{
        rid:this.currRoleId
      })
      //关闭对话框
      this.dialogFormVisibleRol = false
      
    },
    //分配角色
    async showSetUserRoleDia(user) {
      this.currUserName = user.username
      //给currUserId赋值
      this.curruserId = user.id
      //获取所有的角色
      const res1 = await this.$http.get(`roles`)
      
      this.roles = res1.data.data
      //获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`)
      //接口文档的key名 是role_id 其实是rid
      this.currRoleId = res.data.data.rid
      //显示对话框
      this.dialogFormVisibleRol = true;
    },
    //发送修改用户状态
    async changeMgState(user) {
      // eslint-disable-next-line no-unused-vars
      const res = await this.$http.put(
        `users/${user.id}/state/:${user.mg_state}`
      );
      //console.log(res);
    },
    //编辑用户--发送请求
    async editUser() {
      //user/:id
      await this.$http.put(`users/${this.form.id}`, this.form);

      //关闭对话框
      this.dialogFormVisibleEdit = false;
      //2.更新视图
      this.getUserList();
    },
    //编辑用户-显示对话框
    showEditUserDia(user) {
      this.dialogFormVisibleEdit = true;
      this.form = user;
    },
    //删除用户-打开消息盒子
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
          //console.log(res);
          if (res.data.meta.status === 200) {
            this.pagenum = 1;
            //更新视图
            this.getUserList();
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
    //添加用户-发送请求
    async addUser() {
      const res = await this.$http.post("users", this.form);
      //console.log(res);
      const {
        meta: { status, msg }
      } = res.data;

      //2.关闭对话框
      this.dialogFormVisibleAdd = false;
      if (status === 201) {
        //1.提示成功
        this.$message.success(msg);
        //3.更新视图
        this.getUserList();
        //4.清空文本框
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },
    //添加用户---显示对话框
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框  重新获取数据
    loadUserList() {
      this.getUserList();
    },
    //搜索用户
    searchUser() {
      this.getUserList();
    },
    //分页相关的方法
    handleSizeChange(val) {
     // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      // this.pagenum = 1
      this.getUserList();
    },
    handleCurrentChange(val) {
     // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    //获取用户列表的请求
    async getUserList() {
      //     参数名	参数说明	备注
      // query	查询参数	可以为空
      // pagenum	当前页码	不能为空
      // pagesize	每页显示条数	不能为空
      //需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      //已经在plugins/http.js中设置过
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // // 第一种写法
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