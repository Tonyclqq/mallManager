<template>
  <el-card>
    <!-- 1面包屑 -->
    <my-bread level1="权限管理" level2="角色列表" />
    <!-- 2按钮 -->
    <el-row class="add-rol-btn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand" width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <!-- 一级权限 -->
            <el-col :span="4">
              <el-tag closable @close="deleRight(scope.row,item1.id)">{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <!-- 二级权限 -->
                <el-col :span="4">
                  <el-tag
                    closable
                    type="success"
                    @close="deleRight(scope.row,item2.id)"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="warning"
                    v-for="(item3,i) in item2.children"
                    :key="i"
                    @close="deleRight(scope.row,item3.id)"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="150"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>

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
            @click="showSetRightDia(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!-- 树形结构
        data-- 数据源[]
        show-checkbox 选择框
        node-key 每个节点的唯一标识 通常是data数据源中key名id
        default-expanded-keys 默认展开[要展开的节点的id]
        default-checked-keys  要选择的节点的id
        props 配置项{label,children}   label：节点的文字标题,children：节点的子节点
        值都来源于data绑定的数据源中的该数据的可以名
        
        :default-expanded-keys="[2,3]"
        :default-checked-keys="[5]"
      -->
      <el-tree
        ref="tree"
        :data="treeList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrCheck"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "role",
  components: {},
  props: {},
  data() {
    return {
      roleList: [],
      dialogFormVisibleRight: false,
      //树形结构的数据
      treeList: [],
      defaultProps: {
        label: "authName",
        children: "children"
      },
      arrexpand: [],
      arrCheck: [],
      currRoleOd:-1
    };
  },

  created() {
    this.getRoleList();
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async getRoleList() {
      const res = await this.$http.get(`roles`);
      this.roleList = res.data.data;
    },
    //取消权限
    async deleRight(role, rightId) {
      //roles/:roleId/rights/:rightId
      //roleId:当前角色ID，rightID 要删除的权限id
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      //删除成功  返回了200和该角色的剩余权限
      role.children = res.data.data;
      this.$message({
        type: "success",
        message: res.data.meta.msg
      });
    },
    //修改分配权限   打开对话框
    async showSetRightDia(role) {
      //console.log(role);
      //给currRoleId赋值
      this.currRoleOd = role.id
      this.dialogFormVisibleRight = true;
      //获取树形结构的权限数据
      const res = await this.$http.get(`rights/tree `);
      this.treeList = res.data.data;
      //
      // var arrtemp1 = [];
      // this.treeList.forEach(item1 => {
      //   arrtemp1.push(item1.id);
      //   item1.children.forEach(item2 => {
      //     arrtemp1.push(item2.id);
      //     item2.children.forEach(item3 => {
      //       arrtemp1.push(item3.id);
      //     });
      //   });
      // });
      // this.arrexpand = arrtemp1
      //获取当前角色role的权限id
      let arrtemp2 = [];
      role.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id);
          });
        });
      });
      this.arrCheck = arrtemp2
    },
    //修改权限 --发送请求
    async setRoleRight(){
      //请求路径：roles/:roleId/rights
      //roleId  当前要修改权限的角色id
      //当前树形节点中 所有全选和半选的label的id

      //rids 属性节点中 所有全选和半选的label的id []
      //获取全选的id的数组arr1 getCheckedKeys()
      //1.在vue中，用$refs调用DOM元素
       let arr1 =  this.$refs.tree.getCheckedKeys()
      //获取半选的id的数据arr2 getHalfCheckedKeys()
      let  arr2 = this.$refs.tree.getHalfCheckedKeys()
      //arr = arr1+arr2
      //ES6 展开运算符 ...数组或者对象
      let arr = [...arr1,...arr2]
       await this.$http.post(`roles/${this.currRoleOd}/rights`,{rids:arr.join(',')})
      //关闭对话框
      this.dialogFormVisibleRight = false
      //更新视图
      this.getRoleList()
    }
  },

  watch: {}
};
</script>
<style  scoped>
.add-rol-btn {
  margin-top: 20px;
}
</style>
