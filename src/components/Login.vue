<!--  -->
<template>
 <form id="frlogin" action="">
		<div class="loginbox-title">云教务系统</div>
		<div class="loginbox">
			<div class="loginbox-t">
                <div @click="show(1)" class="login-type" v-bind:class="{c:loginType==1}"> 账号登录</div>
                <div @click="show(2)" class="login-type" v-bind:class="{c:loginType==2}">短信登录</div>
                </div>
                <!--账号登录-->
		   <div v-if="loginType==1">
			<div class="loginbox-c">
				<ul>
					<li><input v-model="username" type="text" id="username" class="txt" placeholder="账号" autocomplete="off"></li>
					<li><input v-model="pass" type="password" id="pass" class="txt" placeholder="密码" autocomplete="off"></li>

				</ul>
			</div>
			<div class="loginbox-b">
				<button type="button" @click="login" id="btnlogin" class="btn">登录</button>
			</div>
            </div>
            <!--短信登录-->
             <div v-else>
            <div class="loginbox-c">
				<ul>
					<li><input type="text" id="username" class="txt" placeholder="手机号"></li>
					<li>
						<input type="password" id="pass" class="txt" placeholder="验证码">
					     <button class="btncode">获取验证码</button>
					</li>

				</ul>
			</div>

			<div class="loginbox-b">
				<button type="submit" id="btnlogin" class="btn">登录</button>
			</div>
             </div>
			 <div class="message">{{messtitle}}</div>
		</div>
	</form>
</template>

<script>
export default {
  data () {
    return {
		loginType:1,
		messtitle:"",
		username:"",
		pass:""
    };
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
	  show(t){
		  this.loginType=t;
	  },
	  login(){
		  let that=this;
		  if(that.username==""){
			  that.messtitle="请输入账号";
		  }
		  else if(that.pass==""){
			    that.messtitle="请输入密码";
		  }
		  else{
			   that.messtitle="";
			   //执行表单提交
		  }
		 
	  }
  }
}

</script>
<style>
body {
	margin: 0px;
	padding: 0px;
	background: #fff;
}
ul,li{list-style: none;}
.message{
	line-height: 30px;color: red;
}
.login-type{
   margin-left: 20px;
    display: inline-block;
	color:#000;
	font-weight: normal;
}
.login-type.c{color:#2198f8;font-weight: bold;}
.btncode{
position: absolute;
    right: 88px;
    top: 10px;
    display: block;
    height: 40px;
    border: none;

}
.loginbox-c ul{padding-left: 0px;}
.top {
	height: 56px;
	width: 100%;
	box-sizing: border-box;
	padding-top: 12px;
	padding-left: 30px;
	border-bottom: solid 1px #dee3e9;
}

.top .logo {
	height: 32px
}

.content {
	top: 56px;
	
	position: absolute;
	width: 100%;
	bottom: 0px;
}

.content .left {
	height: 100%;
	
	width: 83px;
	float: left;
}

.content .left {
	height: 100%;

	width: 83px;
	float: left;
	box-sizing: border-box;
	padding-top: 10px;
}

.content .left .l-menu a {
	display: block;

	width: 72px;
	height: 62px;
	margin: 0px auto;
	margin-top: 15px;
	box-sizing: border-box;
	padding-top: 38px;
	text-align: center;
	border-radius: 5px;
	color: #505e7a;
	font-size: 12px;
}

.content .left .l-menu a.on, .content .left .l-menu a:hover {
	display: block;
	color: #4281fc;
}

.content .left .l-menu .kcgl {
	background-color: #fff;
	background-position: 16px -85px;
	color: #505e7a;
}

.content .left .l-menu .kcgl.on, .content .left .l-menu .kcgl:hover {
	background-color: #e8ebf0;
	background-position: 16px 8px;
	color: #4080fc;
}

.content .left .l-menu .bjgl {
	background-color: #fff;
	background-position: 16px -269px;
	color: #505e7a;
}

.content .left .l-menu .bjgl.on, .content .left .l-menu .bjgl:hover {
	background-color: #e8ebf0;
	background-position: 16px -169px;
	color: #4080fc;
}

.content .left .l-menu .kqgl {
	background-color: #fff;
	background-position: 16px -465px;
	color: #505e7a;
}

.content .left .l-menu .kqgl.on, .content .left .l-menu .kqgl:hover {
	background-color: #e8ebf0;
	background-position: 16px -371px;
	color: #4080fc;
}

.content .left .l-menu .kshz {
	background-color: #fff;
	background-position: -120px -84px;
	color: #505e7a;
}

.content .left .l-menu .kshz.on, .content .left .l-menu .kshz:hover {
	background-color: #e8ebf0;
	background-position: -120px 10px;
	color: #4080fc;
}

.content .left .l-menu .znpk {
	background-color: #fff;
	background-position: -120px -272px;
	color: #505e7a;
}

.content .left .l-menu .znpk.on, .content .left .l-menu .znpk:hover {
	background-color: #e8ebf0;
	background-position: -120px -171px;
	color: #4080fc;
}

.content .left .l-menu .xygl {
	background-color: #fff;
	background-position: -64px -705px;
	color: #505e7a;
}

.content .left .l-menu .xygl.on, .content .left .l-menu .xygl:hover {
	background-color: #e8ebf0;
	background-position: 21px -705px;
	color: #4080fc;
}

.content .right {
	height: 100%;
	/* background:url(../images/left-top-bg.jpg) repeat-x; */
	margin-left: 83px;
	position: relative;
}

.right-title {
	width: 100%;
	height: 52px;
	background-color: #f5f6fa;
	border-bottom: solid 1px #dee3e9;
	border-left: solid 1px #dee3e9;
	box-sizing: border-box;
	padding-top: 10px;
	padding-left: 10px;
}

.btn-delete {
	display: block;
	width: 72px;
	height: 30px;
	border: solid 1px #c8ccd5;
	float: left;
	margin-left: 10px;
	box-sizing: border-box;
	padding-left: 30px;
	line-height: 28px;
	margin-top: 1px;
	background-position: -145px -377px;
	color: #9fa4aa;
	border-radius: 2px;
	cursor: pointer;
}

.btn-add-st {
	display: block;
	width: 100px;
	height: 30px;
	border: solid 1px #c8ccd5;
	 
	float: left;
	margin-left: 10px;
	box-sizing: border-box;
	padding-left: 30px;
	line-height: 28px;
	margin-top: 1px;
	background-position: -145px -785px;
	color: #9fa4aa;
	border-radius: 2px;
	cursor: pointer;
}

.btn-delete:hover, .btn-add:hover, .btn-add-st:hover {
	background-color: #f5f6f9;
}

.btn-add {
	display: block;
	margin-top: 1px;
	width: 100px;
	height: 30px;
	border: solid 1px #c8ccd5;
 
	float: left;
	margin-left: 10px;
	box-sizing: border-box;
	padding-left: 32px;
	line-height: 28px;
	background-position: -145px -462px;
	color: #9fa4aa;
	border-radius: 2px;
	cursor: pointer;
}

.key {
	display: block;
	width: auto;
	height: 30px;
	border: solid 1px #dee3e9;
	background: #fff;
	float: left;
	margin-left: 10px;
	box-sizing: border-box;
	padding-left: 5px;
	line-height: 30px;
	background-position: -145px -462px;
	color: #9fa4aa;
	border-radius: 2px;
}

.mappath-txt {
	display: block;
	width: auto;
	height: 40px;
	border: solid 0px #dee3e9;
	float: left;
	margin-left: 10px;
	box-sizing: border-box;
	padding-left: 5px;
	line-height: 40px;
	color: #333;
}

.cat, .fbox-c span.cat {
	display: block;
	width: auto;
	height: 28px;
	border: solid 0px #dee3e9;
	 
	float: left;
	padding-left: 15px;
	padding-right: 28px;
	line-height: 28px;
	color: #9fa4aa;
	border-radius: 6px;
	position: relative;
	margin-right: 5px;
	cursor: pointer;
	text-align: left;
}

#divstudentslist {
	padding-top: 10px;
}

.stuitem {
	width: 300px;
	height: 38px;
	margin-top: 0px;
	position: relative;
	border-bottom: 1px solid #f0f0f0;
	padding: 3px;
}

.stuitem2:hover {
	background: #f2f3f5;
}

.stuitem:last-child {
	border-bottom: 0px solid #f0f0f0;
}

.stuitem .stu-view {
	height: 32px;
	position: absolute;
	right: 0;
	top: 4px;
 
	width: 32px;
	z-index: 2;
	display: none;
	cursor: pointer;
}

#divstudentslist .stuitem:hover .stu-view {
	display: block;
	cursor: pointer;
}
 
#divcheckstudentslist .stuitem:hover .stu-delete {
	display: block;
	cursor: pointer;
}

.stuname {
	width: 200px;
	height: 38px;
	display: block;
	float: left;
	color: #333;
}

.stuphoto {
	width: 38px;
	height: 38px;
	display: block;
	float: left;
	margin-right: 10px;
}

.stuphoto img {
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 50%;
}

.stu-xz {
	border: solid 0px #fff;
	height: 36px;
	width: 36px;
	line-height: 36px;
	 
	background-position: -137px -582px;
	cursor: pointer;
	display: block;
	vertical-align: middle;
	float: left;
}

.stu-xz.on {
	border: solid 0px #fff;
	height: 36px;
	width: 36px;
	line-height: 36px;
 
	background-position: -137px -638px;
	cursor: pointer;
	display: block;
	vertical-align: middle;
	float: left;
}

#divcheckstudentslist .stu-xz {
	display: none;
}

#divcheckstudentslist .stuphoto {
	margin-left: 5px;
}

#divcheckstudentslist .stuitem {
	margin-left: 15px;
}

#studentsselected .stuitem {
	width: 150px;
	height: 38px;
	margin-top: 0px;
	position: relative;
	border-bottom: 0px solid #f0f0f0;
	padding: 3px;
	float: left;
	margin-right: 10px;
	border-radius: 10px;
}

#studentsselected .stuitem:hover {
	background: #f2f3f5;
}

#studentsselected .stuname {
	width: auto;
	height: 38px;
	display: block;
	float: left;
	color: #333;
}

#studentsselected .stu-xz {
	display: none;
}

#studentsselected .stuitem .stu-view {
	display: none;
}

#studentsselected .stuitem .stu-delete {
	height: 32px;
	position: absolute;
	right: 0;
	top: 4px;
 
	width: 32px;
	z-index: 2;
	display: none;
	cursor: pointer;
}

#studentsselected .stuitem:hover .stu-delete {
	display: block;
	cursor: pointer;
}

.input {
	margin-right: 10px;
	line-height: 28px;
	height: 28px;
	border: solid 0px #dee3e9;
	width: 200px;
	display: block;
	float: left;
	padding-left: 5px;
	color: #9fa4aa;
}

input::-webkit-input-placeholder {
	color: #9fa4aa;
}

.key .span {
	line-height: 28px;
	height: 28px;
	border: solid 0px #dee3e9;
	width: 20px;
	display: block;
	float: left;
	color: #9fa4aa;
	text-align: center;
}

.sobtn, .key button {
	margin-right: 2px;
	border: solid 0px #fff;
	height: 30px;
	width: 40px;
 
	background-position: -92px -437px;
	cursor: pointer;
	display: block;
	float: left;
}

.list {
	margin: 20px;
}

.tab {
	width: 100%;
}

.tab th {
	background: #f5f6fa;
	height: 45px;
	text-align: center;
	font-weight: normal
}

.tab td {
	border-bottom: 1px solid #eff2f7;
	height: 48px;
	box-sizing: border-box;
	text-align: center;
}

.tab tr {
	background: #fff;
	border-radius: 26px;
}

.tab tr:hover {
	background: #f2f3f5;
	border-radius: 26px;
}

.tab tr.editstate {
	background: #f2f3f5;
	border-radius: 26px;
}

.ico-bj {
	border: solid 0px #fff;
	height: 46px;
	width: auto;
	line-height: 46px;
 
	background-position: -80px -326px;
	cursor: pointer;
	display: inline-block;
	padding-left: 32px;
}

.ico-kc {
	border: solid 0px #fff;
	height: 46px;
	width: auto;
	line-height: 46px;
 
	background-position: -80px -223px;
	cursor: pointer;
	display: inline-block;
	padding-left: 32px;
}

.ico-tx {
	border: solid 0px #fff;
	height: 46px;
	width: auto;
	line-height: 46px;
 
	background-position: -2px -625px;
	cursor: pointer;
	display: inline-block;
	padding-left: 32px;
}

.ico-xz, .ico-xz-all {
	border: solid 0px #fff;
	height: 46px;
	width: auto;
	line-height: 46px;
	 
	background-position: -137px -579px;
	cursor: pointer;
	display: inline-block;
	padding-left: 30px;
	vertical-align: middle;
}

.ico-xz.on, .ico-xz-all.on {
	border: solid 0px #fff;
	height: 46px;
	width: auto;
	line-height: 46px;
	 
	background-position: -137px -634px;
	cursor: pointer;
	display: inline-block;
	padding-left: 30px;
}
.ico-radio,.fbox-c .ico-radio{
	border: solid 0px #fff;
	height: 46px;
	width: auto;
	line-height: 46px;
	 
	cursor: pointer;
	display: inline-block;
	padding-left: 30px;
	vertical-align: middle;
	    background-position: -0px -955px;
    padding-left: 25px;
     text-align: left;
    box-sizing: content-box;
}
.ico-radio.on,.fbox-c .ico-radio.on {
	background-position: -0px -1005px;
	padding-left: 25px;
	color:#4281fc;
}

.form_input .ico-xz.on {
	background-position: -0px -815px;
	padding-left: 26px;
}

.form_input .ico-xz {
	background-position: -0px -773px;
	padding-left: 26px;
	padding-right: 20px;
}

.tab td.textleft, .tab th.textleft {
	text-align: left;
	padding-left: 15px;
}

.loginbox-title {
	width: 620px;
	height: 80px;
	line-height: 50px;
	color: #4d4d4d;
	margin: 50px auto 0px auto;
	text-align: center;
	font-size: 36px;
}

.loginbox {
	width: 450px;
	height: 400px;
	background: #fff;
	margin: 10px auto;
	border-radius: 6px;
	-moz-border-radius: 6px;
	-webkit-border-radius: 6px;
	box-shadow: 0 2px 10px #999999;
	-moz-box-shadow: #999999 0 2px 10px;
	-webkit-box-shadow: #999999 0 2px 10px;
}

.loginbox-t {
	width: 100%;
	height: 70px;
	line-height: 50px;
	color: #2198f8;
	text-align: center;
	font-size: 28px;
	margin-top: 0px;
	padding-top: 40px;
}

.loginbox-c {
	width: 100%;
	height: auto;
	line-height: 50px;
	color: #2198f8;
	text-align: center;
	font-size: 28px;
}

.loginbox-c li {
	height: auto;
	margin-bottom: 15px;
	position: relative;
}

.loginbox-c .txt {
	width: 280px;
	height: 44px;
	line-height: 44px;
	border: solid 1px #d8d8d8;
	border-radius: 3px;
	font-size: 16px;
	box-sizing: border-box;
	padding-left: 5px;
}

.loginbox-b {
	width: 100%;
	height: 50px;
	line-height: 50px;
	color: #2198f8;
	text-align: center;
	font-size: 28px;
}

.loginbox-b .btn {
	width: 280px;
	height: 44px;
	line-height: 30px;
	background: #4285f4;
	text-align: center;
	color: #fff;
	border-radius: 3px;
	font-size: 14px;
	border: solid 0px #fff;
}

.fbox {
	position: absolute;
	width: 620px;
	height: 410px;
	background: #fff;
	margin: 0 auto;
	left: 50%;
	margin-left: -350px;
	top: 50%;
	z-index: 9013;
	display: none;
	margin-top: -200px;
	border-radius: 4px;
	-moz-border-radius: 4px;
	-webkit-border-radius: 4px;
	box-shadow: 0 2px 10px #999;
	-moz-box-shadow: #999 0 2px 10px;
	-webkit-box-shadow: #999 0 2px 10px;
}
#kebiaowindow {
    width:1000px;
    height: 540px;
    left: 50%;
    margin-left: -500px;
    top: 6px;
    z-index: 9013;
    margin-top: 0px;
}
.div-close, .div-time-close {
	display: block;
	position: absolute;
	right: 5px;
	top: 5px;
	 
	width: 20px;
	height: 20px;
	z-index: 999;
	cursor: pointer;
	text-indent: -99999px;
	background-position: -76px -47px;
	border-radius: 2px;
}

.div-close:hover, .div-time-close:hover {
	background-color: #b3c0d8;
}

.fbox-c {
	width: 100%;
	height: auto;
	border-top: 0px solid #e9e9e9;
	box-sizing: border-box;
	padding: 30px;
	padding-top: 10px;
}

.fbox-c.fbox-kc {
	padding: 10px 0px;
}

.fbox-c li {
	margin-top: 15px;
}

.fbox-c input {
	width: 300px;
	height: 32px;
	line-height: 32px;
	margin-right: 10px;
	border: solid 1px #dee3e9;
	padding-left: 5px;
	box-sizing: border-box;
	border-radius: 3px;
}

.fbox-c .input-time {
	width: 60px;
	height: 34px;
	line-height: 34px;
	margin-right: 2px;
	border: solid 1px #dee3e9;
	padding-left: 5px;
	box-sizing: border-box;
	border-radius: 5px;
}

.fbox-c textarea {
	width: 300px;
	height: 50px;
	line-line-height: 30px;
	margin-right: 10px;
	border: solid 1px #dee3e9;
	padding: 5px;
	box-sizing: border-box;
	border-radius: 3px;
}

.fbox-c select {
	width: auto;
	height: 32px;
	line-height: 32px;
	margin-right: 10px;
	border: solid 1px #dee3e9;
	border-radius: 3px;
}

.fbox-c span {
	display: inline-block;
	width: 100px;
	text-align: right;
	padding-right: 10px;
}

.fbox-t {
	width: 100%;
	height: 30px;
	box-sizing: border-box;
	padding-top: 5px;
	padding-left: 10px;
	font-size: 14px;
	background-color: #f5f6fa;
	border-radius: 5px 5px 0px 0px;
}

.fbox-b {
	width: 100%;
	height: 50px;
	border-top: 1px solid #e9e9e9;
	box-sizing: border-box;
	padding-top: 8px;
	position: absolute;
	bottom: 0px;
	left: 0px;
}

.a-add {
	display: inline-block;
	width: 30px;
	height: 30px;
	border: 1px solid #dcdfe6;
	border-radius: 3px;
	cursor: pointer;
	overflow: hidden;
	margin-left: 5px;
	vertical-align: middle;
}

.fbox-b .btn {
	display: block;
	width: 120px;
	height: 32px;
	line-height: 30px;
	background: #4285f4;
	text-align: center;
	color: #fff;
	border-radius: 3px;
	font-size: 14px;
	margin-right: 20px;
	border: solid 0px #fff;
	cursor: pointer;
}
.fbox-b .btn.disabled {
	background: #ccc;
	cursor:default;
}
.fr {
	float: right;
}
.ie {
	_position: absolute;
	_clear: both;
	_top: expression(eval(document.compatMode && document.compatMode ==
		'CSS1Compat')? documentElement.scrollTop+(documentElement.clientHeight-this.clientHeight)-
		 1: document.body.scrollTop+(document.body.clientHeight-this.clientHeight)-
		 1);
}

.window-mask, .window-time-mask {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: #ccc;
	z-index: 9012;
	/*閺�顖涘瘮rgba閻ㄥ嫭绁荤憴鍫濇珤*/
	background: rgba(0, 0, 0, 0.02);
	/* older safari/Chrome browsers */
	 
	/* IE 4-9 */
	filter: alpha(opacity = 50);
	/*This works in IE 8 & 9 too*/
	-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
	/*IE4-IE9*/
	filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=10);
	display: none;
}

.window-time-mask {
	z-index: 9015;
}

.classname {
	display: block;
	 
	width: 110px;
	height: 110px;
	/* 	cursor: pointer; */
	background-position: 31px -525px;
	float: left;
	margin-right: 10px;
	box-sizing: border-box;
	padding-top: 62px;
	text-align: center;
	font-size: 14px;
	line-height: 16px;
	overflow: hidden;
	color: #333;
	border: solid #fff 1px;
	border-radius: 3px;
}

.classname:hover {
	display: block;
	background-color: #eaf5ff;
	border: solid #d5eaff 1px;
	border-radius: 3px;
}

.mappath {
	border-bottom: solid 1px #e0e4ed;
	margin: 0px 0px 0px 0px;
	height: 28px;
	padding: 0px;
	width: 100%;
}

.mappath a {
	display: block;
	width: auto;
	float: left;
	line-height: 28px;
	padding-right: 20px;
	padding-left: 10px;
	color: #333;
}

.mappath .item {
	width: auto;
	float: left;
	line-height: 28px;
 
	border-left: solid 1px #fff;
}

.mappath .item-40 {
	width: auto;
	float: left;
	line-height: 40px;
 
	border-left: solid 1px #dee3e9;
	padding-right: 25px;
	padding-left: 15px;
}

.mappath .item-40:hover {
	background-color: #f5f6fa;
}

.mappath .item:hover {
	background-color: #f5f6f9;
	border-left: solid 1px #c8ccd5;
}

.mappath .citem {
	width: auto;
	float: left;
	line-height: 28px;
	 
}

.mappath .citem-40 {
	width: auto;
	float: left;
	line-height: 40px;
 
	padding-right: 25px;
	padding-left: 15px;
	margin-right: 20px;
}

.mappath .itemback {
	width: 40px;
	float: left;
	line-height: 28px;
	padding-right: 0px;
	padding-left: 0px;
 
	background-position: -144px -539px;
	text-indent: -999px;
	border-left: solid 1px #dee3e9;
	border-right: solid 1px #fff;
}

.mappath .itemback:hover {
	background-color: #f5f6f9;
	border-left: solid 1px #dee3e9;
	border-right: solid 1px #c8ccd5;
}

.flex-item {
	border-bottom: 1px solid #1890ff;
	padding-left: 10px;
	margin: 0px 30px;
}

.tab-item {
	display: inline-block;
	padding-bottom: 5px;
	margin-right: 18px;
	cursor: pointer;
	color: #7e8b9c;
	font-size: 14px;
	padding: 5px;
	margin-left: 0px;
	padding-left: 15px;
	padding-right: 15px;
}
/* .tab-item:first-child {
    display:inline-block;
    padding-bottom:5px;
    margin-right: 0px;
    font-size: 14px;
	padding: 0px;
	  margin-left: 0px;
	  width:10px;
} */
.tab-item.tab-item-active {
	border: 1px solid #1890ff;
	color: #1890ff;
	border-bottom: none;
	position: relative;
}

.tab-item.tab-item-active:after {
	content: '';
	position: absolute;
	bottom: -2px;
	height: 4px;
	left: 0px;
	right: 0px;
	width: 100%;
	background-color: #fff;
	z-index: 999;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	visibility: visible;
}

.edit-td {
	position: relative;
}

.edit-a {
	position: absolute;
	top: 2px;
	height: 46px;
	right: 0px;
	width: auto;
	z-index: 999;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	visibility: hidden;
}

.edit-tr:hover .edit-a {
	visibility: visible
}

.edit-a a {
	display: block;
	height: 46px;
	line-height: 46px;
	float: left;
	margin-left: 10px;
	padding-right: 3px;
	padding-left: 3px;
	color: #007FFF;
	font-size: 14px;
	font-family: "microsoft yahei";
}

.datalist {
	margin: 0px auto;
	height: 296px;
	overflow-y: auto;
}

.tab-body {
	display: none;
}

.tab-body:first-child {
	display: block;
}

.tab-body-content::-webkit-scrollbar, .datalist::-webkit-scrollbar,
	.select-dropdown::-webkit-scrollbar { /*婊氬姩鏉℃暣浣撴牱寮�*/
	width: 8px; /*楂樺鍒嗗埆瀵瑰簲妯珫婊氬姩鏉＄殑灏哄*/
	height: 1px;
}

.tab-body-content::-webkit-scrollbar-thumb, .datalist::-webkit-scrollbar-thumb,
	.select-dropdown::-webkit-scrollbar-thumb { /*婊氬姩鏉￠噷闈㈠皬鏂瑰潡*/
	border-radius: 8px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #cbcbcb;
}

.tab-body-content::-webkit-scrollbar-track, .datalist::-webkit-scrollbar-track,
	.select-dropdown::-webkit-scrollbar-track { /*婊氬姩鏉￠噷闈㈣建閬�*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	background: #fff;
}

.inner-part {
	margin: 15px 20px 20px 20px;
	box-shadow: 0 2px 16px 0 hsla(0, 0%, 40%, .06);
	padding: 15px 20px 2px;
	position: relative;
}
.divedit,.divcancel{
	 
	position: absolute;
	top:10px;
	height:35px;
	right:10px;
	width:30px;cursor: pointer;
	text-align:center;
	display:none;
}
.divcancel{
	color: #4281fc;
}
.inner-part:hover .divedit{
	display:block;
}

.inner-part #edittimetip{
		display: none;padding-left:70px
}
.inner-part #edittime{
		display: none;
}
.inner-part #csstarttime{
			display:inline-block;
}
.inner-part #editinfo{
	display: none;
}
.inner-part #showinfo{
	display: block;
}

.inner-part.edit #edittimetip{
		display:inline-block;padding-left:115px
}
.inner-part.edit #edittime{
		display:inline-block;
}
.inner-part.edit #csstarttime{
			display:none;
}
.inner-part.edit #editinfo{
	display: block;
}
.inner-part.edit #showinfo{
	display:none;
}

#course-tab-item{display:none;}
#class-part{display:none;}

.addcourse #course-tab-item{display: block;}
.addcourse #class-part{display: block;}
.addcourse .inner-part #editinfo{
	display: block;
}
.addcourse .inner-part #showinfo{
	display:none;
}
.addcourse .inner-part #edittimetip{
		display:inline-block;padding-left:0px;
}
.addcourse .inner-part #edittime{
		display:inline-block;
}
.addcourse .inner-part #csstarttime{
			display:none;
}
.time-part-title{
	font-weight: 700;
}
.addcourse .time-part-title{
	font-weight:normal;
}

.inner-part.edit .divcancel{
	display: block;
}
.inner-part.edit:hover .divedit{
	display:none;
}
.addcourse .inner-part:hover .divedit{
			display:none;
}

.addcourse .inner-part-title {
    display: block;
    font-size: 14px;
    font-weight:normal;
    line-height: normal;
    margin-bottom: 8px;
}
.addcourse .inner-part-title.jbxx{
	display:none;
}
#fbox-t-1{
	display: block;
}
#fbox-t-2{
	display:none
}
.addcourse #fbox-t-1{
	display:none;
}
.addcourse #fbox-t-2{
	display: block;
}
.addcourse #cscoursedatepart{
	display:none;
}
.addcourse .inner-part {
    margin: 15px 20px 10px 20px;
    box-shadow: 0 2px 16px 0 hsla(0, 0%, 40%, .06);
    padding: 10px 20px 2px 15px;
    position: relative;
}
.fbox-b #btnaddcourse.btn,.addcourse .fbox-b #btnupdate.btn,.addcourse .fbox-b #btncancelpk.btn{
	display:none;
}
.addcourse .fbox-b #btnaddcourse.btn{
display: block;
}
.tipred11{
	display:none;
}
.edit .tipred,.addcourse .tipred,.tab-body .tipred{
	display: inline-block;
}

#cshowwindow .tab-body-content{
	height:400px;
}
#cshowwindow.addcourse .tab-body-content{
	height:448px;
}
.divedit img{
	
	height:20px;
	width:20px;
}
.inner-part-title {
	display: block;
	font-size: 14px;
	font-weight: 700;
	line-height: normal;
	margin-bottom: 8px;
}

.el-form-item {
	display: inline-block;
	margin-right: 20px;
	vertical-align: top;
	margin-bottom: 15px;
}

.qiandao-add {
	cursor: pointer;
}

.label-btn {
	color: #1890ff;
	cursor: pointer;
}

.form_input {
	width: 170px;
}

.fbox-c .el-input input, .fbox-c .el-select input {
	width: 100%;
	height: 34px;
	line-height: 34px;
	margin-right: 10px;
	border: solid 1px #dee3e9;
	padding-left: 5px;
	box-sizing: border-box;
	border-radius: 3px;
}

.fbox-c .el-input select, .fbox-c .el-select select {
	width: 100%;
	height: 34px;
	margin-right: 10px;
	border: solid 1px #dee3e9;
	box-sizing: border-box;
	border-radius: 3px;
}

.el-form-item__label {
	display: block;
	height: 30px;
	font-size: 14px;
	line-height: 30px;
}

.el-select {
	width: 150px;
	display: block;
	position: relative;
	float: left;
}

.btnadd {
	display: block;
	float: left;
	width: 30px;
	height: 30px;
	border: 1px solid #dcdfe6;
	border-radius: 3px;
	cursor: pointer;
	overflow: hidden;
	margin-left: 5px;
}

.btn-add-img {
	width: 15px;
	height: 15px;
	display: block;
	margin: 8px auto 0px auto;
	overflow: hidden;
	vertical-align: middle;
}

.el-input-small {
	width: 100px;
	margin-left: 5px;
}

.el-input-small-80 {
	width: 100px;
	margin-left: 5px;
}

.classendtime {
	width: 100%;
	height: 34px;
	line-height: 34px;
	margin-right: 10px;
	border: solid 1px #dee3e9;
	padding-left: 5px;
	box-sizing: border-box;
	border-radius: 3px;
	color: #999999;
	font-size: 14px;
}

.el-input-small:first-child {
	margin-left: 0px;
}

.divweek.hide {
	display: none;
}

.office-time-item, .fbox-c li.office-time-item {
	width: 45px;
	height: 45px;
	border: 1px solid #ddd;
	border-radius: 6px;
	text-align: center;
	line-height: 45px;
	color: #010101;
	font-size: 14px;
	margin-bottom: 10px;
	margin-right: 10px;
	cursor: pointer;
	float: left;
	display: block;
	margin-top: 0px;
}

.office-time-item:hover, .fbox-c li.office-time-item:hover, .fbox-c li.office-time-item.checked
	{
	width: 45px;
	height: 45px;
	border: 1px solid #1890ff;
	background-color: #1890ff;
	border-radius: 6px;
	text-align: center;
	line-height: 45px;
	color: #fff;
	font-size: 14px;
	margin-bottom: 10px;
	margin-right: 10px;
	cursor: pointer;
	float: left;
	display: block;
}

.office-time h4 {
	font-size: 16px;
	color: #010101;
	margin-bottom: 10px;
	margin-top: 10px;
	font-weight: bold;
}

.office-time .btn {
	display: inline-block;
	width: 80px;
	height: 34px;
	line-height: 34px;
	background: #4285f4;
	text-align: center;
	color: #fff;
	border-radius: 3px;
	font-size: 14px;
	margin-left: 5px;
	border: solid 0px #fff;
}

.course-tab, .course-tab tr th, .course-tab tr td {
	border: 1px solid #e5e5e5;
	border-right: 0px solid #e5e5e5;
	border-left: 0px solid #e5e5e5;
}

.course-tab {
	min-height: 25px;
	text-align: center;
	border-collapse: collapse;
	margin-left: 0px;
	margin-top: 20px;
	width: 100%;
}

.course-tab td {
	text-align: left;
	padding: 10px;
	height: 80px;
	padding-top: 0px;
	padding-bottom: 0px;
	box-sizing: border-box;
	position: relative;
}

.course-tab th {
	height: 40px;
	padding: 10px;
	box-sizing: border-box;
}

.course-tab .bg {
	background: #f3f3f3;
	position: relative;
}

.course-tab .cal-cell {
	width: auto;
	display: inline-block;
	margin-right: 10px;
}

.cal-item {
	margin: 15px 0;
	padding: 20px 25px;
	border-radius: 6px;
	border: 1px solid #e5e5e5;
	border-left: 6px solid #1890ff;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.cal-item:hover {
	background: #fff;
}

.flex-items {
	display: -ms-inline-flexbox;
	display: inline-flex;
	-ms-flex-align: center;
	align-items: center;
	margin-right: 10px;
}

.over-label {
	font-weight: 400;
	margin-bottom: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #4c5e75;
	font-size: 14px;
	display: inline-block;
	margin: 0;
}

.cal-type-img {
	height: 16px;
	margin-left: 10px;
	vertical-align: middle;
}

.label-grey {
	color: #7e8b9c;
}

.flex-part {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.inner-title {
	font-size: 16px;
	color: #2f374f;
}

.slot, .slot-square {
	display: inline-block;
	border: 0;
}

.slot {
	width: 4px;
	height: 10px;
	margin-left: 30px;
	margin-right: 10px;
	border-radius: 0;
}

.purple-slot {
	background-color: #6d60f6;
}

.green-slot {
	background-color: #1890ff;
}

.el-txt {
	-webkit-appearance: none;
	background-color: #fff;
	background-image: none;
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	color: #606266;
	display: inline-block;
	font-size: inherit;
	height: 40px;
	line-height: 40px;
	outline: 0;
	padding: 0 15px;
	-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
	transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
	width: 100%;
}

.corusetype {
	background: #c7ebdf;
	width: 40px;
	text-align: center;
	font-size: 10px;
	color: #2ecc71;
	display: inline-block;
	font-weight: normal;
	margin-left: 10px;
}

.datalist a {
	color: #007FFF;
	font-size: 14px;
	font-family: "microsoft yahei";
}
 

 

.cmonth {
	float: left;
	height: 29px;
	line-height: 29px;
	width: 90px;
	text-align: center;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	margin-right: 10px;
	margin-left: 10px;
	color: #333;
	cursor: pointer;
	position: relative;
}

 
.pkcounts {
	float: right;
	height: 29px;
	line-height: 29px;
	width: auto;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding-right: 20px;
	color: #333;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.pkcounts label {
	display: inline-block;
	margin-right: 20px;
}

.button_inner {
	display: block;
	float: right;
	position: relative;
	outline: 0;
	white-space: nowrap;
	border: 1px solid #dcdfe6;
	font-weight: 500;
	-webkit-appearance: none;
	text-align: center;
	box-sizing: border-box;
	margin: 0;
	padding: 5px 15px;
	font-size: 12px;
	cursor: pointer;
	color: #c0c4cc;
}

.button_inner.day {
	border-radius: 0 4px 4px 0;
	border-left: 0;
}

.button_inner.month {
	border-left: 1px solid #dcdfe6;
	border-radius: 4px 0 0 4px;
	-webkit-box-shadow: none !important;
	box-shadow: none !important;
}

.monthchecked {
	background-color: #f2f6fc;
	color: #c0c4cc;
}
 

.moreyear:hover {
	width: 30px;
	height: 30px;
	float: right;
	background-color: #eeeeee;
	border-radius: 15px;
}

.monthcounts {
	height: 60px;
	line-height: 60px;
	margin-bottom: 30px;
}

.monthcounts .red {
	font-weight: bold;
	color: red;
}

#pkwindow {
	width: 920px;
	height: 540px;
	left: 50%;
	margin-left: -460px;
	top: 6px;
	z-index: 9013;
	margin-top: 0px;
}

#pkwindow .fbox-c {
	width: 100%;
	height: 455px;
}

.fbox.fbox920-540 {
	width: 920px;
	height: 540px;
	left: 50%;
	margin-left: -460px;
	top: 6px;
	z-index: 9013;
	margin-top: 0px;
}

.fbox.fbox920-540 .fbox-c {
	width: 100%;
	height: 455px;
}

#timewindow {
	width: 660px;
	left: 50%;
	margin-left: -330px;
	z-index: 9015;
}
.loadcoursedata{
	position: absolute;
	top:30px;bottom:0px;
	 right: 0px;left:0px;
	z-index: 999;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
 background-color: #fff;
 border-radius: 4px;
 display:none;
 
}
.loadcoursedata img{
	display:block;
	margin:190px auto;
}
.loaddeletedata{
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.01);
	
	top:0px;bottom:0px;
	 right: 0px;left:0px;
	z-index: 999;
 
 display:none;
}
.loaddeletedata img{
	display:block;
	margin:190px auto;
	
	    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
  
}

.course-tab tr:hover .cal-add {
	display:block;

	}
</style>