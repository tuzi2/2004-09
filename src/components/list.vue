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
              <!-- Form --><!-- Form -->
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
                      <el-date-picker type="date" placeholder="2021-03-02">
                      </el-date-picker>
                    </div>
                    <div class="block">
                      <span class="demonstration">结班日期</span>
                      <el-date-picker type="date" placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
            <div class="right-three">
              <input type="search" name="" class="search-a">  
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
              <tr class="edit-tr" v-for="(item,index) in datalist">
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
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
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