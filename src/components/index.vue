<template>
    <el-container>
      <el-main class="ac">
          <div class="right-a">
            <div class="right-one">
              <img src="@/assets/006.png"><span>删除</span>
            </div>
            <el-button type="text" @click="dialogFormVisible = true" class="right-two">
              <img src="@/assets/007.png"><span>添加班级</span>
              </el-button>
              <!-- Form -->
                <el-dialog title="增加班级" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="所选课程">
                      <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="架子鼓" value="jiazigu"></el-option>
                        <el-option label="音乐" value="yinyue"></el-option>
                        <el-option label="基础班" value="jichuban"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="班级名称">
                      <el-input v-model="form.name" autocomplete="off" class="inputs"></el-input>
                    </el-form-item>
                    <el-form-item label="计划课时">
                      <el-input v-model="form.keshi" autocomplete="off" class="inputs" placeholder="0"></el-input><span class="inputs-a">课时</span>
                    </el-form-item>
                     <div class="block">
                       <span class="demonstration">开班日期</span>
                       <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                        </el-date-picker>
                      </div>
                      <div class="block">
                       <span class="demonstration">结班日期</span>
                       <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptionss">
                        </el-date-picker>
                      </div>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
            <div class="right-three">
                  <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                      <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="架子鼓" value="1" selected></el-option>
                        <el-option label="音乐" value="2"></el-option>
                        <el-option label="基础班" value="3"></el-option>
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
              </tr>
              <tr class="edit-tr" v-for="(item,index) in datalist" :key="index">
                <td class="textleft" style="position: relative"><img src="@/assets/09.png">{{item.name}}</td>
                <td>架子鼓课</td>
                <td>刘浩</td>
                <td>0 人</td>
                <td>0课时</td>
                <td>23</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
import axios from 'axios'
export default {
    data(){
      return{
        datalist:[],
        input1: '',
        input2: '',
        input3: '',
        select: '',
        dialogFormVisible: false,form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
      }
    },
    methods:{
      loaddata() {
      //使用axios 调用api接口数据
      let url = "/api/classes/list";
      let that=this;
      axios.get(url).then(function (response) {
        let _data=response.data;
       that.datalist=_data.data.list;
          //  console.log(JSON.stringify( that.datalist));
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
    },
    created() {
    this.loaddata();
  },
}
</script>
<style scoped>

  .right-a{
    height: 100px;
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
    margin-top: 40px;
    margin-left: 20px;
    border: 1px solid #dee3e9;
    border-radius: 5px;
    cursor: pointer;
  }
  .right-one img{
    width: 23px;
    height: 23px;
    text-align: center;
    line-height: 40px;
    margin-left: 10px;
    margin-top: 10px;
  }
  .right-one span{
    font-size: 20px;
    margin-left: 10px;
    line-height: 20px;
    color: #ada2b2;
  }
  .right-two{
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
  .right-two img{
    width: 23px;
    height: 23px;
    margin-right: 25px;
    margin-top: -3px;
  }
  .right-two span{
    margin-left: -20px;
    text-align: center;
    line-height: 24px;
    color: #ada2b2;
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
  margin-left: 17px;
}
.demonstration{
  margin-right: 10px;
}
.right-three{
  width: 40%;
  float: left;
  margin-top: 25px;
  margin-left: 20px;
}
</style>