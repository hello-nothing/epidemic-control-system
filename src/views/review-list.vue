<template>
  <div class="review-container wrapper">
    <div class="page-title">用户管理</div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="uerName" label="用户昵称" width="100">
      </el-table-column>
      <el-table-column prop="telephone" label="telephone" width="180">
      </el-table-column>
      <el-table-column prop="birthday" label="出生年月" width="280">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="80"> </el-table-column>
      <el-table-column prop="type" label="角色" width="80"> </el-table-column>
      <el-table-column prop="className" label="班级名称" width="280">
      </el-table-column>
      <el-table-column prop="action" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="check(scope.row)"
            >审核</el-button
          >
          <el-button size="mini" type="danger" @click="edit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="审核用户" :visible.sync="checkVisible" width="30%">
      <el-select v-model="checkId" placeholder="请选择" class="select-style">
        <el-option
          v-for="item in checkList"
          :key="item.status"
          :label="item.name"
          :value="item.status"
        >
        </el-option>
      </el-select>
      <el-button @click="confirmCheck" type="primary">确定</el-button>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="editVisible">
      <div class="list-box">
        <div class="list-title">姓名：</div>
        <el-input
          class="select-style"
          v-model="editInfo.uerName"
          placeholder="请输入您的姓名"
        ></el-input>
      </div>

      <div class="list-box">
        <div class="list-title">手机号：</div>
        <el-input
          class="select-style"
          v-model="editInfo.telephone"
          placeholder="请输入您的手机号"
        ></el-input>
      </div>
      <div class="list-box">
        <div class="list-title">出生年月日：</div>
        <el-date-picker
          v-model="editInfo.birthday"
          type="date"
          class="select-style"
          placeholder="请选择你的出生年月日"
        >
        </el-date-picker>
      </div>
      <div class="list-box">
        <div class="list-title">姓别：</div>
        <el-select
          v-model="editInfo.gender"
          placeholder="请选择性别"
          class="select-style"
        >
          <el-option
            v-for="item in sexList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="list-box">
        <div class="list-title">角色：</div>
        <el-select
          v-model="editInfo.type"
          placeholder="请选择角色"
          class="select-style"
        >
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="list-box">
        <div class="list-title">班级名称：</div>
        <el-input
          class="select-style"
          v-model="editInfo.className"
          placeholder="请输入您的班级名称"
        ></el-input>
      </div>
      <el-button @click="confirmCheck" type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "reviewList",
  data() {
    return {
      tableData: [
        {
          uerName: "葳蕤",
          telephone: "1503274979",
          birthday: "2020-10-10 02:23:23",
          gender: "男",
          type: "学生",
          className: "计算机"
        }
      ],
      checkVisible: false,
      checkList: [
        {
          status: 1,
          name: "审核不通过"
        },
        {
          status: 2,
          name: "审核通过"
        }
      ],
      checkId: 2,
      userInfo: {},
      sexList: [
        {
          name: "男",
          id: 1
        },
        {
          name: "女",
          id: 2
        }
      ],
      typeList: [
        {
          name: "学生",
          id: 1
        },
        {
          name: "教师",
          id: 2
        },
        {
          name: "管理员",
          id: 3
        }
      ],
      editInfo: {
        uerName: "",
        telephone: "",
        birthday: "",
        gender: "",
        type: "",
        className: ""
      },
      editVisible: false
    };
  },
  mounted() {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    console.log(info);
    if (info.userName) {
      this.userInfo = info;
    }
  },
  methods: {
    // 审核
    check() {
      this.checkVisible = true;
    },
    // 确认审核结果
    confirmCheck() {
      const param = {
        userId: this.userInfo.userId,
        status: this.checkId
      };
    },
    // 编辑
    edit(item) {
      console.log(item);
      this.editInfo = item;
      this.editVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.list-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .list-title {
    width: 100px;
    margin-right: 20px;
    text-align: right;
  }
  .select-style {
    flex: 1;
  }
}
</style>
