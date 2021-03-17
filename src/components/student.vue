<template>
  <div style="width: 100%">
    <div class="el-footer1">
      <div class="right-a">
        <p class="on">学员管理</p>
        <div id="triangle-right"></div>
        <button @click="dialogFormVisible = true">
          <span /> 添加学员
        </button>
        <button @click="paike_add">
          <span /> 添加排版
        </button>
        <button @click="ALLdel" style="margin-left:20px;width:90px">
          <img src="@/assets/006.png" />
          <span /> 删除
        </button>

        <div class="sosuo">
          <div style="float:right;margin-top:9px;margin-left:5px;">
            <el-select v-model="select" slot="prepend" placeholder="课程" style="width:20%">
              <el-option
                v-for="(item,indexs) in kc_list"
                :key="indexs"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="keyword" style="width:50%;margin-left:-5px;">
              <el-button slot="append" @click="searcha()" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>
      <!-- </el-footer> -->
    </div>
    <div v-show="selectList != ''" style="height: 50px; margin-top: 20px">
      <div v-for="(vo, index) in selectList" :key="index" class="mc">
        <span style="margin: 40px">{{ vo.substring(0, vo.indexOf("+")) }}</span>
        <span class="el-icon-close" @click="delxue(index)"></span>
      </div>
    </div>

    <div class="el-main1">
      <!-- <el-main> -->
      <table class="table">
        <tr align="center">
          <td>
            <input
              type="checkbox"
              class="kuang"
              @click="checkAll"
              :checked="
                selectList.length == list.length ? y_checked : n_checked
              "
            />
          </td>
          <td>学员名称</td>
          <td>性别</td>
          <td>所选课程</td>
          <td>购买数量</td>
          <td>剩余课程</td>
          <td>操作</td>
        </tr>
        <tr v-for="(res, index) in list" :key="index" align="center">
          <td>
            <input
              type="checkbox"
              class="kuang"
              v-model="selectList"
              :value="res.name + '+' + res.id"
            />
          </td>
          <td>
            <span class="kuang-1" />
            <img src="../assets/10.png" alt />
            {{ res.name }}
          </td>
          <td>{{ res.sex == 1 ? "男" : "女" }}</td>
          <td>{{ res.kecheng }}</td>
          <td>{{ res.num }}</td>
          <td>{{ res.shengyu }}</td>
          <td>
            <el-button class="paiban" @click="guoke(res.id)">购买课程</el-button>
            <el-button class="paiban" @click="xueyuan_del(res.id)">删除</el-button>
            <el-button class="paiban" @click="xueyuan_xiu(index)">修改</el-button>
          </td>
        </tr>
      </table>

      <div style="margin-left: 550px">
        <div v-if="counts <= 8">
          <div class="page">
            共
            <font class="page-num">{{ counts }}</font>条记录
          </div>
        </div>
        <div v-else>
          <el-pagination
            class="pagenation"
            :page-size="pagesize"
            background
            layout="prev, pager, next"
            :total="counts"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
      <!-- 购买课程 -->
      <el-dialog :title="title" :visible.sync="gouke">
        <el-form :model="form2">
          <el-form-item class="wqs" label="合约类型" :label-width="formLabelWidth">
            <br />
            <el-radio v-model="form2.ordertype" label="0" style="margin-left: -60px">课时卡</el-radio>
            <el-radio v-model="form2.ordertype" label="1">时段卡</el-radio>
          </el-form-item>
          <el-form-item class="kas" label="* 签约时间:" :label-width="formLabelWidth">
            <br />
            <el-input v-model="form2.beigindate" autocomplete="off" style="margin-left: -80px"></el-input>
          </el-form-item>

          <el-form-item class="kiu" label="结束时间" :label-width="formLabelWidth">
            <br />
            <el-input v-model="form2.enddate" autocomplete="off" style="margin-left: -80px"></el-input>
          </el-form-item>

          <el-form-item class="kiuhs" label="* 签约课程" :label-width="formLabelWidth">
            <br />

            <el-select style="margin-left: -70px" v-model="form2.courseid" placeholder="请选择">
              <el-option
                v-for="(item, index) in kc_list"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
                <!-- options -->
              </el-option>
            </el-select>
            <div class="yuts el-icon-plus"></div>
          </el-form-item>
          <el-form-item
            style="margin-left: 280px; margin-top: -100px; width: 250px"
            label="课时数"
            :label-width="formLabelWidth"
          >
            <br />
            <el-input v-model="form2.coursecounts" autocomplete="off" style="margin-left: -80px"></el-input>
          </el-form-item>
          <el-form-item
            style="margin-left: 420px; margin-top: -100px; width: 250px"
            label="课程单价"
            :label-width="formLabelWidth"
          >
            <br />
            <el-input v-model="form2.price" autocomplete="off" style="margin-left: -80px"></el-input>
          </el-form-item>
          <el-form-item
            style="margin-left: 560px; margin-top: -100px; width: 250px"
            label="* 课程金额"
            :label-width="formLabelWidth"
          >
            <br />
            <el-input v-model="form2.sumprice" autocomplete="off" style="margin-left: -80px"></el-input>
            <!-- {{ total }} -->
          </el-form-item>

          <el-form-item style="margin-left: -20px" label="折扣方式" :label-width="formLabelWidth">
            <br />
            <el-radio v-model="form2.discounttype" label="1" style="margin-left: -60px">直减</el-radio>
            <el-radio v-model="form2.discounttype" label="2">折扣</el-radio>
          </el-form-item>

          <el-form-item
            label="优惠金额"
            style="width: 300px; margin-left: 200px; margin-top: -100px"
            :label-width="formLabelWidth"
          >
            <br />

            <el-input
              v-show="form2.discounttype == '2'"
              v-model="form2.discountper"
              autocomplete="off"
              style="margin-left: -80px"
            ></el-input>
            <el-input
              v-show="form2.discounttype == '1'"
              v-model="form2.discountprice"
              autocomplete="off"
              style="margin-left: -80px"
            ></el-input>
            {{ form2.discounttype == "2" ? "折扣" : "直减" }}
            <!-- {{ form2.total }} -->
          </el-form-item>
          <el-form-item label="备注" style="margin-left: -50px" :label-width="formLabelWidth">
            <br />
            <el-input
              style="margin-left: -50px; width: 250px"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form2.remarks"
            ></el-input>
          </el-form-item>
        </el-form>
        <font color="red">
          总金额
          <span style="color: blue">￥{{ total }}</span>
        </font>
        <font color="red">
          已优惠
          <span style="color: blue">￥{{ form2.coursecounts * form2.price - total }}</span>
        </font>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goke()">确定</el-button>
        </div>
      </el-dialog>
      <!-- 添加学员 -->

      <el-dialog :title="titles" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.tel" autocomplete="off"></el-input> -->
            <input type="radio" v-model="form.sex" name="sex" value="1" />男
            <input type="radio" v-model="form.sex" name="sex" value="0" />女
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="学员编号" :label-width="formLabelWidth">
            <el-input v-model="form.num" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="备注" :label-width="formLabelWidth">
            <textarea na v-model="form.remarks" id cols="55" rows="10" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="xueyuan_add">保 存</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogFormVisible1">
        <ul style="height: 40px">
          <li
            v-for="(res, index) in selectList"
            :key="index"
            style="
              font-size: 20px;
              margin-right: 10px;
              width: 100px;
              background: yellow;
              float: left;
              text-align: center;
            "
          >
            <span>{{ res.substr(0, res.indexOf("+")) }}</span>
          </li>
        </ul>
        <span>共 {{ selectList.length }}条</span>
        <el-form :model="form1">
          <el-tabs type="border-card">
            <el-tab-pane label="插班排课">
              <div class="chaban">
                <input type="text" name id placeholder="输入关键字" />
                <span />
              </div>
              <el-table :data="banji_list" stripe style="width: 100%">
                <el-table-column prop="id" width="30">
                  <template slot-scope="scope">
                    <el-radio v-model="kecehng_xuan" :label="scope.row.id">备选项</el-radio>
                    <!-- {{scope.row.id}} -->
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="班级名称" width="180"></el-table-column>
                <el-table-column prop="coursename" label="课程" width="180"></el-table-column>
                <el-table-column prop="address" label="老师"></el-table-column>
                <el-table-column prop="students" label="人数"></el-table-column>
                <el-table-column prop="coursecounts" label="计划课时"></el-table-column>
                <el-table-column prop="schcourses" label="已排课时"></el-table-column>
                <el-table-column prop="endcourses" label="已上课时"></el-table-column>
                <el-table-column label="操作">
                  <button>课表</button>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="一对一排课">
              <div class="group">
                <tr class="top">
                  <td>
                    <span>主讲老师</span>
                    <span
                      style="float: right;  cursor: pointer; margin-left:10px;"
                      @click="addTeachingAssistants"
                      :style="isAddAssistant == true ? 'color:#3e9eff' : ''"
                    >添加助教</span>
                  </td>
                  <td :class=" isAddAssistant == true ? `clickaddHelpteacher` : `addchange`">助教老师</td>
                  <td>教室</td>
                  <td>
                    <font style="color: red">*</font>单节课扣学员课时
                  </td>
                </tr>
                <tr class="top">
                  <td>
                    <!-- 主讲老师 -->
                    <el-select v-model="scheduleList.teacherid">
                      <el-option
                        v-for="(item, index) in teacherList"
                        :key="index.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td :class=" isAddAssistant == true ? `clickaddHelpteacher` : `addchange`">
                    <!-- 助教老师 -->
                    <el-select v-model="scheduleList.assistant">
                      <el-option
                        v-for="item in teacherAssistantsList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <!-- 教室列表 -->
                    <el-select v-model="scheduleList.classid">
                      <el-option
                        v-for="item in classroomList"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                      ></el-option>
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
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="paike()">确 定</el-button>
          <!--dialogFormVisible1 = false  -->
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script scoped>
export default {
  created() {
    this.xuyuan_list();
    this.kecheng_list();
    this.hu_bj_list();
    //初始化主讲老师列表
    this.addTeacherList();
    //初始化助教老师列表
    this.addAssistantTeacherList();
    //初始化教室列表
    this.addClassroomList();
  },
  watch: {
    dialogFormVisible(c, v) {
      console.log(c, v);
      if (c === false) {
        this.form = {
          num: "", //学员编号
          name: "", //名称
          tel: "", //手机号
          sex: 1, //性别
          birthday: "", //日期
          remarks: "" //备注
        };
      }
    },

    total(a, c) {
      this.form2.sumprice = this.total;
    },
    gouke(z, c) {
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
          discountper: ""
        };
      }
    }
  },

  data() {
    return {
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
      kecehng_xuan: "",
      banji_list: [],
      keyword: "",
      title: "购课",
      titles: "添加学员",
      counts: 0,
      pagesize: 7,
      pagenum: 1,
      kc_list: [],
      y_checked: true,
      n_checked: false,
      value: "",
      selectList: [],
      activeName: "first", //一对一排课 选择
      time: "",
      time1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      list: [],
      input3: "",
      select: "",
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogFormVisible1: false,
      dialogFormVisible: false,
      gouke: false,
      form: {
        num: "", //学员编号
        name: "", //名称
        tel: "", //手机号
        sex: 1, //性别
        birthday: "", //日期
        remarks: "" //备注
      },
      form1: {},
      form2: {
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
        discountper: ""
      },
      formLabelWidth: "120px",

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
      studentlist: [],
      activeName: 'second',
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
            endtime: ""
          }
        ],
        
      }
    };
  },
  methods: {
    // checkStuInfo(val){
    //   this.isAddStu = false
    //   this.scheduleList.studentlist = val
    // },
       changejsfs() {
      if (this.scheduleList.jsfs == "按课节") {
        this.scheduleList.enddate = null;
      } else {
        this.scheduleList.coursescount = "";
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

    //是否添加助教
    addTeachingAssistants() {
      if (this.isAddAssistant) {
        this.isAddAssistant = false;
      } else {
        this.isAddAssistant = true;
      }
    },

    //获取主讲老师
    addTeacherList() {
      this.$http.get(
        "/api/teachers/list",
        { cat: 1, page: 1 },
        success => {
          this.teacherList = success.data.list;
        },
        fail => {
          console.log(fail);
        }
      );
    },
    //获取助教老师
    addAssistantTeacherList() {
      this.$http.get(
        "/api/teachers/list",
        { cat: 2, page: 1 },
        success => {
          this.teacherAssistantsList = success.data.list;
        },
        fail => {
          console.log(fail);
        }
      );
    },
    //获取教室
    addClassroomList() {
      this.$http.get(
        "/api/classrooms/list",
        { page: 1 },
        success => {
          this.classroomList = success.data.list;
          console.log(success.data.list);
        },
        fail => {
          console.log(fail);
        }
      );
    },

    searcha() {
      this.xuyuan_list();
    },
    paike() {
      // this.kecehng_xuan
      // dialogFormVisible1 = false
      if (this.kecehng_xuan == "") {
        alert("请选择要添加的班级");
        return;
      }
      let tath = this;
      var list = tath.selectList;
      var arr = [];
      for (let i = 0; i < list.length; i++) {
        arr.push({
          id: list[i].substring(list[i].lastIndexOf("+") + 1, list[i].length)
        });
      }
      let list1 = { classid: this.kecehng_xuan, studentlist: arr };
      console.log(list1);
      tath.$http.post(
        "/api/coursetables/addForClassid",
        JSON.stringify(list1),
        success => {
          this.xuyuan_list();
          this.selectList = [];
          this.dialogFormVisible1 = false;

          alert("操作成功");
        },
        fall => {}
      );
    },
    paike_add() {
      if (this.selectList != 0) {
        this.dialogFormVisible1 = true;
      } else {
        alert("请先添加学员");
      }
      // selectList!=0?dialogFormVisible1 = true: alert('请先添加学员')
    },
    ALLdel() {
      let tath = this;
      var list = tath.selectList;
      for (let i = 0; i < list.length; i++) {
        tath.$http.get(
          "/api/students/delete",
          {
            id: list[i].substring(list[i].lastIndexOf("+") + 1, list[i].length)
          },
          success => {
            if (i == list.length - 1) {
              alert("批量删除成功");
              this.xuyuan_list();
              this.selectList = [];
            }
          },
          fall => {}
        );
      }
    },
    xueyuan_del(id) {
      let tath = this;
      tath.$http.get(
        "/api/students/delete",
        { id: id },
        success => {
          console.log(success);
          this.xuyuan_list();
        },
        fall => {}
      );
    },
    hu_bj_list() {
      let tath = this;
      tath.$http.get(
        "/api/classes/list",
        { page: 1 },
        success => {
          this.banji_list = success.data.list;
          console.log("班级信息", success);
        },
        fall => {}
      );
    },
    xueyuan_add() {
      console.log(this.form);
      let that = this;
      that.$http.post(
        "/api/students/add",
        JSON.stringify(this.form),
        success => {
          this.xuyuan_list();
          // console.log(success);
          this.dialogFormVisible = false;
        },
        fall => {
          console.log(fall);
        }
      );
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    xuyuan_list() {
      let that = this;
      that.$http.get(
        "/api/students/list",
        { page: this.pagenum, psize: this.pagesize, name: that.keyword },
        success => {
          that.counts = success.data.counts;
          that.list = success.data.list;
          // console.log("580", that.list);
        },
        failure => {
          console.log(failure);
        }
      );
    },
    handleCurrentChange(currPage) {
      this.pagenum = currPage;
      this.xuyuan_list();
    },
    delxue(index) {
      //
      this.selectList.splice(index, 1);
    },

    checkAll() {
      if (this.selectList.length != this.list.length) {
        this.selectList = this.list.map(item => item.name + "+" + item.id);
      } else {
        this.selectList = [];
      }
      console.log(this.selectList);
      // console.log();
    },
    xueyuan_xiu(index) {
      console.log(this.list[index]);
      var shuju = this.list[index];
      this.form = {
        id: shuju.id,
        num: shuju.num, //学员编号
        name: shuju.name, //名称
        tel: shuju.tel, //手机号
        sex: shuju.sex, //性别
        birthday: shuju.birthday, //日期
        remarks: shuju.remarks //备注
      };
      console.log(this.form);
      this.titles = "修改学员信息";
      this.dialogFormVisible = true;
    },
    kecheng_list() {
      let tath = this;
      tath.$http.get(
        "/api/courses/list",
        { page: 1 },

        success => {
          this.kc_list = success.data.list;
          console.log(success);
        },
        fall => {}
      );
    },
    goke() {
      if (this.form2.discounttype == "2") {
        this.form2.discounttype = "折扣";
        this.form2.discountprice = "";
      } else {
        this.form2.discounttype = "直减";
        this.form2.discountper = "";
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
        success => {
          this.gouke = false;
          console.log(success);
        },
        fall => {
          console.log(fall);
        }
      );
    },
    guoke(id) {
      this.gouke = true;
      this.form2.studentid = id.toString();
    }
    // ces(index,name){
    //   if(this.selectList[index].substr(0,this.selectList[index].indexOf("+",0))==name){
    //           // return true;
    //     }
    // }
  },

  computed: {
    total() {
      var form2 = this.form2;
      console.log(form2.discountper);
      var sum = 0;
      if (form2.discounttype == "2") {
        sum =
          (Number(form2.price) *
            Number(form2.coursecounts) *
            Number(form2.discountper)) /
          10;
      } else {
        sum =
          Number(form2.price) * Number(form2.coursecounts) -
          Number(form2.discountprice);
      }
      // console.log(sum);
      return sum;
    }
  }
};
</script> 
<style scoped>
.mc {
  float: left;
  margin-left: 40px;
  min-width: 126px;
  height: 40px;
  border: 1px solid #2e12ac;
  text-align: center;
  line-height: 40px;
  background-color: yellow;
  color: #100e99;
  font-size: 18px;
  position: relative;
}

.el-icon-close {
  font-size: 22px;
  position: absolute;
  right: 10px;
  top: 9px;
  cursor: pointer;
}

.el-icon-plus {
  font-size: 30px;
  text-align: center;
  line-height: 40px;
}
.kiuhs {
  margin-left: -20px;
  margin-top: 40px;
}
.yuts {
  width: 40px;
  height: 40px;
  background-color: #dfe3ec;
  border: 1px solid #dfe3ec;
  position: relative;
  top: 5px;
}
.kas {
  margin-left: 200px;
  margin-top: -100px;
  width: 300px;
}
.wqs {
  margin-left: -20px;
}
td {
  width: 20%;
}
.xueyuan_xialai {
  width: 100px;
}

.one {
  /* float: left; */
  font-size: 14px;
  display: inline-block;
}

.paiban {
  color: blue;
  border: none;
  background-color: #fff;
  display: none;
  cursor: pointer;
  font-size: 15px;
}
td:hover .paiban {
  display: inline;
}

.two {
  /* float: left;  */
  display: inline-block;
  margin-left: 50px;
}

.da1 {
  margin-top: 40px;
  float: left;
  display: block;
  /* width: 1200px; */
  /* width:400px; */
  width: 100%;
}

.xiala .red > input {
  width: 200px;
}

.kiu {
  margin-left: 400px;
  margin-top: -100px;
  width: 300px;
}
.san {
  float: left;
}
.san > div {
  float: left;
  margin-top: 20px;
  margin-right: 50px;
}
.san > div span {
  margin-left: 15px;
  color: blue;
  cursor: pointer;
}

.xiala select {
  width: 140px;
  height: 40px;
}

/* .table1 {
  width: 100%;
  border-collapse: collapse;
}
.table1 tr:nth-child(1){
  height: 20px;
  line-height: 50px;
  text-align: center;
}

.table1 >tr:nth-child(1) {
  background: #f5f6fa;
} */

.is-top:nth-last-child(1) {
  margin-left: 10px;
}
.chaban {
  display: inline-block;
  border: 1px solid #cdcdcd;
  height: 30px;
}
.chaban input {
  height: 25px;
  display: inline-block;
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
  position: relative;
  top: -11px;
}
.chaban span {
  /* background: url("../../assets/ico.png") 80px 614px; */
  height: 30px;
  width: 30px;
  display: inline-block;
  position: relative;
  /* top:12px;
  left: -5px; */
}

.kuang {
  width: 25px;
  height: 25px;
  margin-left: 20px;
}

.el-dialog__header {
  background: coral;
}
.el-dialog__body .el-input__inner {
  width: 400px;
}
.el-footer .da {
  height: 60px;
  font-size: 20px;
}
.sosuo {
  display: inline-block;
  width: 600px;
  height: 40px;
  padding: 0;
  margin-left: 20px;
}

.el-main1 .table tr td:nth-child(1) {
  width: 80px;
}

.el-main1 .table,
tr {
  /* border:0; */
  background: #fff;
  width: 100%;
  border-collapse: collapse;
  line-height: 70px;
  border-top: 1px solid #eff2f7;
  border-bottom: 1px solid #eff2f7;
}

.el-main1 .table tr:nth-child(1) {
  background: #e9eef3;
  /* line-height: 70px; */
  font-size: 19px;

  border-top: 1px solid #e9eef3;
  border-bottom: 1px solid #e9eef3;
}
.el-main1 .table tr td:nth-child(2) {
  padding-left: 10px;
  width: 439px;
}
.el-main1 .table tr td:nth-child(3) {
  /* padding-left: 10px; */
  width: 170px;
}
.el-main1 .table tr td:nth-child(4) {
  /* padding-left: 10px; */
  width: 275px;
}
.el-main1 .table tr td:nth-child(5) {
  /* padding-left: 10px; */
  width: 294px;
}
.el-footer1 {
  background-color: #f5f6fa;
  margin: 0;
  padding: 0;
}

.el-footer1 div b {
  width: 144px;
  height: 60px;
  background: #dfe3ec;
  display: inline-block;
  font-size: 19px;
  text-align: center;
  line-height: 60px;
  background-color: #dfe3ec !important ;
  background: url("../assets/xueyuan-1.png") no-repeat;
  background-position: 127px 0px;
}

.el-footer1 div button {
  color: #9fa3ac;
  height: 42px;
  border: 0px;
  outline: 0 none;
  cursor: pointer;
  border: 1px solid #cdcdcd;
  background-color: #fff;
  display: inline-block;
  text-align: center;
  font-size: 18px;
}
.el-footer1 div button:nth-child(2) {
  position: relative;
  top: 3px;
  padding-right: 4px;
  margin-left: 20px;
}
.el-footer1 div button:nth-child(2) span {
  background: url("../assets/ico.png") 33px 268px;
  display: inline-block;
  width: 27px;
  height: 28px;
}
.el-footer1 div button:nth-child(3) {
  position: relative;
  top: 3px;
  padding-right: 4px;
  margin-left: 20px;
}
.el-footer1 div button:nth-child(3) span {
  background: url("../assets/ico.png") 31px 595px;
  display: inline-block;
  width: 27px;
  height: 28px;
}
.el-footer1 div button:nth-child(4) {
  position: relative;
  top: 3px;
  padding-right: 4px;
  margin-left: 20px;
}
.el-footer1 div button:nth-child(4) span {
  background: url("../assets/ico.png") 31px 595px;
  display: inline-block;
  width: 27px;
  height: 28px;
}

.el-main1 {
  background-color: #fff;
  color: #333;
}
.right-a {
  height: 62px;
  background-color: #f5f6fa;
  border: 1px solid #dee3e9;
  margin-bottom: 20px;
}
#triangle-right {
  float: left;
  width: 0px;
  height: 0px;
  border-top: 30px solid transparent;
  border-left: 20px solid #dfe3ec;
  border-bottom: 30px solid transparent;
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

/* 一对一排课
 */
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

</style>