<template>
  <div id="app">
    <el-container>
      <el-header height="80px">
        <img src="../02.jpg" height="60px" />
        <p class="aa">云教务管理系统</p>
      </el-header>
      <el-container>
        <el-aside width="150px;">
          <ul>
            <template v-for="(item, index) in navList">
              <li
                :key="index.id"
                ref="changeInit"
                @click="addClass(index, item.path)"
                :class="index == isChange ? 'changeClass' : ''"
                :style="index == isChange ? item.checked : item.unchecked"
              >
                {{ item.meta.name }}
              </li>
            </template>
          </ul>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      isChange: 0,
      navList: [
        {
          path: "/index1",
          meta: {
            name: "班级管理",
          },
          checked: {
            backgroundPosition: "20px -290px",
          },
          unchecked: {
            backgroundPosition: "20px -458px",
          },
        },
        {
          path: "/kecheng",
          meta: {
            name: "课程管理",
          },
          checked: {
            backgroundPosition: "20px 7px",
          },
          unchecked: {
            backgroundPosition: "20px -150px",
          },
        },
        {
          path: "/kaoqin",
          meta: {
            name: "考勤管理",
          },
          checked: {
            backgroundPosition: "20px -630px",
          },
          unchecked: {
            backgroundPosition: "20px -788px",
          },
        },
        {
          path: "/huizong",
          meta: {
            name: "课时汇总",
          },
          checked: {
            backgroundPosition: "-211px 12px",
          },
          unchecked: {
            backgroundPosition: "-211px -146px",
          },
        },
        {
          path: "/student",
          meta: {
            name: "学员管理",
          },
          checked: {
            backgroundPosition: "31px -1190px",
          },
          unchecked: {
            backgroundPosition: "-112px -1190px",
          },
        },
      ],
    };
  },
  created(){
    this.hp();
  },
  methods: {
    addClass(val, path) {
      this.isChange = val;
      this.$router.push(path);
    },
    hp(){
        if(this.$route.path=="/index1"){this.isChange=0;}
        if(this.$route.path=="/kecheng"){this.isChange=1;}
        if(this.$route.path=="/kaoqin"){this.isChange=2;}
        if(this.$route.path=="/huizong"){this.isChange=3;}
        if(this.$route.path=="/student"){this.isChange=4;}
    }
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.aa{
    margin-top: 20px;
    margin-left: 10px;
    font-size: 36px;
    float: left;
  }
.changeClass {
  color: #66aff4;
  background-color: #e8ebf0 !important;
  border-radius: 10px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.el-aside ul li {
  background: url("../assets/ico.png") no-repeat;
  background-size: 300px;
  height: 90px;
  margin: 17px 7px;
  padding-top: 48px;
}
.el-aside ul li:nth-child(1) {
  margin-top: 35px;
}
.el-aside ul li:nth-child(5) {
  margin-bottom: 220px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-header {
  border-bottom: 1px solid #b3c0d1;
  box-shadow: 0 15px 5px -5px #ecf1f4;
}
.el-header img {
  margin-top: 10px;
  float: left;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  color: #333;
  text-align: center;
  line-height: 50px;
  width: 120px;
  height: 800px;
  cursor: pointer;
  box-shadow: 17px 0 5px -5px #f8f9fb;
}
.el-main {
  float: left;
  padding: 0px 2px 0px 0px;
}
</style>