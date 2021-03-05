<template>
    <div id="app">
    <el-container>
  <el-header height="80px">
    <img src="../02.jpg" height="60px">
    <p class="aa">云教务管理系统</p>
    </el-header>
  <el-container>
    <el-aside width="150px;">
      <div v-for="item in navList" :key="item.id" @click="path(item.path)" >
          <img :src="item.img" class="tp">
          <p class="zi">{{item.name}}</p>
      </div>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>  
</el-container>
  </div>
</template>

<script>
import con1 from "@/assets/002.png";
import con2 from "@/assets/001.png";
import con3 from "@/assets/003.png";
import con4 from "@/assets/004.png";
import con5 from "@/assets/005.png";
export default {
    data(){
      return{
        datalist:[],
        navList:[
                {
                    path:'/index1',
                    name:"班级管理",
                    img:con1,
                },
                {
                    path:'/kecheng',
                    name:"课程管理",
                    img:con2,
                },
                {
                    path:'/kaoqin',
                    name:"考勤管理",
                    img:con3,
                },
                {
                    path:'/huizong',
                    name:"课时汇总",
                    img:con4,
                },
                {
                    path:'/student',
                    name:"学员管理",
                    img:con5,
                },
        ],
        
      }
    },
    methods:{
      path(path){
        this.$router.push({ path:path  })
      },
    }
}

</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.tp{
  margin-top: 13px;
}
.zi{
    margin-top: -25px;
    margin-left: 7px;
    width: 100px;
    float: left;
}
  .el-header{
    border-bottom: 1px solid #B3C0D1;
    box-shadow:  0 15px 5px -5px #ecf1f4;
  }
  .el-header img{
    margin-top: 10px;
    float: left;
  }
  .aa{
    margin-top: 20px;
    margin-left: 10px;
    font-size: 36px;
    float: left;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 50px;
    width:120px;
    height: 800px;
    cursor: pointer;
    box-shadow: 17px 0 5px -5px #f8f9fb;
  }
    .el-aside div{
    float: left;
    margin-top: 20px;
  }
  .el-main {
    float: left;
    padding: 0px;
    height: 850px;
  }
  
</style>