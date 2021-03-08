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
</style>