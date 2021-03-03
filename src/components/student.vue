<template>
<div class="right-a">
    <span class="on">学员管理</span>
               <el-button type="button" @click="dialogVisible = true" class="up"><img src="@/assets/007.png">添加学员</el-button>
                <el-dialog
                  title="增加学员"
                  :visible.sync="dialogVisible"
                  width="40%"
                  :before-close="handleClose">

                   学生姓名：<input type="text" name="#"><br><br>
                   联系方式：<input type="text" name="#"><br><br>
                   学生性别：<input type="radio" name="sex" value="男">男<input type="radio" name="sex" value="女">女<br><br>
                   出生日期：<input type="text" name="#"><br><br>
                   学员编号：<input type="text" name="#"><br><br>
                   学生备注：<input type="text" name="#">

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">保存</el-button>
                  </span>
                </el-dialog>
              
                          <el-button type="text" @click="dialogFormVisible = true" class="right-two">
              <img src="@/assets/007.png"><span>添加班级</span>
              </el-button>
       <div class="right-one">
              <img src="@/assets/006.png"><span>删除</span>
            </div>

            

            <select class="ww">
            <option class="op1">课程</option>
            <option>课程</option>
            <option>课程</option>
            <option>课程</option>
            <option>课程</option>
          </select>

          <div class="two">
              <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      prop="name"
      label="学员姓名"
      width="400">
       <el-button type="text" @click="outerVisible = true">☺ 李宗霖</el-button>
    </el-table-column>

    

    <el-table-column
      prop="sex"
      label="性别"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="kecheng"
      label="所选课程"
      width="200">
    </el-table-column>

    <el-table-column
      prop="keshi"
      label="购买总课时"
      width="200">
    </el-table-column>

    <el-table-column
      prop="skeshi"
      label="剩余课时"
      width="200">
    </el-table-column>

  </el-table>
          </div>

        
          <div class="block" style="float: right; margin-top: 40px; margin-right:150px;">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
              </el-pagination>f
          </div>
         
          

         
  
          <el-dialog title="插班排课" :visible.sync="outerVisible">
            <el-dialog
              width="30%"
              title="一对一排课"
              :visible.sync="innerVisible"
              append-to-body>
               选择课程：<br><select class="ee">
                          <option class="op1">课程</option>
                          <option>课程</option>
                          <option>课程</option>
                          <option>课程</option>
                          <option>课程</option>
                        </select><br><br>

                        <span>主讲老师</span> &nbsp; 
                        <a href="#" style="color:aqua;">添加助教</a> &nbsp; &nbsp; &nbsp;
                        <span>教室</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <span>单节课扣学员学时</span>
                        <br>

                         &nbsp; &nbsp; &nbsp;<select class="rr">
                          <option class="op1">课程</option>
                          <option>课程</option>
                          <option>课程</option>
                          <option>课程</option>
                          <option>课程</option>
                        </select>
                        
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <select class="rr">
                          <option class="op1">课程</option>
                          <option>课程</option>
                          <option>课程</option>
                          <option>课程</option>
                          <option>课程</option>
                        </select>

                        &nbsp; &nbsp; <input type="text" name="" value="">
                        <br><br>

                        <a href="#" style="color:aqua;">单次排课</a> &nbsp; &nbsp; &nbsp;
                        <a href="#">批量排课</a><br><br>

                        <span>开课日期</span><br>
                        <input type="date" value=""><br><br>

                        <span>上课时间</span><br>
                        <input type="date" value="">-<input type="date" value="">&nbsp; &nbsp;<button>＋</button><br><br>


              <el-button @click="outerVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">保存</el-button>
            </el-dialog>
           
          <input type="text" name="#" placeholder="请输入关键字">
          <input type="submit" value="搜索"><br><br>
          <table class="qq">
                <tr style="background-color: #dfe3ec;">
                    <td>班级名称</td>
                    <td>课程</td>
                    <td>老师</td>
                    <td>人数</td>
                    <td>计划课时</td>
                    <td>已排课时</td>
                    <td>已上课时</td>
                    <td style="color:black;">操作</td>
                </tr>

                <tr>
                    <td><input type="radio" />架子鼓基础班2101</td>
                    <td>架子鼓课</td>
                    <td></td>
                    <td>0人</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>课表</td>
                </tr>

                <tr>
                    <td><input type="radio" />钢琴基础班2</td>
                    <td>舞蹈课</td>
                    <td></td>
                    <td>0人</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>课表</td>
                </tr>
          </table>
            <div slot="footer" class="dialog-footer">
              
              <el-button @click="outerVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">保存</el-button>
              <el-button type="primary" @click="innerVisible = true">一对一排课</el-button>
            </div>
          </el-dialog>

</div>




</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          name: '☺ 李宗霖',
          sex: '女',
          kecheng: '',
          keshi:'0',
          skeshi:'0'
        },{
          name: '☺ 米儿',
          sex: '女',
          kecheng: '',
          keshi:'0',
          skeshi:'0'
        },{
          name: '☺ Jason',
          sex: '女',
          kecheng: '',
          keshi:'0',
          skeshi:'0'
        },{
          name: '☺ 傅以禧',
          sex: '女',
          kecheng: '',
          keshi:'0',
          skeshi:'0'
        },{
          name: '☺ 李睿',
          sex: '女',
          kecheng: '',
          keshi:'0',
          skeshi:'0'
        }],
         dialogVisible: false,
         outerVisible: false,
        innerVisible: false,
        multipleSelection: []
      }
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
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
   
    
  }
</script>

<style>
   .on{
     float: left;
      display: block;
      height: 80px;
      width: 120px;
      background-color: #dfe3ec;
      text-align: center;
     font-size: 19px;
     line-height: 80px;
  
   }
   .ww{
    float: left;
    display: block;
    width: 400px;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #9da5b2;
    border: #dee3e9;
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 40px;
  }

  .up{
    float: left;
    display: block;
    margin-top: 20px;
    background-color: #f5f6fa;
    border: 1px solid #dee3e9;
  }

 table{
   width: 800px;
   height: 300px;
   text-align: center;
   font-weight: bolder;
 }
 .qq tr td:last-of-type{
   color: aqua;
 }

 
.ee{
   width: 170px;
    height: 40px;
}

  
</style>