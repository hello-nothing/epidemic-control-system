<template>
  <div :id="chartId"></div>
</template>
<script>
import G2 from "@antv/g2";
import { Chart } from "@antv/g2";
export default {
  name: "zhuZhuang",
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
      chart.scale("sales", {
        nice: true
      });

      chart.tooltip({
        showMarkers: false
      });
      chart.interaction("active-region");

      chart.interval().position("year*sales");

      chart.render();
    }
  }
};
</script>
