<template>
  <div class="index-container wrapper">
    <el-date-picker
      v-model="dateValue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="dateChange"
      class="chart-box"
    >
    </el-date-picker>
    <div class="chart-box">
      <div class="chart-title">确诊人数：</div>
      <zhu-zhuang
        class="chart-list"
        chartId="glass-container"
        :chartData="chartData"
      ></zhu-zhuang>
    </div>
    <div class="chart-box">
      <div class="chart-title">死亡人数：</div>
      <zhu-zhuang
        class="chart-list"
        chartId="siwang-container"
        :chartData="siwangChartData"
      ></zhu-zhuang>
    </div>
    <div class="chart-box">
      <div class="chart-title">治愈人数：</div>
      <zhu-zhuang
        class="chart-list"
        chartId="zhiyu-container"
        :chartData="zhiyuChartData"
      ></zhu-zhuang>
    </div>
  </div>
</template>
<script>
import api from "../api/api";
import zhuZhuang from "@/components/zhuZhuang";
export default {
  components: {
    zhuZhuang
  },
  data() {
    return {
      dateValue: "",
      chartData: [],
      siwangChartData: [],
      zhiyuChartData: [],
    };
  },

  mounted() {
    const date = new Date();
    this.getNowTime(date);
    this.getQueZhenData(this.getNowTime(date), this.getNowTime(date));
    this.getSiwangData(this.getNowTime(date), this.getNowTime(date));
    this.getZhiyuData(this.getNowTime(date), this.getNowTime(date));
  },
  methods: {
    // 时间改变
    dateChange(date) {
      const start = this.getNowTime(date[0]);
      const end = this.getNowTime(date[1]);
      this.getQueZhenData(start, end);
      this.getSiwangData(start, end);
      this.getZhiyuData(start, end);
    },
    // 获取确诊人数
    getQueZhenData(start, end) {
      const params = {
        type: 2,
        beginTime: start,
        endTime: end
      };
      api.getEpidemicData(params).then(res => {
        const result = res.data;
        if (result.status === 200) {
          if (result.data.list.length == 0) {
            this.$message.info("暂无数据，请重新选择时间段！");
          } else {
            this.chartData = result.data.list;
          }
        } else {
          this.$message.warning("获取数据失败");
        }
      });
    },
    // 获取死亡人数
    getSiwangData(start, end) {
      const params = {
        type: 3,
        beginTime: start,
        endTime: end
      };
      api.getEpidemicData(params).then(res => {
        const result = res.data;
        if (result.status === 200) {
          if (result.data.list.length == 0) {
            this.$message.info("暂无数据，请重新选择时间段！");
          } else {
            this.siwangChartData = result.data.list;
          }
        } else {
          this.$message.warning("获取数据失败");
        }
      });
    },
    // 获取治愈人数
    getZhiyuData(start, end) {
      const params = {
        type: 3,
        beginTime: start,
        endTime: end
      };
      api.getEpidemicData(params).then(res => {
        const result = res.data;
        if (result.status === 200) {
          if (result.data.list.length == 0) {
            this.$message.info("暂无数据，请重新选择时间段！");
          } else {
            this.zhiyuChartData = result.data.list;
          }
        } else {
          this.$message.warning("获取数据失败");
        }
      });
    },
    //处理默认选中当前日期
    getNowTime(value) {
      const now = value;
      const year = now.getFullYear(); //得到年份
      let month = now.getMonth(); //得到月份
      let date = now.getDate(); //得到日期
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      const defaultDate = `${year}-${month}-${date}`;
      return defaultDate;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index-container {
  width: 100%;
  .chart-box {
    margin-bottom: 40px;
  }
  .chart-title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .chart-list {
    // width: 80%;
  }
}
</style>
