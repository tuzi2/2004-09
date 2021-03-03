<template>
  <div>
    <div class="right-a">
      <div class="right-ta">
        <span>考勤管理</span>
      </div>
      <div class="right-ta2">
        <img src="@/assets/003.png" />
        <!-- <span @click="">开始时间</span><span>~</span><span>结束时间</span> -->
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
        >
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime,
          }"
        >
        </el-time-select>
      </div>
      <div class="search">
        <input
          type="search"
          name=""
          class="search-a"
          placeholder="             搜索学员快速签到"
        />
      </div>
    </div>
    <div class="right-ba">
      <span>今日课表</span>
    </div>
    <div class="right-ya">
      <table>
        <tr>
          <td>
            <div class="tab2">
              架子鼓基础班2021 <span class="asd">班级</span>
            </div>
          </td>
          <td>
            <div class="tab3">
              <p class="el-icon-reading"></p>
              架子鼓课
            </div>
          </td>
          <td>
            <div class="tab3">
              <p class="el-icon-pie-chart"></p>
              13:00~14:00
            </div>
          </td>
          <td>
            <div class="tab3">
              <p class="el-icon-s-custom"></p>
              明明
            </div>
          </td>
          <td>
            <div class="tab4">
              <p class="el-icon-date"></p>
              已到达
            </div>
          </td>
          <td>
            <div class="tab5">
              <p class="el-icon-edit-outline"></p>
              <el-button type="text" @click="dialogTableVisible = true"
                >签到</el-button
              >
            </div>
          </td>
        </tr>
        <el-dialog title="签到" :visible.sync="dialogTableVisible">
          <el-radio-group v-model="form.resource">
            <el-radio label="出勤"></el-radio>
            <el-radio label="迟到"></el-radio>
            <el-radio label="请假"></el-radio>
            <el-radio label="旷课"></el-radio>
          </el-radio-group> 
           <el-input type="textarea" v-model="form.desc" placeholder="内容"></el-input>
          <br>
          <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button
          >
        </el-dialog>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    // open() {
    //   this.$alert("签到", {
    //     confirmButtonText: "确定",
    //     callback: (action) => {
    //       this.$message({
    //         type: "info",
    //         message: `action: ${action}`,
    //       });
    //     },
    //   });
    // },
  },
};
</script>

<style>
.right-ta {
  text-align: center;
  float: left;
  font-size: 19px;
  padding: 26px 26px 26px 26px;
  background-color: #dfe3ec;
  cursor: pointer;
}

.right-ta2 {
  float: left;
  padding: 20px 20px 20px 20px;
  border: #dfe3ec 1px solid;
  margin-left: 50px;
}
.right-ta2 img {
  padding-right: 27px;
  padding-top: 5px;
}
.right-ba {
  padding: 26px 26px 26px 26px;
  font-size: 20px;
}
/* .search input{
    /* background-image: url("../assets/008.png"); */
/* }  */
.right-ya {
  height: 76px;
  border: 1px #c5c5c5 solid;
  border-radius: 5px 2px 2px 5px;
  border-left: #1890ff 7px solid;
  /* border-top-left-radius: 3px; */
}

.right-ya table {
  font-size: 20px;
  line-height: 75px;
  float: left;
  margin-left: 50px;
}
.right-ya table tr td .asd {
  font-size: 10px;
  color: #2ecd73;
  background-color: #c7ebdf;
  margin-right: 220px;
}
.tab3 {
  color: #c5c5c5;
  font-size: 17px;
  margin-left: 40px;
}
.tab4,
.tab5 {
  font-size: 17px;
}
.tab4 {
  margin-left: 422px;
  margin-right: 60px;
  color: #c5c5c5;
}
.tab5 el-button {
  color: #6c80f9;
}
</style>