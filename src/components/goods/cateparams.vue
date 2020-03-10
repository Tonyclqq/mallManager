<template>
  <el-card>
    <my-bread level1="商品管理" level2="分类参数" />
    <!-- 2. 消息提示 -->
    <el-alert class="tips" title="只允许为第三级分类设置参数" type="error"></el-alert>
    <!-- 级联选择器 -->
    <el-form class="cascading" label-position="left" label-width="80px">
      <el-form-item label="商品分类">
        <el-cascader
          :show-all-levels="false"
          clearable
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions"
          :props="defaultProp"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- tabs -->
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <!-- 按钮 -->
        <el-button type="danger">设置动态参数</el-button>
        <!-- 表格 -->
        <el-table :data="arrDyparams" style="width: 100%">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <!-- tag -->
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作" prop="name">
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
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
         <!-- 静态参数按钮 -->
        <el-button type="danger">设置静态参数</el-button>
        <!-- 静态参数表格 -->
        <el-table :data="arrStaticparams" style="width: 100%">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="属性值" prop="attr_vals"></el-table-column>
          <el-table-column label="操作" prop="name">
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
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: "cateparams",
  components: {},
  props: {},
  data() {
    return {
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      arrDyparams: [],
      active: "1",
      list: [],
      inputVisible:false,
      inputValue:'',
      arrStaticparams:[]
    };
  },

  created() {
    this.getGoodCate();
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    //el-tag的方法
    //点击x按钮
   async handleClose(scope_row,tag) {
        scope_row.attr_vals.splice(scope_row.attr_vals.indexOf(tag), 1);
        //发送请求   categories/:id/attributes/:attrId
        //put 请求体
        /**
         * 
         * attr_name
         * attr_sel
         * attr_vals
         */
        let putData = {
          attr_name:scope_row.attr_name,
          attr_sel:'many',
          attr_vals:scope_row.attr_vals.join(','),
        }
        const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${scope_row.attr_id}`,putData)
        console.log(res)
      },
    //点击newTag按钮
      showInput() {
        this.inputVisible = true;
        // eslint-disable-next-line no-unused-vars
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      //回车键or 失去焦点
     async handleInputConfirm(scope_row) {
        let inputValue = this.inputValue;
        if (inputValue) {
          scope_row.attr_vals.push(inputValue);
          //发送请求
          let putData = {
          attr_name:scope_row.attr_name,
          attr_sel:'many',
          attr_vals:scope_row.attr_vals.join(','),
        }
        const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${scope_row.attr_id}`,putData)
        console.log(res)
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    //
    showDeleUserMsgBox() {},
    showEditUserDia() {},
    //
    async handleChange() {
      if (this.selectedOptions.length === 3) {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        this.arrDyparams = res.data.data;
        this.arrDyparams.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
        });
      }
    },

    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      this.options = res.data.data;
    },
    //tab切换时
    async handleClick() {
      if(this.active === '2'){
        if(this.selectedOptions.length===3){
            //获取静态数据
        const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
        this.arrStaticparams = res.data.data
        }
      }
    }
  },

  watch: {}
};
</script>
<style  scoped>
.tips,
.cascading {
  margin-top: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>