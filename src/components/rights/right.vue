<template>
  <el-card>
    <!-- 1面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 2表格 -->
    <el-table
    class="right-table" 
    height="400"
      :data="rightList" 
      border 
      style="width: 100%">
      <el-table-column 
        type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
       <el-table-column prop="level" label="层级">
         <template slot-scope="scope">
           <span v-if="scope.row.level === '0'"> 一级</span>
           <span v-if="scope.row.level === '1'"> 二级</span>
           <span v-if="scope.row.level === '2'"> 三级</span>
         </template>
       </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "right",
  components: {},
  props: {},
  data() {
    return {
      rightList: []
    };
  },

  created() {
    this.getRightList();
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async getRightList() {
      //设置请求头信息
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      
      //获取数据
      const res = await this.$http.get(`rights/list`);
      this.rightList =  res.data.data
    }
  },

  watch: {}
};
</script>
<style  scoped>
.right-table {
  margin-top: 30px;
}
</style>