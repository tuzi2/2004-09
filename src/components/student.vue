<template>
  <div class="right-a">
    <p class="on">学员管理</p>
    <div id="triangle-right"></div>
    <el-button
      type="button"
      @click="dialogVisible = true"
      style="margin:8px 20px; height:39px;font-size:18px"
    >
      <img src="@/assets/007.png" />添加学员
    </el-button>
    <el-dialog title="增加学员" :visible.sync="dialogVisible" width="40%">
      <span class="student-aa">学生姓名：</span>
      <el-input placeholder="请输入学生姓名" v-model="name" clearable class="student-a"></el-input>
      <br />
      <br /><span class="student-aa">联系方式：</span>
      <el-input placeholder="请输入联系方式：" v-model="tel" clearable class="student-a"></el-input>
      <br />
      <br /><span class="student-aa">学生性别：</span>
      <el-radio v-model="sex" label="0">男</el-radio>
      <el-radio v-model="sex" label="1">女</el-radio>
      <br />
      <br /><span class="student-aa">出生日期：</span>
      <el-input placeholder="请输入出生日期" v-model="birthday" clearable class="student-a"></el-input>
      <br />
      <br /><span class="student-aa">学员编号：</span>
      <el-input placeholder="请输入学员编号" v-model="num" clearable class="student-a"></el-input>
      <br />
      <br /><span class="student-aa">学生备注：</span>
      <el-input placeholder="请输入学生备注" v-model="remarks" clearable class="student-a"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">添加</el-button>
      </span>
    </el-dialog>
    <el-button
      type="button"
      style="margin:8px 20px; height:39px;font-size:18px"
      @click="dialogVisible1 = true"
    >
      <img src="@/assets/007.png" />添加排课
    </el-button>
    <el-dialog title="增加学员" :visible.sync="dialogVisible1" width="60%">
      <el-tabs type="border-card">
        <el-tab-pane label="插班排课">
          <div>
              <el-input class="search-b" placeholder="输入关键字" prefix-icon="el-icon-search" v-model="search"></el-input>
            <table class="table1">
              <tr>
                <td style="float:left;width:160px;">班级名称</td>
                <td>课程</td>
                <td>老师</td>
                <td>人数</td>
                <td>计划课时</td>
                <td>已排课时</td>
                <td>已上课时</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item,index) in liat" :key="index">
                <td style="float:left;"><el-radio v-model="radios" label="1">{{item.name}}</el-radio></td>
                <td>{{item.coursename}}</td>
                <td>{{item.teacherslist}}</td>
                <td>{{item.students}}</td>
                <td>{{item.coursecounts}}</td>
                <td>{{item.schcourses}}</td>
                <td>{{item.endcourses}}</td>
                <td>
                  <span>课表</span>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="一对一排课">
          <div>
                <form action>
                  <table>
                    <div class="group">
                      <tr class="top">
                        <td>
                          <span>主讲老师</span>
                          <span style="  cursor: pointer; marign-left:20px;" @click="changeAddteacher" :style="addstatus == true ? 'color:#3e9eff' : ''" >添加助教</span>
                        </td>
                        <td :class=" addstatus == true ? `clickaddHelpteacher` : `addchange`">
                          助教老师
                        </td>
                        <td>教室</td>
                        <td>单节课扣学员课时</td>
                      </tr>
                      <tr class="top">
                        <td>
                          <el-select value=""></el-select>
                        </td>
                        <td :class="addstatus == true ? `clickaddHelpteacher` : `addchange`">
                          <el-select value=""></el-select>
                        </td>
                        <td>
                          <el-select value=""></el-select>
                        </td>
                        <td>
                          <el-input></el-input>
                        </td>
                      </tr>
                    </div>
                    <!-- tab选项卡 -->
                    <div class="group">
                      <tr>
                        <div class="middle">
                          <td class="tabTitle">
                            <template v-for="(item, index) in tabList">
                              <span :key="index.id" @click="changetab(index)" :class="{ changetab: checktab == index }">{{ item.name }}</span>
                            </template>
                          </td>
                        </div>
                      </tr>
                      <div v-if="isschedule == 0">
                        <tr>
                          <div class="middle center">
                            <td>开课日期</td>
                          </div>
                        </tr>
                        <tr>
                          <div class="middle checkcontont">
                            <td>
                              <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                              </el-date-picker>
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>上课时间</td>
                        </tr>
                        <tr>
                          <td class="time">
                            <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{ start: '08:30',step:'00:15',end:'18:30',}">
                            </el-time-select>
                            -
                            <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{ start: '08:30', step: '00:15', end: '18:30', minTime: startTime,}">
                            </el-time-select>
                            <span class="iconfont icon-jiahao add"></span>
                          </td>
                        </tr>
                      </div>
                      <div v-else>
                        <tr>
                          <div class="middle center">
                            <td>开课日期</td>
                            <td>结束日期</td>
                            <td>排课总数</td>
                          </div>
                        </tr>
                        <tr>
                          <div class="middle checkcontont">
                            <td>
                              <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                              </el-date-picker>
                            </td>
                            <td>
                              <input type="radio" name="time" />按课节
                              <input type="radio" name="time" />按日期
                            </td>
                            <td>
                              <el-input value="0"></el-input>
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>上课时间</td>
                        </tr>
                        <tr>
                          <td class="time">
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
                            -
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
                            <span class="iconfont icon-jiahao add"></span>
                          </td>
                        </tr>
                      </div>
                    </div>
                  </table>
                </form>
              </div>

        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="button" style="font-size:18px">
      <img src="@/assets/006.png" />
      <span>删除</span>
    </el-button>
    <div style="float:right;margin-top:9px;margin-left:5px;">
      <el-select v-model="select" slot="prepend" placeholder="课程" style="width:20%">
        <el-option label="架子鼓" value="1" selected></el-option>
        <el-option label="音乐" value="2"></el-option>
        <el-option label="基础班" value="3"></el-option>
      </el-select>
      <el-input placeholder="请输入内容" v-model="input3" style="width:50%;margin-left:-5px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="two">
      <table width="100%" style="line-height:50px;margin-left:20px;margin-bottom:30px;">       
      <tr>
        <td><input type="checkbox" style="width:20px;height:20px;"></td>
        <td>学员姓名</td>
        <td>性别</td>
        <td>所选课程</td>
        <td>购买总课时</td>
        <td>剩余课时</td>
      </tr>
      <tr v-for="(item,index) in list" :key="index">
        <td>
          <input type="checkbox" style="width:20px;height:20px;">
        </td>
        <td><img src="../assets/10.png" style="margin-top:15px;margin-right:15px;">{{item.name}}</td>
        <td>{{item.sex=== 0 ? '男' : '女'}}</td>
        <td>{{item.num}}</td>
        <td>{{item.buycourses}}</td>
        <td>{{item.lavecourses}}</td>
      </tr>
    </table>
    </div>
      <div>
      <div v-if="counts <= 8">
        <div class="page">
          共<font class="page-num">{{ counts }}</font>条记录
        </div>
      </div>
      <div v-else>
        <el-pagination class="pagenation" :page-size="pagesize" background layout="prev, pager, next" :total="counts" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      addstatus: false,
      radios:"",
      value1: "",
      checktab: "",
      tabList: [
        {
          name: "单次排课",
        },
        {
          name: "批量排课",
        },
      ],
      startTime: "",
      endTime: "",
      isschedule: 0, //是单选排课换是批量排课
      search:"",
      input3: "",
      select: "",
      list: [],
      dialogVisible: false,
      dialogVisible1: false,
      outerVisible: false,
      innerVisible: false,
      activeName: "",
      multipleSelection: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
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
      value1: "",
      value2: "",
      startTime: '',
      endTime: '',
      liat:[],
      name:'',
      sex:'0',
      tel:'',
      num:'',
      birthday:'',
      remarks:'',
      counts:0,
      pagesize:7,
      pagenum:1,
    };
  },
    created() {
      this.loaddate();
      this.classes();
    },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    loaddate() {
        //使用axios 调用api接口数据
        let that=this;
        that.$http.get("/api/students/list",{page:this.pagenum,psize:this.pagesize},
        success=>{
          that.counts = success.data.counts
          that.list  = success.data.list
            // console.log(success.data.list);
        },
        failure=>{
            console.log(failure);
        }
      )
    },
    handleCurrentChange(currPage){
				this.pagenum = currPage;
				this.loaddate();
			},
    classes() {
      //使用axios 调用班级管理api接口数据
      let that = this;
      that.$http.get(
        "/api/classes/list",
        { page: 1 },
        (success) => {
          that.liat = success.data.list;
          console.log(success.data.list);
        },
        (failure) => {
          console.log(failure);
        }
      );
    },
    // 一对一排课
    changeAddteacher() {
      if (this.addstatus) {
        this.addstatus = false;
      } else {
        this.addstatus = true;
      }
    },
    changetab(index) {
      this.checktab = index;
      this.isschedule = index;
    },
  }
};
</script>

<style>
.right-a {
  height: 62px;
  background-color: #f5f6fa;
  border: 1px solid #dee3e9;
  margin-bottom: 20px;
}
.on {
  float: left;
  display: block;
  height: 61px;
  width: 120px;
  background-color: #dfe3ec;
  text-align: center;
  font-size: 19px;
  line-height: 59px;
}
.da{
  display: block;
}
.xiala select {
  width: 140px;
  height: 40px;
}
.table1 {
  width: 100%;
  border-collapse: collapse;
}
.table1 tr {
  height: 20px;
  line-height: 50px;
  text-align: center;
}
.is-top:nth-last-child(1) {
  margin-left: 10px;
}
.table1 tr:nth-child(1) {
  background: #f5f6fa;
}
.table1 tr td:last-of-type {
  color: #538dfb;
}
.up {
  float: left;
  display: block;
  background-color: #f5f6fa;
  border: 1px solid #dee3e9;
}
.search-b{
  margin: 10px;
  width: 300px;
}
.ee {
  width: 170px;
  height: 40px;
}
.student-a{
  width: 350px;
}
.student-aa{
  margin-left: 30px;
}

/* 一对一排课css */

table {
  font-size: 19px;
  width: 100%;
}
.group {
  padding: 20px;
  background-color: #fff;
}

.top td > .el-select {
  margin: 11px 0px;
}

.top td {
  padding-right: 40px;
}

.addchange {
  display: none;
}
.clickaddHelpteacher {
  display: block;
}

/* 中间 */
.middle {
  margin-top: 20px;
}

.middle .tabTitle {
  width: 220px;
  cursor: pointer;
}
.changetab {
  /* 选中tab */
  height: 40px;
  border-bottom: 2px solid #3e9eff;
  display: inline-block;
}
.middle:first-of-type td span:nth-of-type(2) {
  float: right;
}
.center td {
  padding-right: 180px;
}

.checkcontont td {
  width: 230px;
  padding-right: 25px;
  padding-bottom: 30px;
}

.time {
  padding-top: 14px;
}

@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_2398736_lqb30kxkd9.eot?t=1614769952777"); /* IE9 */
  src: url("//at.alicdn.com/t/font_2398736_lqb30kxkd9.eot?t=1614769952777#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALAAAsAAAAABqAAAAJyAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBLIEoATYCJAMICwYABCAFhG0HMBvOBRHVkyFkH6cr4pnirYxU/Dse6Od6/9wkC49QlZFULbNqFTCNb4VD/gRqNzdD16gIxZKcB//Ld6RjhQv55fNcjltAgcwPlMuaw27wUS/AeGtAe2ObrEhib5hevqCBPE9AvlpaCAMGjZggK6GnBYQVSxfPlc0lJRJWyQrSNWsTYb+UbLQjeoZ94ffDd+1ClkgqpmljFg1coM+naWZCvD633ox4g/Xz+cE2EaMFEsKE2uIoscD4sfxioh77Igc+TcvlfLew1z9PSNPEQlADKu9J5dS3SoxAArs7oMeoh5MkpZWFq9KlmVWlNx/WSB961LHszpPamcOPl6gD5zdcKCgIBy/sOidZf3bn+erFsSwMVE7YWRnr9r7VDD2p49NxM+q8jGZEL+ugef/Xf/3borqLyl69KRlQZ0AplPv9S1o3L+lQq/2bE1HJgFq539EH5NYn4g0CAv3/b1BvdkmPv7MFCXixcD9gdb8w2fOEAv9L1bMqERptiY6sRKFIh0xcBCTlI0dHy70aa626OX+QzakYIhk1EctqwEp4LZBSoAPSsnojX3ODNxeosFIsJHloZgtAUOoKIsWeIFbqOSvhvURKtZ9IKw0x2HyTQsWeBRqFpPozakEH5g/JUvfWIyoi3zC8q+asJhS8kK+UgWWci5UDO/IcC65PWEU8eKYGO7gMayU4mTJaGaPIuU2Tr3vTaKkNSn8MaQI5wPgDiUU679cXqvT5GxS8VRq3MHLpF8QuqXewGM09WIex92LcyzWXj2AlhAc8Rhqwg1Goqgg460dlyBKjOCJ/2kymlu9rHNc3t6/bAPm0LQpmWCy9LOmoaRgAAAA=")
      format("woff2"),
    url("//at.alicdn.com/t/font_2398736_lqb30kxkd9.woff?t=1614769952777")
      format("woff"),
    url("//at.alicdn.com/t/font_2398736_lqb30kxkd9.ttf?t=1614769952777")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("//at.alicdn.com/t/font_2398736_lqb30kxkd9.svg?t=1614769952777#iconfont")
      format("svg"); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 37px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-jiahao:before {
  content: "\e65a";
  color: #d0d0d0;
}

.add {
  position: relative;
  top: 10px;
}
</style>