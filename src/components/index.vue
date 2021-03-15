<template>
  <el-container>
    <el-main class="ac">
      <div class="right-a">
        <div class="right-one">
          <img src="@/assets/006.png" />
          <span>删除</span>
        </div>
        <el-button type="text" @click="dialogFormVisible = true" class="right-two">
          <img src="@/assets/007.png" />
          <span>添加班级</span>
        </el-button>
        <!-- Form Top -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form v-model="form">
            <el-form-item label="所选课程" >
              <el-select  placeholder="请选择" v-model="form.coursename">
                <el-option v-for="(item,indexs) in liet" :key="indexs"  :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级名称">
              <el-input v-model="form.name" autocomplete="off" class="inputs"></el-input>
            </el-form-item>
            <el-form-item label="计划课时">
              <el-input v-model="form.coursecounts" autocomplete="off" class="inputs" placeholder="0"></el-input>
              <span class="inputs-a">课时</span>
            </el-form-item>
            <div class="block">
              <span class="demonstration">开班日期</span>
              <el-date-picker v-model="form.startdate" value-format="yyyy-MM-dd" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
            </div>
            <div class="block">
              <span class="demonstration">结班日期</span>
              <el-date-picker v-model="form.enddate" value-format="yyyy-MM-dd" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptionss"></el-date-picker>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 搜索框 课程循环 -->
        <div class="right-three">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="课程" >
                <el-option v-for="(item,indexs) in liet" :key="indexs" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>
      <!-- 列表展示 -->
      <table class="tab" id="datalist">
        <tbody>
          <tr>
            <th class="textleft" width="300px">班级名称</th>
            <th>课程</th>
            <th>老师</th>
            <th>人数</th>
            <th>计划课时</th>
            <th>已排课时</th>
            <th>已上课时</th>
            <th>操作</th>
          </tr>
          <tr class="edit-tr" v-for="(item,index) in list" :key="index">
            <td class="textleft" style="position: relative">
              <img src="@/assets/09.png" />
              {{item.name}}
            <td>{{item.coursename}}</td>
            <td>{{item.teacherslist}}</td>
            <td>{{item.students}}</td>
            <td>{{item.coursecounts}}</td>
            <td>{{item.schcourses}}</td>
            <td>{{item.endcourses}}</td>
            <td>
              <el-button type="primary" @click="dialogFormVisible1 = true">排课</el-button>
              <el-button type="info" @click="dialogVisible3 = true">课表</el-button>
              <el-button type="danger" @click="del(item.id)">删除</el-button>
              <el-button type="warning" @click="uplad(index)">修改</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 课表 -->
       <el-dialog title="课表" :visible.sync="dialogVisible3" width="60%">
                <div class="main">
                  <div class="main-left">
                  <div class="main-left-top">
                        <p class="top-t">架子鼓基础班2101</p>
                          <li><b>课程：</b>架子鼓课</li>
                          <li><b>老师：</b>希希、老师傅</li>
                          <li><b>教室：</b></li>
                          <li><b>人数：</b>2/30</li>
                          <li><el-progress :text-inside="true" :stroke-width="24" :percentage="50" status="success"></el-progress></li>
                          <li> <b class="yi">已上2节课</b> <b class="er">已排4节课</b> </li>
                  </div>
                   <div class="main-left-bottom">
                      <p class="top-b">班级学员<b>({{xueyuan_list1.length}})</b></p>
                      <div class="top-b-img"  @click="dialogFormVisibles = true"><img src="../assets/11.png"></div>
                   </div>
                       <div style="margin-top:20px;">
                         <div style="width:100%;height:70px;">
            <tr v-for="(item,index) in xueyuan_list1" :key="index" style="float:left;margin:15px;">
              <td style="font-size:18px;">
                <img src="../assets/10.png" width="40px" height="40px" alt="">{{item}}
              </td>
            </tr>
        </div>
                       </div>
                  </div>
                  <div class="main-right">
                      <li class="main-right-p">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                          <el-tab-pane label="单次排课" name="first"></el-tab-pane>
                          <el-tab-pane label="批量排课" name="second"></el-tab-pane>
                        </el-tabs>
                      </li>
                      <div class="main-right-main">
                        <el-calendar :range="['2019-03-01', '2019-03-31']">
                       </el-calendar>
                      </div>
                      <div class="ke">
                        <li>架子鼓课</li><li>09:01在</li>
                      </div>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible3 = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible3= false">确 定</el-button>
                </span>
      </el-dialog>

      <!-- 排课 -->
      <el-dialog title1="排课" :visible.sync="dialogFormVisible1">
        <div class="group">
          <tr class="top">
            <td>
              <span>主讲老师</span>
              <span style="float: right;  cursor: pointer; margin-left:10px;" @click="addTeachingAssistants" :style="isAddAssistant == true ? 'color:#3e9eff' : ''">添加助教</span>
            </td>
            <td :class=" isAddAssistant == true ? `clickaddHelpteacher` : `addchange`">
              助教老师
            </td>
            <td>教室</td>
            <td><font style="color: red">*</font>单节课扣学员课时</td>
          </tr>
          <tr class="top">
            <td>
              <!-- 主讲老师 -->
              <el-select v-model="scheduleList.teacherid">
                <el-option v-for="(item, index) in teacherList" :key="index.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </td>
            <td :class=" isAddAssistant == true ? `clickaddHelpteacher` : `addchange`">
              <!-- 助教老师 -->
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
              <el-input v-model="scheduleList.pricecounts"></el-input>
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
          <!-- 单次排课 -->
          <div v-if="isschedule == 0">
            <tr>
              <div class="middle center">
                <td>开课日期</td>
              </div>
            </tr>
            <tr>
              <div class="middle checkcontont">
                <td>
                  <el-date-picker v-model="scheduleList.begindate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </td>
              </div>
            </tr>
            <tr>
              <td>上课时间</td>
            </tr>
            <template v-for="(item, index) in this.scheduleList.weektime">
              <tr :key="index.id">
                <td class="time">
                  <el-time-select placeholder="起始时间" v-model="item.begintime" format="yyyy-MM-dd" :picker-options="{start: '08:30',step: '00:15',end: '18:30',}">
                  </el-time-select>
                  -
                  <el-time-select placeholder="结束时间" v-model="item.endtime" :picker-options="{start: '08:30',step: '00:15',end: '18:30',minTime: startTime,}">
                  </el-time-select>
                  <template v-if="index == 0">
                    <span class="el-icon-plus create" @click="addOnceTime"></span>
                  </template>
                  <template v-else>
                    <span class="el-icon-minus create" @click="delOnceTime(index)"></span>
                  </template>
                </td>
              </tr>
            </template>
          </div>
          <!-- 批量排课 -->
          <div v-else>
            <tr>
              <div class="middle center">
                <td>开课日期</td>
                <td>结束日期</td>
                <td>
                  {{ scheduleList.jsfs == "按课节" ? "排课总数" : "结束课程" }}
                </td>
              </div>
            </tr>
            <tr>
              <div class="middle checkcontont">
                <td>
                  <el-date-picker v-model="scheduleList.begindate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </td>
                <td>
                  <el-radio-group v-model="scheduleList.jsfs" @change="changejsfs" class="font">
                    <el-radio :label="'按课节'"></el-radio>
                    <el-radio :label="'按日期'"></el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <!-- 按课节 -->
                  <div v-if="scheduleList.jsfs == '按课节'">
                    <el-input v-model="scheduleList.coursescount"></el-input>
                  </div>
                  <!-- 按日期 -->
                  <div v-else>
                    <el-date-picker v-model="scheduleList.enddate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </div>
                </td>
              </div>
            </tr>
            <tr>
              <td>
                <font style="color: red">*</font
                >{{ scheduleList.jsfs == "按课节" ? "上课时间" : "星期选择" }}
              </td>
            </tr>
            <tr>
              <!-- 按课节(选择时间) -->
              <div v-if="scheduleList.jsfs == '按课节'">
                <template v-for="(item, index) in this.scheduleList.weektime">
                  <div :key="index.id">
                    <td class="time">
                      <el-time-select placeholder="起始时间" v-model="item.begintime" :picker-options="{ start: '08:30', step: '00:15', end: '18:30',}">
                      </el-time-select>
                      -
                      <el-time-select placeholder="结束时间" v-model="item.endtime" :picker-options="{start: '08:30', step: '00:15', end: '18:30', minTime: startTime,}">
                      </el-time-select>
                      <template v-if="index == 0">
                        <span class="el-icon-plus create" @click="addOnceTime"></span>
                      </template>
                      <template v-else>
                        <span class="el-icon-minus create" @click="delOnceTime(index)"></span>
                      </template>
                    </td>
                  </div>
                </template>
              </div>
              <!-- 按星期(选择时间) -->
              <div class="week" v-else>
                <div class="check-time">
                  <el-checkbox v-for="(item, index) in weekArray" :key="index.id" v-model="item.isCheck" :label="'星期' + item.name" @change="changeWeek(index)">
                  </el-checkbox>
                </div>
                <template v-for="(w, ind) in weekArray">
                  <div v-if="w.list.length > 0" :key="w.id" class="every-time">
                    <span class="zoutime">周{{ w.name }}时间</span>
                    <div class="week-time" v-for="(item, index) in w.list" :key="index.id">
                      <el-time-select placeholder="起始时间" class="weekTime" v-model="item.begintime" :picker-options="{ start: '08:30',step: '00:15', end: '18:30',}">
                      </el-time-select>
                      <el-input class="weekTime" placeholder="时长(45分钟)"></el-input>
                      <el-time-select placeholder="结束时间" class="weekTime" v-model="item.endtime" :picker-options="{ start: '08:30',step: '00:15', end: '18:30', minTime: startTime,}">
                      </el-time-select>
                      <template v-if="index == 0">
                        <span @click="addtime(ind)" class="el-icon-plus create"></span>
                      </template>
                      <template v-else>
                        <span @click="deltime(ind, index)" class="el-icon-minus create"></span>
                      </template>
                    </div>
                  </div>
                </template>
                <div></div>
              </div>
            </tr>
          </div>
        </div>
        <div>
            <h1>选择学员({{xueyuan_list1.length}})</h1>
         <el-form>
          <div class="um" @click="dialogFormVisibles = true">
             <img src="../assets/11.png" style="margin-left:5px;cursor: pointer;" alt="">
            添加学员
          </div>
        </el-form>
        </div>
         <div style="width:100%;height:70px;">
            <tr v-for="(item,index) in xueyuan_list1" :key="index" style="float:left;margin:15px;">
              <td style="font-size:18px;">
                <img src="../assets/10.png" width="40px" height="40px" alt="">{{item}}
              </td>
            </tr>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="commit()">保存</el-button>
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
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      //是否添加学员
      isAddStu: false,
      //是否添加助教(默认不添加)
      isAddAssistant: false,
      // 选择排课
      checktab: "",
      //tab选项卡(单次排课 && 批量排课)
      tabList: [{ name: "单次排课" }, { name: "批量排课" }],
      //上课起始时间
      startTime: "",
      //上课结束时间
      endTime: "",
      //排课状态(0:单次排课;1:批量排课)
      isschedule: 0,
      
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

      //星期选择week
      weekArray: [
        {
          name: "一",
          isCheck: false,
          list: [],
        },
        {
          name: "二",
          isCheck: false,
          list: [],
        },
        {
          name: "三",
          isCheck: false,
          list: [],
        },
        {
          name: "四",
          isCheck: false,
          list: [],
        },
        {
          name: "五",
          isCheck: false,
          list: [],
        },
        {
          name: "六",
          isCheck: false,
          list: [],
        },
        {
          name: "日",
          isCheck: false,
          list: [],
        },
      ],
      name: "",
      checked: true,
      forms: {
        radio: "1",
      },
      checked: "",
      litt:"",
      relative: "",
      list: [],
      liet: [],
      xueyuan_list1:[],
      xueyuan_list:[],
      value01:"",
      value02:"",
      startTime: "",
      endTime: "",
      startTimes: "",
      endTimes: "",
      input3: "",
      select: "",
      dd: "",
      ee: "",
      cc: "",
      bb: "",
      input: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisibles: false,
      dialogVisible3: false,
      dialogVisible: false,
      title: "增加班级",
      form: {
        id: 0,
        coursename: "",
        name: "",
        enddate: "",
        startdate: "",
        coursecounts: "",
      },
      pickerOptionss: {
        disabledDates(time) {
          return time.getTime() >= Date.now();
        },
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  created() {
    this.loaddata();
    this.courses();
    this.xueyuan__list();
    //初始化主讲老师列表
    this.addTeacherList();
    //初始化助教老师列表
    this.addAssistantTeacherList();
    //初始化教室列表
    this.addClassroomList();
  },
  watch:{
dialogFormVisible(k,l){
  if(k==false){
    this.form={}
    this.title="添加班级"
  }
}
  },
  methods: {
    loaddata() {
      //使用axios 调用班级管理api接口数据
      let that = this;
      that.$http.get(
        "/api/classes/list",
        { page: 1 },
        (success) => {
          that.list = success.data.list;
          // console.log(success.data.list);
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
    handleClick(tab, event) {
        console.log(tab, event);
      },
    //添加班级
    add: function () {
      let that = this;
      // console.log(that.form);
      that.$http.post(
        "/api/classes/add",
        JSON.stringify(this.form),
        (success) => {
          that.dialogFormVisible = false;
          that.list = success.data.list;

          that.form = {
            coursename: "",
            name: "",
            enddate: "",
            startdate: "",
            coursecounts: "",
          };
          that.loaddata();
        },
        (failure) => {
          // alert(failure)
        }
      );
    },
    //删除班级
    del(id) {
      let that = this;
      // console.log(id)
      that.$http.get(
        "/api/classes/delete",
        { id: id },
        (success) => {
          that.loaddata();
        },
        (failure) => {
          alert(failure);
        }
      );
    },
    // 学员列表接口
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
    //修改班级
    uplad(index) {
      let that = this;
      that.title = "修改班级";
      that.dialogFormVisible = true;
      that.form = that.list[index];
      // console.log(that.form)
    },
       //是否添加助教
    addTeachingAssistants() {
      if (this.isAddAssistant) {
        this.isAddAssistant = false;
      } else {
        this.isAddAssistant = true;
      }
    },
    //给选中tab添加样式
    changetab(index) {
      this.checktab = index;
      this.isschedule = index;
      console.log(index);
      if (index == 0) {
        this.scheduleList.addtype = "one";
      } else {
        this.scheduleList.addtype = "more";
        this.scheduleList.jsfs == "按课节"
      }
      this.scheduleList.weektime = [
        {
          week: 0,
          begintime: "",
          endtime: "",
        },
      ];
    },

    //单次排课，点击加号加入数据
    addOnceTime() {
      this.scheduleList.weektime.push({
        week: 0,
        begintime: "",
        endtime: "",
      });
    },

    //单次排课，点击减号减除数据
    delOnceTime(index){
       this.scheduleList.weektime.splice(index,1)
    },

    //点击加号给星期index，添加一个新的list[]模板
    addtime(index) {
      this.weekArray[index].list.push({
        week: index,
        begintime: "",
        endtime: "",
      });
      console.log(11);
    },
    //点击减号给给ind这个组的list，减少一个list[]模板
    deltime(ind, index) {
      this.weekArray[ind].list.splice(index, 1);
    },

    //点击星期选中(取消选中)
    changeWeek(index) {
      if (this.weekArray[index].isCheck) {
        this.weekArray[index].list.push({
          week: index,
          begintime: "",
          endtime: "",
        });
      } else {
        this.weekArray[index].list = [];
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
    //获取结算方式
    changejsfs() {
      if (this.scheduleList.jsfs == "按课节") {
        this.scheduleList.enddate = null;
      } else {
        this.scheduleList.coursescount = "";
      }
    },

    //添加学生选中数据成功
    checkStuInfo(val){
      this.isAddStu = false
      this.scheduleList.studentlist = val
    },
    //保存排课
    commit() {
      for (var i = 0; i < this.weekArray.length; i++) {
        if (this.weekArray[i].list.length > 0) {
          for (var j in this.weekArray[i].list) {
            this.scheduleList.weektime.push(this.weekArray[i].list[j]);
          }
        }
      }
      console.log(JSON.stringify(this.scheduleList));
      console.log(this.scheduleList);
      this.$http.post(
        "/api/coursetables/add",
        this.scheduleList,
        (success) => {
          this.$message({
            message: "恭喜你，排课成功",
            type: "success",
          });
          //  that.loaddata();
          this.scheduleList = {};
          this.$emit("addSched");
          console.log(success);
          this.dialogFormVisible1 = false;
        },
        (fail) => {
          this.$message.error("班级排课失败");
          console.log(fail);
        }
      );
    },
  },
};
</script>
<style scoped>
.week-time {
  margin: 20px 20px 20px 0px;
  float: left;
}

.zoutime {
  float: left;
  width: 100%;
}
.weekTime {
  width: 125px;
}
.every-time {
  width: 100%;
  height: auto;
}
.check-time {
  width: 100%;
  margin-bottom: 20px;
}
  table {
    font-size: 19px;
    width: 100%;
  }
  .group {
    padding: 20px;
    margin: 20px;
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
  .add {
    position: relative;
    top: 10px;
  }

  /* 引入精灵图 */
  .elf {
    width: 24px;
    height: 24px;
    background-image: url("../assets/10.png");
    background-repeat: no-repeat ;
  }
  .userCap {
    display: inline-block;
    background-position: -2px -630px;
  }
  .box .user > div {
    margin-top: 30px;
    margin-right: 100px;
    float: left;
  }
  /* 引入精灵图 */
  .box tr td {
    width: 100%;
    float: left;
  }
  .box tr td .students {
    font-size: 20px;
    margin-top: 26px;
  }
  .box tr td .students span {
    margin-left: 30px;
  }
  .box tr td .students a {
    margin-left: 7px;
    text-decoration: none;
    color: #4281fc;
    font-weight: normal;
  }
  .box tr td:nth-of-type(2) div {
    float: left;
    background: url("../assets/10.png");
    /* background-repeat: no-repeat ; */
    background-position: 0px -620px;
    margin: 27px 100px 20px 10px;
    padding-left: 32px;
  }
  .box tr td:nth-of-type(2) {
    height: auto;
    line-height: 50px;
  }
  @font-face {
    font-family: "iconfont";
    src: url("//at.alicdn.com/t/font_2397874_f8g10mwklol.eot?t=1614758616054"); /* IE9 */
    src: url("//at.alicdn.com/t/font_2397874_f8g10mwklol.eot?t=1614758616054#iefix")
        format("embedded-opentype"),
      /* IE6-IE8 */
        url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMMAAsAAAAABrgAAAK9AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBPIFQATYCJAMICwYABCAFhG0HOBv+BVGUrMkO2Y/D2D1SYi3a4ITDp+0RE/PHJoKn/dJ5+/cwBCoFAAksAUnWhWWJhCO0VXFRlYCadWtv+/00JRY258uyqh2wQv8g7wPnp3R+Tk+p+bFws5u8dpsW7XymAw2y5sc9vkZxikWS/cXhtHneBTK/wbnMNTDqAoy3BjrWoMgKJPSG6VXDpYQBPE6gbqKxyoaLu0doy/C4QFwMPAXtnFeWw0RVKNcszeKWkmq6nN7hpvp+/LU0qiSlAi7ZevrcwvrHfJJSjDRGHBQIPgJaXUKB+UAmdtZGN6uJEF9Tj9ZNBfsqDH7MbzSEXuxVI8K/Duc3gz7IvSce499qfgIZ9q4ADo66npzq62qO/joY7bOWqd9rY4ea3H86DiCarg5V0+XHZ/f7a+fIven9t7Pp/bSHio8W2dr84d5VucXKNyN5ojOmTmu7k7btU5e238kxTm+f1nHnLi0Z/5rMg9IUhCWuh/2bNg6PF8vHinghivX/f5v7U1nxIweT6Q8VGqgOBmQ7nA61IjlgDUBjJCuG/+pvLGr9Hx8ZrfhXbcrg+ynzrvj97KB6blvwD3k9a3IswIp0NVxkS1Zk3BKwoI4G7Oz0O1bZc8PmUM3xQkgqJkChajoyY+dDSZPlUFa1GurmuVzdpAuriVzDXC8AQrtXSFqNQaHdGzJjf6Ck1x+UtUcBdbuja8smM+Ncdz2TErKojxiYLHXUIF1deE/eNlacFSjCM3EZBHCxcHExcUkp8Rwzyp23FHHoOEvwApxGcZxhzllIRqa+SL6aLTpd96apyRLoWo8RRRALaUcoYGRSTjQW3dLn7xHPVkzhlqoR8zPCSkH/aGFq3gN5KU17Vd3LK6Udz5IQDnJYJoEuwCASi2VQXj8oRAwx5Y8I51ZmpJ7rK52uL0++bhPUYVUKUlJovRSoNGSVTOlxq1IAAAAA")
        format("woff2"),
      url("//at.alicdn.com/t/font_2397874_f8g10mwklol.woff?t=1614758616054")
        format("woff"),
      url("//at.alicdn.com/t/font_2397874_f8g10mwklol.ttf?t=1614758616054")
        format("truetype"),
      /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
        url("//at.alicdn.com/t/font_2397874_f8g10mwklol.svg?t=1614758616054#iconfont")
        format("svg"); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-tianjiarenyuan:before {
    content: "\e62c";
    color: #4281fc;
  }

  .create {
    cursor: pointer;
    color: #e3e3e3;
    border: 1px solid #e3e3e3;
    width: 37px;
    height: 37px;
    border-radius: 3px;
    text-align: center;
    line-height: 37px;
    position: relative;
    top: 3px;
  }
  .week {
    padding-top: 25px;
    padding-left: 7px;
  }

.btn {
  width: 100%;
  border-top: 1px solid #e9e9e9;
  margin-top: 50px;
  height: 50px;
}

.preservation {
  width: 150px;
  float: right;
  margin-top: 20px;
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
.jl {
  margin-left: 250px;
  margin-top: -95px;
}

.uo {
  margin-left: 470px;
  margin-top: -100px;
}

.pps {
  margin-left: 470px;
  margin-top: -94px;
}

.um {
  margin-left: 90px;
  margin-top: -18px;
  cursor: pointer;
  color: blue;
  font-size: 14px;
}

.el-select {
  width: 100px;
}
.right-a {
  height: 100px;
  background-color: #f5f6fa;
  margin-top: -20px;
  border: 1px solid #dee3e9;
  margin-bottom: 20px;
}
.right-one {
  float: left;
  width: 110px;
  height: 40px;
  background-color: #ffffff;
  margin-top: 40px;
  margin-left: 20px;
  border: 1px solid #dee3e9;
  border-radius: 5px;
  cursor: pointer;
}
.right-one img {
  width: 23px;
  margin-left: 10px;
  margin-top: 10px;
}
.right-one span {
  font-size: 20px;
  margin-left: 2px;
  color: #ada2b2;
}
.right-two {
  float: left;
  width: 150px;
  height: 40px;
  background-color: #ffffff;
  margin-top: 40px;
  margin-left: 20px;
  border: 1px solid #dee3e9;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}
.right-two img {
  width: 23px;
  height: 23px;
  margin-right: 25px;
  margin-top: -3px;
}
.right-two span {
  margin-left: -20px;
  color: #ada2b2;
}
.tab {
  width: 98%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 10px;
}
.tab td,
.tab th {
  border-bottom: solid 1px #ececec;
  padding: 8px;
  text-align: left;
  line-height: 40px;
}
.tab th {
  background: #f5f6fa;
  height: 65px;
  font-weight: normal;
}
.tab img {
  width: 30px;
  margin-right: 10px;
}
.inputs {
  width: 400px;
}
.inputs-a {
  margin-left: 10px;
}
.right-three {
  width: 40%;
  float: left;
  margin-top: 25px;
  margin-left: 20px;
}
.right-threes {
  width: 40%;
}
.main {
  width: 1100px;
  height: 700px;
  overflow-y: scroll;
}
.main-left {
  width: 300px;
  float: left;
  margin-right: 50px;
  background-color: #f9f9fb;
}
.main-right {
  width: 700px;
  float: left;
  position: relative;
}

.top-t {
  height: 50px;
  line-height: 50px;
  background-color: #1890ff;
  padding-top: 5px;
  padding-left: 15px;
  color: #fff;
  border-radius: 7px 7px 0 0;
}

.main-left-bottom {
  margin-top: 30px;
  background-color: #fff;
}

.main-left-bottom b {
  color: #ada2b2;
  font-size: 14px;
}

.main-right-main {
  text-align: center;
}
.top-b {
  height: 60px;
  border-bottom: 1px solid #e5e5e5;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  float: left;
  width: 300px;
}
.top-b-img {
  float: right;
  height: 30px;
  padding-top: 30px;
  cursor: pointer;
  position: relative;
  top:-80px;
}

table td {
  height: 1px;
}

.dd {
  color: #1890ff;
  display: block;
}

li {
  list-style: none;
}
.main-left-top{
  background-color: #fff;
  height: 360px;
}
.main-left-top li {
  color: #000;
  font-weight: normal;
  font-size: 18px;
  margin-top: 15px;
}
.main-left-top b {
  color: #7e8b9b;
  font-weight: normal;
}

.yi {
  margin-right: 120px;
}
.uu {
  margin-right: 30px;
}

.ke {
  width: 80px;
  height: 40px;
  border-radius: 8px;
  border-left: 10px #1890ff solid;
  position: absolute;
  left: 400px;
  top: 180px;
}

.ke li {
  height: 20px;
  margin-top: -6px;
  font-size: 10px;
  color: #ada2b2;
  padding-left: 5px;
}
.ke li:first-of-type {
  color: #000;
  font-size: 13px;
  font-weight: bold;
  padding-left: 5px;
}
/* 他那个排课 */
.block {
  margin-bottom: 20px;
}
.xueyuan {
  cursor: pointer;
}
.demonstration {
  margin-right: 10px;
}
.tpaike table tr td {
  padding-right: 30px;
}
.dpaike table tr td {
  padding-right: 15px;
}
.dpaike table {
  margin-bottom: 20px;
}
.el-icon-user-solid {
  color: #1890ff;
  font-size: 14px;
}
</style>