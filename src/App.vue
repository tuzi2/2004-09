
<template>
  <div id="app">
    <el-container>
  <el-header>
    <img src="./02.jpg" height="50px">
    <p class="aa">云教务管理系统</p>
    </el-header>
  <el-container>
    <el-aside width="150px;">
      <div v-for="item in navList" :key="item.id" @click="path(item.path)" >
          <img :src="item.img" class="tp">
          <p class="zi">{{item.name}}</p>
      <!-- <router-view></router-view> -->
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
                    path:'/list',
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
.tp{
  margin-left: 41px;
  margin-top: 13px;
}
.zi{
    margin-top: -10px;
    width: 100px;
    float: left;
}
  .el-header{
    height: 70px;
    line-height: 50px;
  }
  img{
    float: left;
  }
  .aa{
    font-size: 36px;
    float: left;
    margin: 5px;
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
    width:100px;
    cursor: pointer;
  }
    .el-aside .div{
    float: left;
  }
  .el-main {
    color: #333;
    /* text-align: center; */
    height: 850px;
  }
  

  .right-a{
    height: 80px;
    background-color: #f5f6fa;
    margin-top: -20px;
    border: 1px solid #dee3e9;
    margin-bottom: 20px;
  }
  .right-one{
    float: left;
    width: 110px;
    height: 40px;
    background-color: #ffffff;
    margin: 20px;
    border: 1px solid #dee3e9;
    font-size: 24px;
    border-radius: 5px;
    cursor: pointer;
  }
  .right-one img{
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 40px;
    margin-left: 10px;
    margin-top: 10px;
  }
  .right-one span{
    margin-left: 10px;
    text-align: center;
    line-height: 40px;
    color: #ada2b2;
  }
  .right-two{
    float: left;
    width: 150px;
    height: 40px;
    background-color: #ffffff;
    margin: 20px 1px;
    border: 1px solid #dee3e9;
    font-size: 24px;
    border-radius: 5px;
    cursor: pointer;
  }
  .right-two img{
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 40px;
    margin-left: 10px;
  }
  .right-two span{
    margin-left: 5px;
    text-align: center;
    line-height: 15px;
    color: #ada2b2;
  }
  .search-a{
    margin: 20px;
    width: 450px;
    height: 40px;
  }
  .tab {
  width: 98%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 10px;
}
.tab td,.tab th {
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
.tab img{
   width:30px;
   margin-right: 10px;
}
.inputs{
  width: 400px;
}
.inputs-a{
  margin-left: 10px;
}
.block{
  margin-bottom: 20px;
}
.demonstration{
  margin-right: 10px;
}
</style>
