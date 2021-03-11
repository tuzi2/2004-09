<template>
  <el-container>
    <el-main>
      <div class="right-a">
        <p class="kes">课程管理</p>
        <div id="triangle-right"></div>
        <el-button type="text" @click="dialogFormVisible = true" class="right-two">
          <img src="@/assets/007.png" /><span>添加课程</span>
        </el-button>
        <div class="right-three">
          <div style="margin-top: 15px">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>
      <table class="tab" id="datalist">
        <tbody>
          <tr>
            <th class="textleft" width="800px">课程名称</th>
            <th>收费模式</th>
            <th>单价</th>
            <th>上课模式</th>
            <th>操作</th>
          </tr>
          <tr class="edit-tr" v-for="(item, index) in list" :key="index">
            <td class="textleft" style="position: relative">
              <img src="@/assets/01.png" />{{ item.name }}
            </td>
            <td>{{ item.pricetype ==1 ?"按课时收费":"按期收费"}}</td>
            <td>{{ item.price }}元/课时</td>
            <td>{{ item.mode ==1 ?"一对一":"集体班"}}</td>
            <td>
              <el-button type="primary" @click="del(item.id)">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <el-pagination class="pagenation" :page-size="pagesize" background layout="prev, pager, next" :total="counts" @current-change="handleCurrentChange">
        </el-pagination>
    </div>
      <!-- Form -->
      <el-dialog title="增加课程" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="课程名称:">
            <el-input v-model="form.name" autocomplete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="收费模式:">
            <el-radio v-model="form.pricetype" label="1">按课时收费</el-radio>
            <el-radio v-model="form.pricetype" label="2">按期收费</el-radio>
          </el-form-item>
          <el-form-item label="单价:" class="form-items">
            <el-input v-model="form.price" autocomplete="off" class="inputs"></el-input>
            <span class="inputs-a">元/课时</span>
          </el-form-item>
          <el-form-item label="上课模式:">
            <el-radio v-model="form.mode" label="1">一对一</el-radio>
            <el-radio v-model="form.mode" label="2">集体班</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add">保存</el-button>
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
      list: [],
      input3: "",
      radio: "1",
      radios: "1",
      counts:0,
      pagesize:7,
      pagenum:1,
      dialogFormVisible: false,
      form: {
        name: "",
        pricetype: "1",
        price: "",
        mode: "1",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },

  methods: {
    loaddata() {
      //使用axios 调用api接口数据
      let that = this;
      that.$http.get(
        "/api/courses/list",
        {page:this.pagenum,psize:this.pagesize},
        (success) => {
          that.counts = success.data.counts;
          that.list = success.data.list;
          console.log(success.data.list);
        },
        (failure) => {
          console.log(failure);
        }
      );
    },
    handleCurrentChange(currPage){
				this.pagenum = currPage;
				this.loaddata();
			},
    add: function () {
      let that = this;
      console.log(that.form);
      that.$http.post(
        "/api/courses/add",
        JSON.stringify(this.form),
        (success) => {
          that.dialogFormVisible = false;
          that.form = {
            name: "",
            pricetype: "",
            price: "",
            mode: "",
          };
          that.loaddata();
        },
        (failure) => {
          // alert(failure)
        }
      );
    },
    del: function (id) {
      let that = this;
      console.log(that.form);
      that.$http.get(
        "/api/courses/delete",
        { id: id },
        (success) => {
          that.loaddata();
        },
        (failure) => {
          // alert(failure)
        }
      );
    },
  },
  created() {
    this.loaddata();
  },
};
</script>
<style scoped>
.dialog-footer {
  border-top: 1px solid #eff2f7;
  height: 40px;
  width: 100%;
}
.dialog-footer .el-button {
  margin-top: 10px;
  width: 120px;
}
.pp {
  margin-left: 20px;
  margin-top: 15px;
  font-size: 18px;
}
p span {
  color: red;
}
.inputs {
  width: 400px;
}
.right-three {
  width: 20%;
  float: left;
  margin-top: -7px;
}
.kes {
  float: left;
  font-size: 24px;
  line-height: 59px;
  text-align: center;
  color: #333335;
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
  height: 60px;
  background-color: #f5f6fa;
  border: 1px solid #dee3e9;
  margin-bottom: 20px;
}
.right-two {
  float: left;
  width: 124px;
  height: 36px;
  margin: 9px 38px;
  border: 1px solid #dee3e9;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  background-color: #fff;
}
.right-two img {
  width: 23px;
  height: 23px;
  margin-right: 12px;
  margin-top: -8px;
}
.right-two span {
  margin-left: -5px;
  text-align: center;
  line-height: 20px;
  color: #ada2b2;
}

.tab {
  width: 98%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 15px;
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
  width: 25px;
  height: 30px;
  margin-right: 10px;
}
.el-form-item {
  margin-left: 20px;
}
.form-items {
  margin-left: 45px;
}
</style>