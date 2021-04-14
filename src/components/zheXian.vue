<template>
  <div :id="chartId"></div>
</template>
<script>
import G2 from "@antv/g2";
import { Chart } from "@antv/g2";
export default {
  name: "zheXian",
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
      this.creatChart();
    }
  },
  watch: {
    chartData: function(newVal) {
      this.chartData = newVal;
      if (newVal) {
        this.creatChart();
      }
    }
  },
  methods: {
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
      this.chart.scale("temperature", {
        min: 0
      });
      this.chart.scale("createTime", {
        range: [0, 1]
      });
      this.chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      this.chart.line().position("createTime*temperature");
      this.chart
        .point()
        .position("createTime*temperature")
        .size(4)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      this.chart.render();
    }
  }
};
</script>
