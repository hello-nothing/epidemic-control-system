<template>
  <div :id="chartId"></div>
</template>
<script>
import G2 from "@antv/g2";
import { Chart } from "@antv/g2";
export default {
  name: "zheXian",
  data() {
    return {};
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
      const chart = new Chart({
        container: this.chartId,
        autoFit: true,
        height: 300
      });

      chart.source(this.chartData);
      chart.scale("temperature", {
        min: 0
      });
      chart.scale("createTime", {
        range: [0, 1]
      });
      chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      chart.line().position("createTime*temperature");
      chart
        .point()
        .position("createTime*temperature")
        .size(4)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      chart.render();
    }
  }
};
</script>
