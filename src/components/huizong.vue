<template>
  <el-container>
    <el-main class="ac">
      <div class="right-a">
        <p class="kes">课时汇总</p>
        <div id="triangle-right"></div>
        <!-- Form -->
        <div class="right-three">
          <div class="search-a">
            <el-dropdown>
              <span class="el-dropdown-link">
                课程
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <span class="el-dropdown-link">
                班级
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                      <el-button slot="append" icon="el-icon-search" class="ss"></el-button>
                    </el-input>
          </div>
        </div>
      </div>
      <span class="cc"><</span> 上个月
      <b class="rq">2021年3月</b> 下个月 >
      总排课时:304
      总学生数:39位
      未结课:303
      已结课:0
      <table width="100%">
        <tr>
          <td class="d">1日(周一)</td>
          <td class="s">
            <div class="jc" @click="dialogFormVisible = true">
              <span class="diao">架子鼓基础班2021</span>
              <span>13:30 明明</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="d">2日(二)</td>
          <td class="s"></td>
        </tr>
        <tr>
          <td class="d">3日(三)</td>
          <td class="s"></td>
        </tr>
        <tr>
          <td class="d">4日(周四)</td>
          <td class="s"></td>
        </tr>
        <tr>
          <td class="d">5日(周五)</td>
          <td class="s"></td>
        </tr>
        <tr>
          <td class="d">6日(周六)</td>
          <td class="s"></td>
        </tr>
        <tr>
          <td class="d">7日(周日)</td>
          <td class="s"></td>
        </tr>
      </table>
      <el-dialog title="课程详情" :visible.sync="dialogFormVisible" >
        <el-form :model="form" class="xinxi">
          <!-- <el-form-item label="基本信息" :label-width="formLabelWidth"> -->
            <h1>基本信息</h1>
            <b>课程名称：架子鼓课</b> <b>主讲老师：明明</b> <b>教室：202教室</b>  
            <h1>上课时间</h1>
            <b>2021年3月1日(周一) </b> <b> 13:30-14:15</b> 
            <h1>学员(2) <span class="add">学员添加</span> </h1>
            <b>jason</b>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消课程</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保存修改</el-button>
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
        desc: ""
      },
      formLabelWidth: "120px"
    };
  }
};
</script>

<style>
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
.search-a {
  border: 1px solid #dee3e9;
  background-color: #ffffff;
  margin-left: 175px;
  margin-top: 10px;
  width: 520px;
  height: 38px;
}
.rq {
  margin-left: 36px;
  margin-right: 36px;
  /* display: none; */
  color: #323433;
  font-weight: normal;
}
.cc {
  margin-left: 34px;
}
.d {
  width: 8%;
  background-color: #f3f3f3;
  color: #00014e;
  line-height: 99px;
  text-align: center;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.s {
  width: 92%;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fdfdfd;
}
.el-dropdown-link {
  line-height: 38px;
  margin-left: 20px;
  color: #9fa4aa;
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.jc {
  width: 153px;
  height: 53px;
  background-color: red;
  text-align: center;
  cursor: pointer;
}
.diao {
  margin-top: 10px;
}
.ss {
  float: right;
}
.el-dialog{
  font-size: 16px;
}
b{
  font-weight: normal;
  margin-right: 5px;
}
.add{
  color: #538dfb;
  cursor: pointer;
}
</style>