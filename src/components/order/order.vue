<template>
  <el-card>
    <!-- 1. 面包屑 -->
    <my-bread level1="订单管理" level2="订单分类"></my-bread>
    <!-- 表格 -->
    <el-table height="450" :data="list" style="width:100%">
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="80"  style="text-align: center;"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay==='0'">已付款</el-tag>
          <el-tag type="danger" v-if="scope.row.order_pay==='1'">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="100"></el-table-column>
      <el-table-column  label="下单时间" width="90">
          <template slot-scope="scope">{{scope.row.create_time|fmtdate}}</template>
      </el-table-column>
      <el-table-column  label="操作" width="180">
          <template slot-scope="scope">
              <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              plain
              @click="showEditdia(scope.row)"></el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">  
            <el-form-item label="省市区" label-width="120">
                <el-cascader
                expand-trigger="hover"
                clearable
                :options="catlist"
                v-model="selectedOptions"
                ></el-cascader>
            </el-form-item>
            <el-form-item label-width="120" label="详细地址">
                <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false"></el-button>
            <el-button type="primary" @click="dialogFormVisible = false"></el-button>
        </div>
    </el-dialog>
  </el-card>
</template>

<script>
import citydata from './citydata'
//.vue引入.js库(swiper.js/zepto.js/iscroll.js/wow.js(整屏滚动的动画))
export default {
  name: "order",
  components: {},
  props: {},
  data() {
    return {
        list:[],
        dialogFormVisible:false,
        form:{
            address:""
        },
        //级联选择器要绑定的数据
        catlist:[],
        selectedOptions:[]
    };
  },

  created() {
      this.getData()
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
      async getData(){
          const res = await this.$http.get(`orders?pagenum=1&pagesize=10`)
          this.list = res.data.data.goods
          console.log(this.list)
      },
      showEditdia(){
          this.catlist = citydata;
          this.dialogFormVisible =true;
      }
  },

  watch: {}
};
</script>
<style  scoped>
 
</style>