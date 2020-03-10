<template>
  <el-card>
    <!-- 1. 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表" />
    <!-- 2. 消息提示 -->
    <el-alert class="tips" title="添加商品信息" type="success" center show-icon></el-alert>
    <!-- 3. 步骤条-->
    <el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="商品参数" icon="el-icon-upload"></el-step>
      <el-step title="商品属性" icon="el-icon-picture"></el-step>
      <el-step title="商品图片" icon="el-icon-picture"></el-step>
      <el-step title="商品内容" icon="el-icon-picture"></el-step>
    </el-steps>
    <!-- 4. 标签页 -->
    <!-- 最外层是el-form -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:400px; overflow:auto"
    >
      <el-tabs @tab-click="tabChange" v-model="active" tab-position="left">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联选择器 -->
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              :props="defaultProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <!-- 显示的是该三级分类的商品参数 -->
          <el-form-item :label="item1.attr_name" v-for="(item1 ,i ) in arrDyparams" :key="i">
            <!-- 复选框组 -->
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border v-for="(item2,i) in item1.attr_vals" :key="i" :label="item2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <!-- 静态参数的数据 -->
          <el-form-item :label="item.attr_name" v-for="(item , i) in arrStaticparams" :key="i">
            <el-input v-model="item.attr_vals" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload
              action="http://localhost:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <!-- 表单元素 -->
            <el-button type="primary" @click="addGoods">点我添加商品</el-button>
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css' 
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: "goodsadd",
  components: {
    quillEditor
  },
  props: {},
  data() {
    return {
      active: "1",
      //添加商品的表单数据
      /**goods_name	商品名称	不能为空
         goods_cat	以为','分割的分类列表	不能为空   ---》级联选择器绑定的数据
         goods_price	价格	不能为空
         goods_number	数量	不能为空
         goods_weight	重量	不能为空
         goods_introduce	介绍	可以为空
         pics	上传的图片临时路径（对象）	可以为空
         attrs	商品的参数（数组） */
      form: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        goods_cat: "",
        pics: [],
        attrs: []
      },
      //级联选择器要用的数据
      options: [],
      selectedOptions: [1, 3, 6],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      //动态参数的数据数组
      arrDyparams: [],
      //静态参数的数据数组
      arrStaticparams: [],
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },

  created() {
    this.getGoodCate();
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    //添加商品
    async addGoods(){
      //goods_cat --->分类
      this.form.goods_cat = this.selectedOptions.join(',') 
      //pics     在上传和移除图片上，进行赋值和删除[].findIndex()

      //attrs[{attr_id:?,attr_value:?}]
      //动态参数数组
      //遍历+取值+放在一个新数组中
      let arr1 =  this.arrDyparams.map((item)=>{
        return {attr_id:item.attr_id,attr_value:item.attr_vals}
      })
      //静态参数数组
      let arr2 =  this.arrStaticparams.map((item)=>{
        return {attr_id:item.attr_id,attr_value:item.attr_vals}
      })
      this.form.attrs = [...arr1,...arr2]
       //在发请求之前处理this.form中的未处理数据
      const res = await this.$http.post(`goods`,this.form)
      //返回商品列表
      this.$router.push({name:'goods'})
      console.log(res)
    },
    //上传图片触发的方法
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file) {
      //file.response.data.tmp_path
      console.log(file);
      //this.form.pics移除当前x掉的图片
      //先获取该图片的索引
      //[{pic:图片路径},]
      let index = this.form.pics.findIndex(item => {
       return item.pic === file.response.data.tmp_path
      })
      this.form.pics.splice(index,1)
    },
    handleSuccess(file) {
      //tmp_path: "tmp_uploads\cb16fd357dc1db154650c18cd8f30fcb.png"
      console.log(file);
      this.form.pics.push({
        pic:file.data.tmp_path
      })
    },
    //点击不同的tab时
    async tabChange() {
      //如果点击的是第二个tab 同时  三级分类要有值
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        //获取分类数据  id --.>分类id
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );

        //attr_name  和attr_vals
        this.arrDyparams = res.data.data;
        //this.arrDyparams 每个对象.attr_vals字符串-》数组-》v-for
        this.arrDyparams.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
        });
      } else if (this.active === "3") {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        //获取静态参数的数据
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        console.log(res);
        this.arrStaticparams = res.data.data;
      }
    },
    // 级联选择器 @change触发的方法
    handleChange() {},
    //获取三级分类的信息
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      this.options = res.data.data;
    }
  },

  watch: {}
};
</script>
<style  scoped>
.tips {
  margin-top: 20px;
}
.ql-editor{
  min-height: 300px !important ;
}
.ql-blank{
  min-height: 300px !important ;
}
</style>