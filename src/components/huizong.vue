<template>
  <el-container>
    <el-main class="ac">
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
<el-select v-model="select" slot="prepend" placeholder="请选择 " style="width:15%;margin-left:-5px">
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
      <el-calendar v-model="value">

      </el-calendar>
      <!-- 课程详情 -->
      <el-button type="text" @click="dialogVisible = true" class="ke-click"><li>架子鼓基础班2102</li> <li>13:30明明</li></el-button>

      <el-dialog title="课程详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <div class="main">
        <li><h3 style="margin-left:30px; color:#000;">基本信息</h3></li>
        <li class="main-a"><b>课程名称：架子鼓课</b> <b>主讲老师：明明</b> <b>教室：202教室</b> </li>
        <li style="margin-left:30px;"><b style="color:red;">*</b> <b style=" color:#000;font-size:17px;">上课时间</b></li>
        <li class="main-b"><b>2021年3月1日(周一)</b> <b>13:30-14:15</b></li>
        <li style="margin-left:30px;">
                <b style="margin-right:35px; color:#000;font-size:17px;">学员(2)</b> 
             <a href="#" style="text-decoration:none;"> <b style="color:#1890ff;">
             <i class="el-icon-user-solid"></i>添加学员</b></a>
        </li>
        <li class="main-c"> 
         <img  src="../logo.jpg" height="60px" style="margin-left:30px;" > 
         <img src="../logo.jpg" height="60px" style="margin-left:120px;"> 
        </li>
        <b class="title">架子鼓基础班2102(架子鼓课)</b>
         <b class="one">Jason</b> 
          <b class="two">傅以禧</b> 
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消课程</el-button>
          <el-button type="primary" @click="dialogVisible = false">保存修改</el-button>
        </span>
      </el-dialog>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
       value: new Date(),
      input3:'',
      select:'',
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
};

</script>

<style scoped>
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



el-calendar{
  position: relative;
}
.ke-click{
  position: absolute;
  top: 310px;
  left: 150px;
  width: 150px;
  height: 40px;
  border: 1px solid #ada2b2;
  border-left: 10px solid #1890ff;
  
}

el-dialog{
  position: relative;
}
.title{
  position:absolute;
  top: -65px;
  left: 320px;
}


.ke-click li{
  text-align: left;
  padding-left: 5px;
  padding-top: -7px;
  font-size: 13px;
  color: #ada2b2;
}
.ke-click li:first-of-type{
  font-size: 14px;
  font-weight: bold;
  color: #000;
}

.main li{
  width: 500px;
  height: 70px;
  
}

.main-a > b{
  margin-left: 30px;
}
.main-b > b{
  margin-left: 30px;
}
.main-c > b{
  margin-left: 30px;
}
.main{
  position: relative;
}
.one{
  position: absolute;
  top:355px;
  left: 100px;
}

.two{
  position: absolute;
  top:355px;
  left: 285px;
}
</style>