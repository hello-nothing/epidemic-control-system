<template>
  <div :id="chartId"></div>
</template>
<script>
import G2 from "@antv/g2";
import { Chart } from "@antv/g2";
export default {
  name: "zhuZhuang",
  data() {
    return {
      chart: ""
    };
  },
  props: {
    chartId: String,
    chartData: Array
  },
  mounted() {
    if (this.chartData.length) {
      this.getData();
    }
  },
  watch: {
    chartData: function(newVal) {
      this.chartData = newVal;
      if (newVal) {
        this.getData();
      }
    }
  },
  methods: {
    getData() {
      if (this.chartId && this.chartData) {
        this.creatChart();
      }
    },
    creatChart() {
      if (this.chart) {
        // 如果存在的话就删除图表再重新生成
        this.chart.destroy();
      }
      this.chart = new Chart({
        container: this.chartId,
        autoFit: true,
        height: 300
      });

      this.chart.data(this.chartData);
      this.chart.scale("total", {
        nice: true
      });

      this.chart.tooltip({
        showMarkers: false
      });
      this.chart.interaction("active-region");

      this.chart.interval().position("regionName*total");

      this.chart.render();
    }
  }
};
</script>
