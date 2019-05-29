window.onload=function(){
	// 登录/注册功能
	function denglu(){
		new Vue({
			el:".login",
			data:{
				bg:"loginbg",
				bg1:"",
				url:"http://s.coolndns.com",
				isshow:true,
				isfalse:false,
				value1:"",
				radio: '1',
				radio1:"",
				name:"",
				phone:"",
				level:"25级",
				password:"",
				repassword:"",
				num1:"",
				loginpassword:"",
				identifyingCode:"",
				youxiang:"",
				index:1
			},
			methods:{
				logins(){
					this.isfalse=false;
					this.isshow=true;
					this.bg="loginbg";
					this.bg1="";
				},
				zhuce(){
					this.isfalse=true;
					this.isshow=false;
					this.bg1="loginbg";
					this.bg="";
				},
				registered(){
					if(this.radio=="1"){
						this.radio="男"
						this.radio1="1"
					}else{
						this.radio="女"
						this.radio1="2"
					}

					this.radio=this.radio1
					if(this.phone==""&&this.sex==""&&this.birth==""&&this.password==""&&this.repassword==""&&this.name==""&&this.youxiang==""){
						alert("请完善您的信息！")
					}else if(this.index%2!=0){
						alert("请阅读并同意《服务协议》")
					}else{
						this.$http.post(this.url+"/register",{
							name:this.name,
							phone:this.phone,
							sex:this.radio,
							birth:this.value1,
							level:this.level,
							password:this.password,
							repassword:this.repassword,
							email:this.youxiang,
							address:returnCitySN.cname
					    }).then(function(res){
							if(res.body.msg=="此账号已经注册过了！"){
								alert("此账号已经注册过了！")
							}	
							if(res.body.msg=="两次密码不一致！"){
								alert("两次密码不一致！")
							}
							if(res.body.msg=="此邮箱已经注册过了！"){
								alert("此邮箱已经注册过了！")
							}
							 if(this.index%2!=0){
								alert("请勾选是否已阅读用户协议！")
							}
							if(res.body.msg=="请求成功"){
								alert("恭喜您，注册成功！")
								this.isfalse=false;
								this.isshow=true;
								this.bg="loginbg";
								this.bg1="";
							}
					    })
					}
					
				},
				login(){
					this.$http.post(this.url+"/login",{
						phone:this.num1,
						password:this.loginpassword,
						verificationCode:this.identifyingCode,
						biaoshi:localStorage.getItem("times")
					}).then(function(res){
						if(this.num1!=""&&this.loginpassword!=""&&this.identifyingCode!=""){
								console.log(res.body.msg)
		                  		if(res.body.msg=="请求失败"){
		                  			alert("信息错误!请重新填写")
		                  		}
		                  		if(res.body.msg=="请求成功"){
		                  			console.log(localStorage.getItem('parent'))
	                  				alert("登录成功！")
	                  				localStorage.setItem("tishi",res.body.msg)
	                  				localStorage.setItem("token",res.body.data.token)
	                  				localStorage.setItem("user_id",res.body.data.id)
	                  				window.location.href="index.html"
	                  				person()
	                  			}	 	                  			                  		                  		                 		             		
						}else{
							alert("请完善您的信息！")
						}
					})
				},
				change(){
					var times=localStorage.getItem("times");
					this.$http.get(this.url+"/code"+"?"+"biaoshi="+times).then(function(res){
						var code=res.body.code.code.code;
						$(".yanzhengma i").text(code)
					})
				},
				proving(){
					location.href="demo.html"
				},
				checked(){
					this.index++
				},
				person(){
					var PList=$(".sele p")
					for(let i=0;i<PList.length;i++){						
						PList[i].style.display="block"
					}
					
				}
			},
			mounted(){
			    var a=localStorage.getItem("times")
			    if(a){
			    	this.$http.get(this.url+"/code"+"?"+"biaoshi="+a,{
						// biaoshi:times
					}).then(function(res){
							var code=res.body.code.code.code;
							$(".yanzhengma i").text(code)
					})
			    }else{
			    	var num=Math.floor(Math.random()*100);
					var times=new Date().getTime()+num;
					localStorage.setItem("times",times)
					this.$http.get(this.url+"/code"+"?"+"biaoshi="+times,{
						
					}).then(function(res){
							var code=res.body.code.code;
							$(".yanzhengma i").text(code)
					})
			    }
				$("#mail").blur(function(){
				  	var email = this.value;
					var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
					if(!reg.test(email)){
						 $("#mails").html("邮箱格式错误！");
						 $("#mails").css("color","#ff0000");
						 this.value=""
					}else{
						$("#mails").html("正确！")
						$("#mails").css("color","#3dc62f");
					}
				}),
				$("#num").blur(function(){
				  	var tel =this.value;
 	   				if(!(/^1[34578]\d{9}$/.test(tel))){ 
			            $("#nums").html("填写错误！")
			            this.value=""  
			            $("#nums").css("color","#ff0000");
			            this.value=""  
			        }else{
			        	$("#nums").html("正确！")
			        	$("#nums").css("color","#3dc62f");
			        }
				}),
				$("#num1").blur(function(){
				  	var tel =this.value;
 	   				if(!(/^1[34578]\d{9}$/.test(tel))){ 
			            $("#nums1").html("填写错误！")
			            this.value=""  
			            $("#nums1").css("color","#ff0000");
			            this.value=""  
			        }else{
			        	$("#nums1").html("正确！")
			        	$("#nums1").css("color","#3dc62f");
			        }
				})	
				
			}
		})
	}
	denglu();
}