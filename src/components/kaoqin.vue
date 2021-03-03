<template>
  <div>
    <div class="right-a">
      <div class="right-ta">
        <p class="kes">考勤管理</p>
        <div id="triangle-right"></div>
      </div>
        <div class="block">
          <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
          
        <div style="" class="el-inputs">
          <el-input placeholder="搜索学员快速签到" v-model="input3" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="课程">
              <el-option label="架子鼓" value="1"></el-option>
              <el-option label="钢琴" value="2"></el-option>
              <el-option label="基础班" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
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
          <div  class="groups">
            <el-radio label="1" v-model="radio">出勤</el-radio>
            <el-radio label="2" v-model="radio">迟到</el-radio>
            <el-radio label="3" v-model="radio">请假</el-radio>
            <el-radio label="4" v-model="radio">旷课</el-radio>
          <br>
          <el-input type="textarea" v-model="form.desc" placeholder="备注" class="inputs-aa"></el-input>
          </div>
          <br />
          <el-button type="primary" @click="dialogFormVisible = false" class="buttons">保 存</el-button>
        </el-dialog>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio:'1',
      input3: '',
      select: '',
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
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
    };
  },
};
</script>

<style>
.buttons{
  margin-left: 700px;
  width: 150px;
}
.inputs-aa{
  width: 350px;
}
.groups{
  text-align: center;
}
.input-with-select{
  width: 450px;
}
.el-select{
    width: 80px;
  }
.right-a {
    height: 62px;
    background-color: #f5f6fa;
    border: 1px solid #dee3e9;
    margin-bottom: 20px;
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
  margin-left: 20px;
  font-size: 20px;
}
.right-ya {
  height: 76px;
  border: 1px #c5c5c5 solid;
  border-radius: 5px 2px 2px 5px;
  border-left: #1890ff 7px solid;
  width: 98%;
  margin: 20px;
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

.kes {
    float: left;
    font-size: 24px;
    line-height: 60px;
    text-align: center;
    color: #333335;
    background-color: #dfe3ec;
    padding-left: 20px;
    padding-right: 10px;
}
#triangle-right {
  float: left;
  width: 0px;
  height: 0px;
  border-top: 30px solid transparent;
  border-left: 20px solid #dfe3ec;
  border-bottom: 30px solid transparent;
}
.el-time-select{
  float: left;
}
.block{
  margin-left: 40px;
  margin-top: 10px;
  float: left;
}
.el-inputs{
  width:300px;
  float:right;
  margin-left: 20px;
}
</style>