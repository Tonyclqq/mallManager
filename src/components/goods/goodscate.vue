<template>
  <el-card>
    <!-- 1. 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 2. 搜索框 -->
    <el-row>
      <el-col :span="24" class="searchArea">
        <el-button type="success" @click="addGoodsCate">添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 3. 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 级联选择器(表单元素) -->
        <el-form-item label="分类" label-width="120px">
          {{selectedOptions}}
          <el-cascader
            expand-trigger="hover"
            change-on-select
            clearable
            :options="caslist"
            v-model="selectedOptions"
            :props="defaultProp"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
        <el-button type="primary" @click="addCate">确定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table height="450" :data="list" style="width:100%">
      <!-- treekey:nodekey：结点唯一标识
               parentKey:父节点的id
               levelkey：当前节点的级别
               childkey：字节点
      -->
      <el-tree-grid
        prop="cat_name"
        lavel="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
      ></el-tree-grid>
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted === false">有效</span>
          <span v-else-if="scope.row.cat_deleted === true">无效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="showEditdia(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="showDelefirm(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange()"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5,10,15,20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import ElTreeGrid from "element-tree-grid";
export default {
  name: "goodscate",
  components: {
    //组件名<el-tree-grid>
    ElTreeGrid
  },
  props: {},
  data() {
    return {
      list: [],
      pagenum: 1,
      pagesize: 50,
      total: 1,
      dialogFormVisibleAdd: false,
      form: {
        cat_pid: -1,
        cat_name: "",
        cat_level: -1
      },
      formLabelWidth: "140px",
      //级联选择器要用的数据
      caslist: [],
      //级联选择器选中的数据
      selectedOptions: [],
      defaultProp: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      }
    };
  },

  created() {
    this.getGoodsCate();
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    //添加分类 -发送请求
    async addCate() {
      /*
                cat_pid	分类父 ID	不能为空
                cat_name	分类名称	不能为空
                cat_level	分类层级	不能为空
                //三种情况  1.一级分类  selectionOptions.length==0  cat_pid=0 cat_level=0
                            2.二级分类  selectionOptions.length==1  cat_pid=selectionOptions[0]  cat_level=1
                            3.三级分类  selectionOptions.length==2  cat_pid=selectionOptions[1]  cat_level=2
             */
      if (this.selectedOptions.length === 0) {
        this.form.cat_pid = 0;
        this.form.cat_level = 0;
      } else if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0];
        this.form.cat_level = 1;
      } else if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1];
        this.form.cat_level = 2;
      }
      const res = await this.$http.post(`categories`,this.form)
      console.log(res)
      //更新视图
      this.getGoodsCate()
      //关闭对话框
      this.dialogFormVisibleAdd =false ;
      this.form ={}
    },
    //添加分类  显示对话框 row8
    async addGoodsCate() {
      this.dialogFormVisibleAdd = true;
      //获取二级分类的数据
      const res = await this.$http.get(`categories?type=2`);
      this.caslist = res.data.data;
    },
    //获取所有分类
    async getGoodsCate() {
      const res = await this.$http.get(
        `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      this.list = res.data.data.result;
      console.log(this.list);
      this.total = res.data.data.total;
    },
    //按钮的操作方法
    showEditdia(scope_row) {
      scope_row;
    },
    showDelefirm(scope_row) {
      scope_row;
    },
    //分页相关的方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getGoodsCate();
    },
    handleCurrentChange() {}
  },

  watch: {}
};
</script>
<style  scoped>
.searchArea {
  margin-top: 20px;
}
</style>