<template>
  <div>
    <div class="right-a">
      <div class="right-ta">
        <p class="kes">考勤管理</p>
        <div id="triangle-right"></div>
      </div>
      <div class="block">
        <div class="block">
          <el-date-picker
            v-model="today"
            value-format="yyyy-MM-dd"
            style="margin-left:20px;margin-top:-8px"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <div class="el-inputs">
          <el-autocomplete
            placeholder="搜索学员快速签到"
            v-model="input3" value-key="name"
            :fetch-suggestions="querySearchAsync"
    @select="handleSelect"
            class="input-with-select"
          >
         
            <el-select v-model="select"  slot="prepend" placeholder="课程">
              <el-option
                v-for="(item, indexs) in list"
                :key="indexs"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button slot="append" @click="search()" icon="el-icon-search"></el-button>
         </el-autocomplete>
        </div>
      </div>
    </div>
    <div class="right-ba">
      <span>今日课表</span>
      {{studentid}}
    </div>
    <div class="right-ya">
      <!-- 考勤 -->
      <div class="kq-text1">
        <el-checkbox v-model="stuAll" @click="changeAll">全选</el-checkbox>
        <el-button
          type="primary"
          @click="dialogFormVisible1 = true"
          style="padding-right: 30px;width:100px;"
        >考勤</el-button>
      </div>
      <div class="kq-text2" v-for="pitem in list" :key="pitem.id">
        <div>
          <table style="width:95%">
            <tr>
              <td>
                <div class="tab2" style="float:left">
                  <el-checkbox></el-checkbox>
                  {{ pitem.classname }}
                  <span class="asd">班课</span>
                </div>
                <div class="tab3" style="float:left">
                  <p class="el-icon-reading"></p>
                  {{ pitem.coursename }}
                </div>
                <div class="tab3" style="float:left">
                  <p class="el-icon-pie-chart"></p>
                  {{ pitem.starttime | dateFormatYYmmddHHMM }} ——
                  {{ pitem.endtime | dateFormatYYmmddHHMM }}
                </div>
                <div class="tab3">
                  <p class="el-icon-s-custom"></p>在
                </div>
              </td>
            </tr>
            <ul>
              <li>
                <table style="border:none;width:100% " v-for="item in pitem.studentList" :key="item.id">
                  <tr>
                    <td>
                      <div class="tab2">
                        <el-checkbox v-model="stuAll"></el-checkbox>
                        <img src="../assets/10.png" width="30px" height="30px" alt />
                        <span>{{ item.name }}</span>
                      </div>
                    </td>
                    <td style="width:150px">
                      <div class="tab3">
                        <p class="el-icon-reading"></p>
                        {{ item.checkedName }}
                      </div>
                    </td>
                    <td style="width:150px;">
                      <div class="tab5">
                        <p class="el-icon-edit-outline"></p>
                        <el-button
                          type="text"
                          @click="classEvery(item.id,pitem.id)"
                          >签到</el-button>
                      </div>
                    </td>
                  </tr>
                  <el-dialog title="签到" :visible.sync="dialogFormVisibles">
                    <div class="groups">
                      <el-radio label="1" v-model="signList.checked">出勤</el-radio>
                      <el-radio label="2" v-model="signList.checked">迟到</el-radio>
                      <el-radio label="3" v-model="signList.checked">请假</el-radio>
                      <el-radio label="4" v-model="signList.checked">旷课</el-radio>
                      <el-radio label="5" v-model="signList.checked">未签到</el-radio>
                      <br />
                      <el-input
                        type="textarea"
                        v-model="form.remarks"
                        placeholder="备注"
                        class="inputs-aa"
                      ></el-input>
                    </div>
                    <br />
                    <el-button type="primary" @click="addSign()" class="buttons"
                      >保 存</el-button
                    >
                  </el-dialog>
                </table>
              </li>
            </ul>
          </table>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      today: new Date(),
      liet: [],
      list: [],
      stuAll: [],
      radio: "1",
      input3: "",
      keyworl: "",
      select: "",
      startTime: "",
      endTime: "",
      checked: true,
      dialogFormVisibles: false,
      dialogFormVisible: false,
      form: {
       id: "",
        remarks: "",
        checked: "1",
        courseid: "",
      },
      formLabelWidth: "120px",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
           studentid: 0,
       //签到状态(默认0：未签到)
      checkStatu: 0,

      //学员id
      stuId: "",
      signList:[],
      //课程id
      courseId: "",
        //班级全选
      checkClass: [],
    };
  },
  created() {
    this.courses();
    this.coursess();
  },

  methods: {
    querySearchAsync(queryString, cb) {
      console.log(queryString);

      let tath = this;
      tath.$http.get(
        "/api/students/list",
        { page: 1, name: queryString },
        success => {
          cb(success.data.list);
        },
        fall => {}
      );
    },
    handleSelect(item) {
      this.studentid = item.id;
      // console.log("选中"+item.id);
    },
    search() {
      console.log(1);
      this.courses();
    },
    changeAll() {
      if (!this.checked) {
        this.stuAll = this.list;
        this.checked = true;
      } else {
        this.stuAll = [];
        this.checked = true;
      }
    },
    dateFormat(fmt, date) {
      return date;
    },

    coursess() {
      //使用axios 调用api接口数据
      let that = this;
      that.$http.get(
        "/api/courses/list",
        { page:1},
        (success) => {
          that.liet = success.data.list;
          console.log(success.data.list);
        },
        (failure) => {
          console.log(failure);
        }
      );
    },
    courses() {
      //使用axios 调用api接口数据
      let that = this;
      that.$http.get(
        "/api/coursetables/checked",
        { today: that.today, studentid: that.studentid },
        success => {
          console.log(success);
          console.log(111);
          this.list = success.data.list;
        },
        failure => {
          console.log(failure);
        }
      );
    },
   //班级里个人签到
    classEvery(stuId, courseId) {
      this.stuId = stuId;
      this.courseId = courseId;
      this.dialogFormVisibles = true;
    },

      //班级签到
    changeClass(item, studentList,index) {
       if(item.classCheckStatu==false){
           this.checkClass = [];
       }else{
         for(var i in studentList){
           this.$set(studentList[i], "isStudentStatu", false)
         }
         this.checkClass = studentList
         console.log(this.checkClass)
       }
    },



  //班级签到
    changeClass(item, studentList,index) {
       if(item.classCheckStatu==false){
           this.checkClass = [];
       }else{
         for(var i in studentList){
           this.$set(studentList[i], "isStudentStatu", false)
         }
         this.checkClass = studentList
         console.log(this.checkClass)
       }
    },
    //确定签到
    addSign() {
      console.log(this.signList.checked);
      this.signList = [
        {
          id: this.stuId,
          checked: this.signList.checked,
          courseid: this.courseId,
          remarks: this.signList.remarks,
        },
      ];

      console.log(JSON.stringify(this.signList));
      this.$http.post(
        "/api/coursetables/updateState",
        this.signList,
        (success) => {
          console.log(success);
          this.$message({
            message: "恭喜你，签到成功",
            type: "success",
          });
          this.dialogFormVisibles = false;
          this.courses();
        },
        (fail) => {
          console.log(fail);
        }
      );
    },
  }
};
</script>

<style scoped>
.el-dialog {
  width: 35%;
}
.el-dialog__body {
  padding: 0;
}
.el-dialog__header {
  padding: 0;
  margin-left: 10px;
}
.buttons {
  margin-left: 460px;
  width: 150px;
}
.inputs-aa {
  width: 350px;
}
.groups {
  text-align: center;
}
.input-with-select {
  width: 450px;
}
.el-select {
  width: 80px;
}
.right-a {
  height: 60px;
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
  border-radius: 5px 2px 2px 5px;
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
  line-height: 59px;
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
.el-time-select {
  float: left;
}
.block {
  margin-left: 40px;
  margin-top: 10px;
  float: left;
}
.el-inputs {
  width: 300px;
  float: right;
  margin-left: 20px;
}
.kq-text2 {
  float: left;
}
.kq-text2 {
  margin-bottom: 20px;
  margin-left: -30px;
  margin-top: 10px;
}
.kq-text2 table {
  border: #c5c5c5 1px solid;
  width: 1600px;
  height: 88px;
}
.kq-text4 table {
  border: #c5c5c5 1px solid;
  width: 1700px;
  height: 88px;
  border-top: none;
}
.kq-text1 {
  margin-left: 50px;
}
.tab2 {
  padding-left: 10px;
}
.san {
  margin-left: -20px;
}
</style>