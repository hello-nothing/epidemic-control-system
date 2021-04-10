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
    <!-- <zhe-xian
      chartId="warn-container"
      :chartData="studentsWaringList"
    ></zhe-xian> -->
  </div>
</template>
<script>
import api from "../api/api";
import zhuZhuang from "@/components/zhuZhuang";
import zheXian from "@/components/zheXian";
export default {
  components: {
    zheXian,
    zhuZhuang
  },
  data() {
    return {
      dateValue: "",
      chartData: [],
      siwangChartData: [],
      zhiyuChartData: [],
      studentsWaringList: [
        { month: "Jan", city: "Tokyo", temperature: 7 },
        { month: "Jan", city: "London", temperature: 3.9 },
        { month: "Feb", city: "Tokyo", temperature: 6.9 },
        { month: "Feb", city: "London", temperature: 4.2 },
        { month: "Mar", city: "Tokyo", temperature: 9.5 },
        { month: "Mar", city: "London", temperature: 5.7 },
        { month: "Apr", city: "Tokyo", temperature: 14.5 },
        { month: "Apr", city: "London", temperature: 8.5 },
        { month: "May", city: "Tokyo", temperature: 18.4 },
        { month: "May", city: "London", temperature: 11.9 },
        { month: "Jun", city: "Tokyo", temperature: 21.5 },
        { month: "Jun", city: "London", temperature: 15.2 },
        { month: "Jul", city: "Tokyo", temperature: 25.2 },
        { month: "Jul", city: "London", temperature: 17 },
        { month: "Aug", city: "Tokyo", temperature: 26.5 },
        { month: "Aug", city: "London", temperature: 16.6 },
        { month: "Sep", city: "Tokyo", temperature: 23.3 },
        { month: "Sep", city: "London", temperature: 14.2 },
        { month: "Oct", city: "Tokyo", temperature: 18.3 },
        { month: "Oct", city: "London", temperature: 10.3 },
        { month: "Nov", city: "Tokyo", temperature: 13.9 },
        { month: "Nov", city: "London", temperature: 6.6 },
        { month: "Dec", city: "Tokyo", temperature: 9.6 },
        { month: "Dec", city: "London", temperature: 4.8 }
      ]
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
