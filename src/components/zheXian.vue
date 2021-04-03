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
    if (this.chartId && this.chartData) {
      this.creatChart();
    }
  },
  methods: {
    creatChart() {
      const chart = new Chart({
        container: this.chartId,
        autoFit: true,
        height: 500
      });

      chart.data(this.chartData);
      chart.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true
        }
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true
      });

      chart.axis("temperature", {
        label: {
          formatter: val => {
            return val + " °C";
          }
        }
      });

      chart
        .line()
        .position("month*temperature")
        .color("city")
        .shape("smooth");

      chart
        .point()
        .position("month*temperature")
        .color("city")
        .shape("circle");

      chart.render();
    }
  }
};
</script>
