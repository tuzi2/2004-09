<template>
  <div class="right-a">
    <p class="on">学员管理</p>
    <div id="triangle-right"></div>
    <el-button type="button" @click="dialogVisible = true" style="margin:8px 20px; height:39px;font-size:18px">
      <img src="@/assets/007.png" />添加学员
    </el-button>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <span class="student-aa">学生姓名：</span>
      <el-input placeholder="请输入学生姓名" v-model="form.name" clearable class="student-a"></el-input>
      <br />
      <br /><span class="student-aa">联系方式：</span>
      <el-input placeholder="请输入联系方式：" v-model="form.tel" clearable class="student-a"></el-input>
      <br />
      <br /><span class="student-aa">学生性别：</span>
      <el-radio v-model="form.sex" label="1">男</el-radio>
      <el-radio v-model="form.sex" label="0">女</el-radio>
      <br />
      <br /><span class="student-aa">出生日期：</span>
      <el-input placeholder="请输入出生日期" v-model="form.birthday" clearable class="student-a"></el-input>
      <br />
      <br /><span class="student-aa">学员编号：</span>
      <el-input placeholder="请输入学员编号" v-model="form.num" clearable class="student-a"></el-input>
      <br />
      <br /><span class="student-aa">学生备注：</span>
      <el-input placeholder="请输入学生备注" v-model="form.remarks" clearable class="student-a"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">{{zhuangtai}}</el-button>
      </span>
    </el-dialog>
    <el-button type="button" style="margin:8px 20px; height:39px;font-size:18px" @click="dialogVisible1 = true">
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
                          <el-select v-model="scheduleList.teacherid">
                            <el-option v-for="(item, index) in teacherList" :key="index.id" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                        </td>
                        <td :class="addstatus == true ? `clickaddHelpteacher` : `addchange`">
                          <el-select v-model="scheduleList.assistant">
                            <el-option v-for="item in teacherAssistantsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                        </td>
                        <td>
                          <!-- 教室列表 -->
                          <el-select v-model="scheduleList.classid">
                            <el-option v-for="item in classroomList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                          </el-select>
                        </td>
                        <td>
                          <el-input v-model="kxy" placeholder="单节课扣学员课时数量"></el-input>
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
                              <el-radio v-model="kejie" label="1">按课节</el-radio>
                              <el-radio v-model="kejie" label="2">按日期</el-radio>
                            </td>
                            <td>
                              <el-input v-model="pkzs" placeholder="请输入排课总数"></el-input>
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>上课时间</td>
                        </tr>
                        <tr>
                          
                          <td class="time">
                            <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{ start:'08:30', step: '00:15',end: '18:30', }">
                            </el-time-select>
                            -
                            <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{ start: '08:30',step: '00:15', end: '18:30', minTime: startTime, }">
                            </el-time-select>
                            <template v-if="index == 0">
                        <span class="el-icon-plus create" @click="addOnceTime"></span>
                      </template>
                      <template v-else>
                        <span class="el-icon-minus create" @click="delOnceTime(index)"></span>
                      </template>
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
        <el-option v-for="(item,indexs) in liet" :key="indexs" :label="item.name" :value="item.id"></el-option>
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
        <td>{{item.sex=== 1 ? '男' : '女'}}</td>
        <td>{{item.num}}</td>
        <td>{{item.buycourses}}</td>
        <td>{{item.lavecourses}}</td>
        <el-button type="success" @click="guoke(item.id)">购课</el-button>
        <el-button type="danger" @click="del(item.id)">删除</el-button>
        <el-button type="primary" @click="update(index)">修改</el-button>
      </tr>
      
      <!-- 购课      -->
      <el-dialog title="购课" :visible.sync="gouke">
      <el-form :model="form2">
        <el-form-item class="wqs" label="合约类型" :label-width="formLabelWidth" style="margin-left:20px;"><br>
          <el-radio v-model="form2.ordertype" label="1" >课时卡</el-radio>
          <el-radio v-model="form2.ordertype" label="2">时段卡</el-radio>
        </el-form-item>
        <el-form-item class="kas" label="* 签约时间:" :label-width="formLabelWidth"><br>
           <el-date-picker v-model="form.beigindate"  type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
      
        <el-form-item class="kiu" label="结束时间" :label-width="formLabelWidth"><br>
            <el-date-picker v-model="form.enddate" type="date"  placeholder="选择日期"> </el-date-picker>
          </el-form-item>

         <el-form-item class="kiuhs " label="* 签约课程" :label-width="formLabelWidth"><br>
         <el-select  v-model="value" placeholder="请选择">
              <el-option v-for="(item,indexs) in liet" :key="indexs" :label="item.name" :value="item.id"></el-option>
      </el-select>
      
            </el-form-item>
        
      <div class="yuts el-icon-plus"></div>
           <el-form-item style="margin-left:250px;margin-top:-171px;width:160px;" format="yyyy-MM-dd" label="课时数" :label-width="formLabelWidth"><br>
            <el-input v-model="form2.coursecounts" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item style="margin-left:460px;margin-top:-166px;width:160px;" format="yyyy-MM-dd" label="课程单价" :label-width="formLabelWidth"><br>
            <el-input v-model="form2.price" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item style="margin-left:650px;margin-top:-166px;width:160px;" format="yyyy-MM-dd" label="* 课程金额" :label-width="formLabelWidth"><br>
            <el-input v-model="form2.sumprice" autocomplete="off" ></el-input>
          </el-form-item>

          <el-form-item style="margin-left:20px;" label="折扣方式" :label-width="formLabelWidth"><br>
            <el-radio v-model="form2.discounttype" label="1">直减</el-radio>
          <el-radio v-model="form2.discounttype" label="2">折扣</el-radio>
          </el-form-item>

       <el-form-item label="优惠金额" style="width:200px;margin-left:200px;margin-top:-120px;" :label-width="formLabelWidth"><br>
            <el-input v-show="form2.discounttype == '2'" v-model="form2.discountper" autocomplete="off" ></el-input>
              <el-input v-show="form2.discounttype == '1'" v-model="form2.discountprice" autocomplete="off" ></el-input>
            {{ form2.discounttype == "2" ? "折扣" : "直减" }}
        </el-form-item>


        <el-form-item label="备注" style="" :label-width="formLabelWidth"><br>
            <el-input style="width:250px;" type="textarea" :rows="2" placeholder="请输入内容" v-model="form2.remarks">
</el-input>
          </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <font color="black">总金额<span style="color:red;">￥{{total}}</span></font>
          <font color="black">已优惠<span style="color:red;">￥{{form2.coursecounts * form2.price -  total}}</span></font>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goke()">确定</el-button>
        </div>
      </div>
    </el-dialog>
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
     form1: {},
      form2: {
        studentid: "",
        ordertype: "1",
        beigindate: "",
        enddate: "",
        courseid: "",
        coursecounts: "",
        price: "",
        sumprice: "",
        discounttype: "1",
        remarks: "",
        discountprice: "",
        discountper: "",
      },
      formLabelWidth:'',
      value:'',
      kejie:'1',
      pkzs:'',
      kxy:'',
      title:'购课',
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
      gouke: false,
      outerVisible: false,
      innerVisible: false,
      activeName: "",
      // formLabelWidth: "120px",
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
      // 主讲老师列表
      teacherList: [],
      // 助教老师列表
      teacherAssistantsList: [],
      // 教室列表
      classroomList: [],
      //排课列表
      studentlist:[],
      scheduleList: {
        //单次排课:one 批量排课:more
        addtype: "one",
        //学生id
        studentid: 0,
        //班级id
        classrooms: this.id,
        //主讲老师id
        teacherid: "",
        //助教老师id
        assistant: "",
        //教室id
        classid: "",
        // 单节课扣学员课时
        pricecounts: "",
        //开课日期
        begindate: "",
        //结课日期
        enddate: "",
        //结束方法按课节(0:按课节: 按日期)
        jsfs: "按课节",
        //排课总数
        coursescount: 0,
        //上课时间
        weektime: [
          {
            week: 0,
            begintime: "",
            endtime: "",
          },
        ],
      },
      liet:[],
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
      form : {
            name: "",
            tel: "",
            sex: "0",
            birthday: "2000-02-13",
            num:"",
            remarks:""
          },
          zhuangtai:"添加",
          title:"增加学员"

    };
  },
    created() {
      this.loaddate();
      this.classes();
      this.courses();
      //初始化主讲老师列表
      this.addTeacherList();
      //初始化助教老师列表
      this.addAssistantTeacherList();
      //初始化教室列表
      this.addClassroomList();
    },
  methods: {
    //单次排课，点击加号加入数据
    addOnceTime() {
      this.scheduleList.weektime.push({
        week: 0,
        begintime: "",
        endtime: "",
      });
    },
    courses() {
      //使用axios 调用api接口数据
      let that = this;
      that.$http.get(
        "/api/courses/list",
        { page: 1 },
        (success) => {
          that.liet = success.data.list;
          // console.log(success.data.list);
        },
        (failure) => {
          console.log(failure);
        }
      );
    },
    //单次排课，点击减号减除数据
    delOnceTime(index){
       this.scheduleList.weektime.splice(index,1)
    },
        goke() {
      if (this.form2.discounttype == "2") {
        this.form2.discounttype = "折扣";
        this.form2.discountprice="";
      } else {
        this.form2.discounttype = "直减";
        this.form2.discountper="";
      }
      if (this.form2.ordertype == "0") {
        this.form2.ordertype = "课时卡";
      } else {
        this.form2.ordertype = "时段卡";
      }
      this.form2.courseid = this.form2.courseid.toString();
      this.form2.sumprice = this.form2.sumprice.toString();
      let tath = this;
      console.log(JSON.stringify(tath.form2));
      tath.$http.post(
        "/api/students/addorder",
        JSON.stringify(tath.form2),
        (success) => {
          this.gouke = false;
          console.log(success);
        },
        (fall) => {
          console.log(fall);
        }
      );
    },
    guoke(id) {
      this.gouke = true;
      this.form2.studentid = id.toString();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //获取主讲老师
    addTeacherList() {
      this.$http.get(
        "/api/teachers/list",
        { cat: 1, page: 1 },
        (success) => {
          this.teacherList = success.data.list;
        },
        (fail) => {
          console.log(fail);
        }
      );
    },
    //获取助教老师
    addAssistantTeacherList() {
      this.$http.get(
        "/api/teachers/list",
        { cat: 2, page: 1 },
        (success) => {
          this.teacherAssistantsList = success.data.list;
        },
        (fail) => {
          console.log(fail);
        }
      );
    },
    //获取教室
    addClassroomList() {
      this.$http.get(
        "/api/classrooms/list",
        { page: 1 },
        (success) => {
          this.classroomList = success.data.list;
          console.log(success.data.list);
        },
        (fail) => {
          console.log(fail);
        }
      );
    },
    
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add: function () {
      let that = this;
      console.log(that.form);
      that.$http.post(
        "/api/students/add",
        JSON.stringify(this.form),
        (success) => {
          that.form = {
            name: "",
            tel: "",
            sex: "",
            birthday: "",
            num:"",
            remarks:""
          };
          this.loaddate();
            that.dialogVisible = false;
        },
        (failure) => {
          // alert(failure)
        }
      );
    },
     del(id) {
      let that = this;
      that.$http.get(
        "/api/students/delete",
        { id: id },
        (success) => {
          // this.loaddata();
                    this.loaddate();
  
                    console.log(this.$route.path);

        },
        (failure) => {
           //alert(failure)
        }
      );
    },
    update(index){
      let that = this;
      that.zhuangtai="修改"
      that.title = "修改学员";
      that.dialogVisible = true;
      that.form = that.list[index];

    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
  
    loaddate() {
        //使用axios 调用api接口数据
        let that=this;
        that.$http.get("/api/students/list",{page:this.pagenum,psize:this.pagesize},
        success=>{
          that.counts = success.data.counts
          that.list  = success.data.list
            // console.log("列表？",success.data.list);
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
  },

    
  watch:{
    total(a, c) {
      this.form2.sumprice = this.total;
    },
    dialogVisible(a,c){
      if(a==false){
        this.zhuangtai="添加"
        this.form={sex:"1"};
        this.title="增加学员"
      }
    },
    gouke(z,c) {
      if (z == false) {
        this.form2 = {
          studentid: "",
          ordertype: "0",
          beigindate: "",
          enddate: "",
          courseid: "",
          coursecounts: "",
          price: "",
          sumprice: "",
          discounttype: "1",
          remarks: "",
          discountprice: "",
          discountper: "",
        };
      }
    },
  },
   computed: {
    total() {
      var form2 = this.form2;
      console.log(form2.discountper);
      var sum = 0;
      if (form2.discounttype == "2") {
        sum =(Number(form2.price) *Number(form2.coursecounts) *Number(form2.discountper)) /10;
      } else {
        sum =Number(form2.price) * Number(form2.coursecounts) -Number(form2.discountprice);
      }
      // console.log(sum);
      return sum;
    },
  },
};
</script>

<style scoped>
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
.on {
  float: left;
  display: block;
  height: 61px;
  width: 120px;
  background-color: #dfe3ec;
  text-align: center;
  font-size: 24px;
  line-height: 59px;
  padding-left: 10px;
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
/* 购课 */
.kiu{
  margin-left: 520px;
  margin-top: -118px;
  width: 300px;
}
.kas{
  margin-left: 210px;
  margin-top: -131px; 
  width: 300px;
  /* float: right; */
}
.wqs{
  margin-left: -20px;
}

</style>