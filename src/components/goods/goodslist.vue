<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="商品管理" level2="商品列表" />


    <!-- 2 搜索框 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          v-model="searchValue"
          clearable
          placeholder="请输入内容"
          class="search-input">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button 
          type="success" 
          @click="$router.push({name:'goodsadd'})" 
          plain
          class="add-goods-btn" >添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 3.表格 -->
    <el-table 
        height="450" 
        border
        stripe 
        :data="list" 
        style="width: 100%" >
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-edit"
            circle
            @click="showEditGoods(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            icon="el-icon-delete"
            circle
            @click="showDeleGoods(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 4.分页组件 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "goodslist",
  components: {},
  props: {},
  data() {
    return {
      searchValue:'',
      list:[],
      total: -1,
      pagenum: 1,
      pagesize: 2,
    };
  },

  created() {
    this.getGoodsList()
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    //搜索按钮
    handleSearch(){

    },
    //获取商品数据
    async getGoodsList(){
      const res = await this.$http.get(`goods`,{
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      console.log(res)
      const {
        meta:{status,msg},
        data:{goods,total}
      } = res.data;
      if(status === 200){
        this.list =  goods;
        this.total = total
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);

      }

    },
    //编辑商品数据
    showEditGoods(){

    },
    //删除商品数据
    showDeleGoods(){

    },
    //分页相关的方法
    handleSizeChange(){

    },
    //当前页改变
    handleCurrentChange(){

    }
  },

  watch: {}
};
</script>
<style  scoped>
.searchRow {
  margin-top: 20px;
}
.search-input {
  width: 300px;
}
.add-goods-btn {
  margin-left: 10px;
}
</style>