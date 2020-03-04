<template>
  <el-card>
    <!-- 1面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 2表格 -->
  </el-card>
</template>

<script>
export default {
  name: "right",
  components: {},
  props: {},
  data() {
    return {
      rightList:[]
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
      //获取数据
      const res = await this.$http.get(`rights/list`);
       this.rightList =  res.data.data
    }
  },

  watch: {}
};
</script>
<style  scoped>
</style>