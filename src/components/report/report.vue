<template>
  <el-card>
    <my-bread level1="数据统计" level2="数据报表"></my-bread>
    <div id="main" style="width:600px; height:400px"></div>
  </el-card>
</template>

<script>
var echarts = require("echarts");
export default {
  name: "report",
  components: {},
  props: {},
  data() {
    return {};
  },
  beforeMount() {},
  mounted() {
    this.useEchart();
  },

  methods: {
    async useEchart() {
      var myChart = echarts.init(document.getElementById("main"));
      const res = await this.$http.get(`reports/type/1`);
      let option1 = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
      let option2 = res.data.data;
      let option = { ...option1, ...option2 };
      myChart.setOption(option);
    }
  },

  watch: {}
};
</script>
<style  scoped>
#main {
    margin-top: 20px;
}
</style>