<template>
  <div>
    <div class="right-a">
      <p class="bq">课时汇总</p>
      <div id="triangle-right"></div>
      <div class="right-three">
        <div class="search-a">
          <div>
            <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:15%">
              <el-option label="架子鼓" value="1" selected></el-option>
              <el-option label="音乐" value="2"></el-option>
              <el-option label="基础班" value="3"></el-option>
            </el-select>
            <el-select
              v-model="select"
              slot="prepend"
              placeholder="请选择 "
              style="width:15%;margin-left:-5px"
            >
              <el-option label="架子鼓" value="1" selected></el-option>
              <el-option label="音乐" value="2"></el-option>
              <el-option label="基础班" value="3"></el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="input3" class="ssk">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <el-calendar id="calendar">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <!--自定义内容-->
        <div @click="dialogFormVisible = true">
          <div class="calendar-day">{{ data.day.split("-").slice(2).join("-") }}</div>
          <div v-for="(item, index) in list" :key="index">
            <div v-if="data.day == item.coursedate" class="kecheng">
              <div class="neirong">
                <b style="width:100%">{{ item.coursename }}</b>
                <span
                  style="color:#a698a7;width:100%;"
                >{{item.starttime | formatTime}}——{{item.endtime | formatTime}}</span>
                <span style="color:#a698a7;">{{item.teachername}}</span>
              </div>
            </div>
          </div>
          <!-- <div>111</div> -->
        </div>
      </template>
    </el-calendar>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" v-for="(item,index) in list" :key="index">
         <h1>基本信息:</h1>
          课程名称: {{item.coursename}}  主讲老师:{{item.teachername}} 教室:{{item.classrooms}}

          <h1 style="margin:20px 0;">上课时间</h1>
          {{item.starttime}}<br>
          <h1 style="margin-top:20px;">学员({{xueyuan_list1.length}})</h1>
         <el-form>
          <div class="um" @click="dialogFormVisibles = true">
             <img src="../assets/11.png" style="margin-left:5px;cursor: pointer;" alt="">
            添加学员
          </div>
        </el-form>
         <div style="width:100%;height:70px;">
            <tr v-for="(item,index) in xueyuan_list1" :key="index" style="float:left;margin:15px;">
              <td style="font-size:18px;">
                <img src="../assets/10.png" width="30px" height="30px" alt="">{{item}}
              </td>
            </tr>
        </div>
    </el-dialog>
           <el-dialog title1="选择学员22222(钢琴课)"   :visible.sync="dialogFormVisibles"  >
       <div class="right-threes">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="课程">
                <el-option v-for="(item,indexs) in liet" :key="indexs" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="stu">
           <table> 
          <tr v-for="item in xueyuan_list" :key="item.id" style="line-height:30px">
           <td><input type="checkbox"  v-model="xueyuan_list1" :value="item.name" style="width:20px;height:20px;"/><img src="../assets/10.png" alt="">{{item.name}}</td>
          </tr>
        </table>
        </div> 
      <div class="right">
        <h1 style="font-size:16;color:black;">已选学员({{xueyuan_list1.length}})</h1>
        <p class="rt"><img src="../assets/006.png"  alt="">清空</p> 
        <tr  v-for="(item,index) in xueyuan_list1" :key="index">
            <td style="padding-top:20px;border-bottom: 1px solid #f0f0f0;width:480px;">
              <img src="../assets/10.png" width="30px" height="30px" alt="">{{item}}
              <img src="../assets/006.png" width="20px" height="20px" alt="" style="float:right"></td>
          </tr>
      </div>
        <el-dialog width="50%" :append-to-body='true' class="dialog" center :visible.sync="isAddStu">
        <addStudents ref = "refStuInfo" @checkStuInfo = "checkStuInfo"></addStudents>
      </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisibles = false">确定</el-button>
        </div> 
      </el-dialog>
  </div>
</template>  

<script>
export default {
  data() {
    return {
      list: [],
      input3:'',
      liet:[],
      isAddStu: false,
       xueyuan_list1:[],
      xueyuan_list:[],
      select:'',
      time: new Date(),
      dialogFormVisible:false,
      dialogFormVisibles:false,
      title:'课程详情'
    };
  },
  filters: {
    formatTime(time) {
      return new Date(time).format("hh:mm");
    }
  },

  created() {
    this.huo_list();
    this.xueyuan__list();
    // console.log(23434)
  },
  methods: {
     checkStuInfo(val){
      this.isAddStu = false
      this.scheduleList.studentlist = val
    },
      xueyuan__list() {
      let that = this;
      for (var i = 1; i <= 4; i++) {
        that.$http.get(
          "/api/students/list",
          { page: i },
          (success) => {
            for (var i = 0; i < success.data.list.length; i++) {
              that.xueyuan_list.push(success.data.list[i]);
              this.scheduleList.studentlist = success.data.list;
            }
          },
          (failure) => {
            console.log("123");
          }
        );
      }

      console.log("学员列表", this.xueyuan_list);
    },
    huo_list() {
      let that = this;
      that.$http.get(
        "/api/coursetables/search",
        { month: new Date().format("yyyy-MM"), page: 1, psize: 10000 },
        success => {
          that.list = success.data.list;
          console.log(success.data.list);
          // console.log(123);
        },
        failure => {
          console.log(failure);
          // console.log(321);
        }
      );
    },
      }
};
</script>


<style>
.right-threes {
  width: 40%;
}
.stu {
  overflow-y: scroll;
  width: 430px;
  height: 480px;
}
.stu::-webkit-scrollbar {
  width: 4px;
}
.stu::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
}
.stu::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.stu td {
  border-bottom: 1px solid #f0f0f0;
  line-height: 55px;
  width: 430px;
}
.rt {
  float: right;
  margin-top: -18px;
}
.right {
  width: 480px;
  height: 520px;
  float: right;
  position: relative;
  bottom: 520px;
}
.um{
  margin-left: 70px;
  margin-top: -15px;
}
.bq {
  float: left;
  line-height: 60px;
  color: #333335;
  font-size: 24px;
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
.right-a {
    height: 62px;
    background-color: #f5f6fa;
    border: 1px solid #dee3e9;
    margin-bottom: 20px;
}
.search-a {
  background-color: #ffffff;
  margin-left: 190px;
  margin-top: 12px;
  width: 679px;
  height: 38px;
}
.d {
  width: 8%;
  background-color: #f3f3f3;
  color: #00014e;
  line-height: 80px;
  text-align: center;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.ssk{
  width:475px;
  border: 0;
  float: right;
}
.kecheng {
  width: 163px;
  height: 51px;
  /* line-height: 51px; */
  margin-top: 49px;
  background: #ffffff;
  border-left: 5px solid #4181fc;
  border-radius: 5px;
}
.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}
/* .is-selected{
        color: #F8A535;
        font-size: 10px;
        margin-top: 5px;
    } */
#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: "当月";
}
.el-calendar-table .el-calendar-day {
  height: auto;
}

.neirong {
  margin-left: 11px;
}

.neirong b {
  display: inline-block;
}
.neirong span {
  display: inline-block;
}
</style>

  