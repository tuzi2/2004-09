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
    <el-dialog title="增加学员" :visible.sync="dialogVisible1" width="40%">
      <el-tabs type="border-card">
        <el-tab-pane label="插班排课">
          <div>
            <div class="chaban">
              <input type="text" name id placeholder="输入关键字" />
              <span />
            </div>
            <table class="table1">
              <tr>
                <td>班级名称</td>
                <td>课程</td>
                <td>老师</td>
                <td>人数</td>
                <td>计划课时</td>
                <td>已排课时</td>
                <td>已上课时</td>
                <td>操作</td>
              </tr>
              <tr>
                <td>架子鼓基础班2101</td>
                <td>架子鼓课</td>
                <td></td>
                <td>0人</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <span>课表</span>
                </td>
              </tr>
              <tr>
                <td>架子鼓基础班2101</td>
                <td>架子鼓课</td>
                <td></td>
                <td>0人</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <span>课表</span>
                </td>
              </tr>
              <tr>
                <td>架子鼓基础班2101</td>
                <td>架子鼓课</td>
                <td></td>
                <td>0人</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <span>课表</span>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="一对一排课">
          <div>
            *选择课程
            <div class="xiala">
              <select name id placeholder="请选择">
                <option value disabled selected hidden>请选择</option>
                <option value></option>
              </select>
            </div>
          </div>
          <div class="san">
            <div style="width: 140px">
              <div>
                <font color="red">*</font> 主讲老师
                <span>添加助教</span>
              </div>
              <div class="xiala">
                <select name id placeholder="请选择">
                  <option value disabled selected hidden>请选择</option>
                  <option value></option>
                </select>
              </div>
            </div>
            <div style="margin-left:175px;margin-top:-59px">
              *教室
              <div class="xiala">
                <select name id placeholder="请选择">
                  <option value disabled selected hidden>请选择</option>
                  <option value></option>
                </select>
              </div>
            </div>
            <div style="margin-left:360px;margin-top:-40px">
              *单节课扣学员课时
              <input type="text" style="height:40px" placeholder="1" />
            </div>
          </div>

          <div class="da">
            <el-tabs v-model="activeName">
              <el-tab-pane label="单次排课" name="first">
                <p style="float:left">开课日期</p>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  style="float:left;margin-top:24px;margin-left:-40px;"
                ></el-date-picker>
                <div style="float:left;margin-top:-15px;margin-left:2px;">
                               <p style="margin:10px">上课时间</p>
                <el-time-select
                  placeholder="起始时间"
                  v-model="startTime"
                  :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"></el-time-select>-
                <el-time-select
                  placeholder="结束时间"
                  v-model="endTime"
                  :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
                ></el-time-select>
                </div>
   
              </el-tab-pane>
              <el-tab-pane label="批量排课" name="second">配置管理</el-tab-pane>
            </el-tabs>
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
      <table width="100%" style="line-height:50px;margin-left:20px;">
      <tr>
        <td><input type="radio"></td>
        <td>学员姓名</td>
        <td>性别</td>
        <td>所选课程</td>
        <td>购买总课时</td>
        <td>剩余课时</td>
      </tr>
      <tr v-for="(item,index) in list" :key="index">
        <td><input type="radio"></td>
        <td>{{item.name}}</td>
        <td>{{item.sex=== 0 ? '男' : '女'}}</td>
        <td>{{item.num}}</td>
        <td>{{item.buycourses}}</td>
        <td>{{item.lavecourses}}</td>
      </tr>
    </table>
    </div>
    <div class="block" style="float: right; margin-top: 40px; margin-right:150px;">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1:'',
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

      name:'',
      sex:'0',
      tel:'',
      num:'',
      birthday:'',
      remarks:''
    };
  },
    created() {
      this.loaddate();
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
        that.$http.get("/api/students/list",{page:1},
        success=>{
          that.list  = success.data.list
            console.log(success.data.list);
        },
        failure=>{
            console.log(failure);
        }
      )
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
  height: 59px;
  width: 120px;
  background-color: #dfe3ec;
  text-align: center;
  font-size: 19px;
  line-height: 59px;
}
.chaban {
  display: inline-block;
  border: 1px solid #cdcdcd;
  height: 30px;
}
.da{
  display: block;
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
  height: 30px;
  width: 30px;
  display: inline-block;
  position: relative;
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
</style>