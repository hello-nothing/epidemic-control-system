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
    if (this.chartData) {
      this.getData();
    }
  },
  watch: {
    chartData: function(newVal) {
      this.getData(newVal);
    }
  },
  methods: {
    getData() {
      if (this.chartId && this.chartData) {
        this.creatChart();
      }
    },
    creatChart() {
      const chart = new Chart({
        container: this.chartId,
        autoFit: true,
        height: 300
      });

      chart.data(this.chartData);
      chart.scale("total", {
        nice: true
      });

      chart.tooltip({
        showMarkers: false
      });
      chart.interaction("active-region");

      chart.interval().position("regionName*total");

      chart.render();
    }
  }
};
</script>
