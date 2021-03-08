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
        <!-- Form -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form v-model="form">
            <el-form-item label="所选课程">
              <el-select v-model="form.coursename" placeholder="请选择">
                <el-option v-for="(item,indexs) in liet" :key="indexs" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级名称">
              <el-input v-model="form.name" autocomplete="off" class="inputs"></el-input>
            </el-form-item>
            <el-form-item label="计划课时">
              <el-input
                v-model="form.coursecounts"
                autocomplete="off"
                class="inputs"
                placeholder="0"
              ></el-input>
              <span class="inputs-a">课时</span>
            </el-form-item>
            <div class="block">
              <span class="demonstration">开班日期</span>
              <el-date-picker
                v-model="form.startdate"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
            <div class="block">
              <span class="demonstration">结班日期</span>
              <el-date-picker
                v-model="form.enddate"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptionss"
              ></el-date-picker>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </div>
        </el-dialog>
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
      <table class="tab" id="datalist">
        <tbody>
          <tr>
            <th class="textleft" width="300px">班级名称</th>
            <th>课程</th>
            <th>老師</th>
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
              <input type="hidden" value="item.id">
            <td>{{item.coursename}}</td>
            <td>{{item.teacherslist}}</td>
            <td>{{item.students}}</td>
            <td>{{item.coursecounts}}</td>
            <td>{{item.schcourses}}</td>
            <td>{{item.endcourses}}</td>
            <td>
              <el-button type="primary" @click="dialogFormVisible1 = true">排课</el-button>
              <el-button type="info" @click="dialogVisible3 = true">课表</el-button>
              <el-button type="success" @click="dialogVisible = true">单次排课</el-button>
              <el-button type="danger" @click="del(item.id)">删除</el-button>
              <el-button type="warning" @click="uplad(index)">修改</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 课表 -->
       <el-dialog title="课表" :visible.sync="dialogVisible3" width="70%" :before-close="handleClose">
                <div class="main">
                  <div class="main-left">
                  <div class="main-left-top">
                        <p class="top-t">架子鼓基础班2101</p>
                          <li><b>课程：</b>架子鼓课</li>
                          <li><b>老师：</b>希希、老师傅</li>
                          <li><b>教室：</b></li>
                          <li><b>人数：</b>2/30</li>
                          <li><el-progress :text-inside="true" :stroke-width="24" :percentage="50" status="success"></el-progress></li>
                          <li> <b class="yi">已上2节课</b> <b>已排4节课</b> </li>
                  </div>
                   <div class="main-left-bottom">
                      <p class="top-b">班级学员<b>(2)</b> <i class="el-icon-s-custom"></i> </p>
                       <table style="height:100px;">
                          <tr>
                            <td rowspan="2">  <i class="el-icon-dish">  </i></td>
                            <td class="dd">李四</td>
                          </tr>
                          <tr>
                            <td>已排3节，已上1节</td>
                          </tr>
                          <tr>
                            <td rowspan="2">  <i class="el-icon-dish">  </i></td>
                            <td class="dd">李四</td>
                          </tr>
                          <tr>
                            <td>已排本班课节3，其中上了1节</td>
                          </tr>
                       </table>
                  </div> 
                  </div>
                  <div class="main-right">
                      <li class="main-right-p">
                        <el-button type="text" class="uu">单次排课</el-button> 
                        <el-button type="text">批量排课</el-button>
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

      <!-- 单次排课 -->
    <el-dialog title="排课" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <div>
                  <table>
                    <tr>
                      <td >主讲老师</td>
                      <td style="color:#1890fe">添加助教</td>
                      <td>教师</td>
                      <td>单节课扣学员课时</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="2">
                          <el-select v-model="dd" slot="prepend" placeholder="课程">
                <el-option label="哈妮克孜" value="1"></el-option>
                <el-option label="孙红雷" value="2"></el-option>
                <el-option label="iu" value="3"></el-option>
              </el-select>
                      </td> 
                      <td>
                        <el-select v-model="ee" slot="prepend" placeholder="课程">
                <el-option label="陈冠希" value="1"></el-option>
                <el-option label="李晨" value="2"></el-option>
                <el-option label="Lisa" value="3"></el-option>
              </el-select>
                      </td>
                      <td><el-input v-model="input" placeholder="请输入内容"></el-input></td>
                    </tr>
                  </table>
                </div>

                <div>
                  <table>
                    <tr>
                      <td style="color:#1890fe;">单次排课</td>
                      <td>批量排课</td>
                    </tr>
                  </table>
                </div>
                <div>
                  <table>
                    <tr>
                      <td colspan="2">开课日期</td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div class="block">
                          <el-date-picker
                            v-model="bb"
                            type="datetime"
                            placeholder="选择日期时间"
                          >
                          </el-date-picker>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div>
                  <table>
                    <tr>
                      <td colspan="2">
                        <span class="demonstration">上课时间</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div class="block">
                          <el-date-picker
                            v-model="cc"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']"
                          >
                          </el-date-picker>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="xueyuan">
                  <table>
                    <th>
                      <td style="font-weight:bold ">
                        选中学员（0）
                      </td>
                      <td style="font-weight:bold ">
                        <h6 class="el-icon-user-solid">添加学员</h6>                        
                      </td>
                    </th>
                  </table>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false"
                    >确 定</el-button
                  >
                </span>
    </el-dialog>
      <!-- 班级排课 -->
      <el-dialog title1="排课" :visible.sync="dialogFormVisible1">
        <el-form :model="forms">
          <div class="tpaike">
              <table >
                    <tr>
                      <td>主讲老师</td>
                      <td style="color:#1890fe">添加助教</td>
                      <td>教师</td>
                      <td>单节课扣学员课时</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="2">
                          <el-select v-model="dd" slot="prepend" placeholder="课程" width="70px">
                <el-option label="哈妮克孜" value="1"></el-option>
                <el-option label="孙红雷" value="2"></el-option>
                <el-option label="iu" value="3"></el-option>
              </el-select>
              <el-button>+</el-button>
                      </td> 
                      <td>
                        <el-select v-model="ee" slot="prepend" placeholder="课程">
                <el-option label="陈冠希" value="1"></el-option>
                <el-option label="李晨" value="2"></el-option>
                <el-option label="Lisa" value="3"></el-option>
              </el-select>
                            <el-button>+</el-button>
                      </td>
                      <td style="padding-right:40px"><el-input v-model="input" placeholder="请输入内容"></el-input></td>
                    </tr>
                  </table>
          </div>
          

          <el-form-item label="开课日期">
            <br />
            <el-date-picker v-model="value01" type="date" placeholder="开课日期"></el-date-picker>
          </el-form-item>

          <el-form-item label="结束方式" class="jl">
            <br />
            <el-radio v-model="forms.radio" label="1">按课节</el-radio>
            <el-radio v-model="forms.radio" label="2">按日期</el-radio>
          </el-form-item>

          <el-form-item label="* 结课日期" class="uo">
            <br />
            <el-date-picker v-model="value02" type="date" placeholder="结课日期"></el-date-picker>
          </el-form-item>

          <el-form-item label="* 日期选择" class="po">
            <br />
            <el-checkbox v-model="checked">星期一</el-checkbox>
            <el-checkbox>星期二</el-checkbox>
            <el-checkbox>星期三</el-checkbox>
            <el-checkbox>星期四</el-checkbox>
            <el-checkbox>星期五</el-checkbox>
            <el-checkbox v-model="checked">星期六</el-checkbox>
            <el-checkbox>星期日</el-checkbox>
          </el-form-item>

          <el-form-item label="周六时间">
            <br><el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{ start: '08:30',step: '00:15',end: '18:30'}" style="width:130px;">
            </el-time-select>
              <el-input v-model="forms.namea" placeholder="时长(45分钟)" autocomplete="off" style="width:120px;"></el-input>
            <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{ start: '08:30',step: '00:15',end: '18:30',minTime: startTime}" style="width:130px;">
            </el-time-select>
          </el-form-item>

          <el-form-item label="周日时间" class="pps">
            <br><el-time-select placeholder="起始时间" v-model="startTimes" :picker-options="{ start: '08:30',step: '00:15',end: '18:30'}" style="width:130px;">
            </el-time-select>
              <el-input v-model="forms.nameb" placeholder="时长(45分钟)" autocomplete="off" style="width:120px;"></el-input>
            <el-time-select placeholder="结束时间" v-model="endTimes" :picker-options="{ start: '08:30',step: '00:15',end: '18:30',minTime: startTime}" style="width:130px;">
            </el-time-select>
          </el-form-item>

          <div>
            <h1>选择学员(0)</h1>
          </div>
         
          <div class="um" @click="dialogFormVisibles = true">
             <img src="../assets/11.png" style="margin-left:5px;cursor: pointer;" alt="">
            添加学员
            <!-- <img src="./img/images/课时汇总-排课_03.gif" alt /> -->
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible1 = false">保存</el-button>
        </div>
      </el-dialog>

      <!-- 搜索... -->
      <el-dialog title1="选择学员22222(钢琴课)"   :visible.sync="dialogFormVisibles"  >
       <div class="right-threes">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="课程">
                <el-option label="架子鼓" value="1"></el-option>
                <el-option label="音乐" value="2"></el-option>
                <el-option label="基础班" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="stu">
           <table > 
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">米儿</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox ><img src="../assets/10.png" width="24px" height="24px" alt="">jason</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox><img src="../assets/10.png" width="24px" height="24px" alt="">luke</el-checkbox></td>
          </tr>
        </table>
        </div>
      <div class="right">
        <h1 style="font-size:16;color:black;">已选学员(4)</h1>
        <p class="rt"><img src="../assets/006.png"  alt="">清空</p> 

        <tr>
            <td style="padding-top:38px;border-bottom: 1px solid #f0f0f0;width:480px;"><img src="../assets/10.png" width="30px" height="30px" alt="">luke</td>
          </tr>
          <tr >
            <td style="border-bottom: 1px solid #f0f0f0; width:480px;"><img src="../assets/10.png" width="30px" height="30px" alt="">luke</td>
          </tr>
          <tr >
            <td style="border-bottom: 1px solid #f0f0f0;width:480px;"><img src="../assets/10.png" width="30px" height="30px" alt="">luke</td>
          </tr>
          <tr >
            <td style="border-bottom: 1px solid #f0f0f0;width:480px;"><img src="../assets/10.png" width="30px" height="30px" alt="">luke</td>
          </tr>
      </div>
        
        
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
      // handleClose:'',
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
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    loaddata() {
      //使用axios 调用班级管理api接口数据
      let that = this;
      that.$http.get(
        "/api/classes/list",
        { page: 1 },
        (success) => {
          that.list = success.data.list;
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
        "/api/courses/list",
        { page: 1 },
        (success) => {
          that.liet = success.data.list;
          console.log(success.data.list);
        },
        (failure) => {
          console.log(failure);
        }
      );
    },
    tearch() {
      //使用axios 调用api接口数据
      let that = this;
      that.$http.get(
        "/api/teachers/list",
        { page: 1 },
        (success) => {
          that.litt = success.data.list;
          console.log(success.data.list);
        },
        (failure) => {
          console.log(failure);
        }
      );
    },
    add: function () {
      let that = this;
      // console.log(that.form);
      that.$http.post(
        "/api/classes/add",
        JSON.stringify(this.form),
        (success) => {
          that.dialogFormVisible = false;
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
    uplad(index) {
      let that = this;
      that.title = "修改班级";
      that.dialogFormVisible = true;
      that.form = that.list[index];
      // console.log(that.form)
    },
    
  },
};
</script>
<style scoped>
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
.block {
  margin-bottom: 20px;
  margin-left: 17px;
}
.demonstration {
  margin-right: 10px;
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
}
.main-right {
  width: 700px;
  float: left;
  position: relative;
}

.top-t {
  height: 50px;
  background-color: #1890ff;
  padding-top: 5px;
  padding-left: 15px;
  color: #fff;
  border-radius: 7px 7px 0 0;
}

.main-left-bottom {
  margin-top: 50px;
}

.main-left-bottom b {
  color: #ada2b2;
  font-size: 14px;
}

.main-right-main {
  text-align: center;
}
.top-b {
  height: 50px;
  border-bottom: 1px solid #e5e5e5;
  padding-top: 5px;
  padding-left: 15px;
  font-size: 18px;
  font-weight: bold;
}
.el-icon-s-custom {
  margin-left: 150px;
  color: #1890ff;
}

.el-icon-dish {
  color: #1890ff;
  font-size: 20px;
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
.main-left-top li {
  color: #000;
  font-weight: bold;
}
.main-left-top b {
  color: #7e8b9b;
}

.yi {
  margin-right: 150px;
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
  margin-left: 17px;
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
</style>