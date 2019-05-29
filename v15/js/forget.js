window.onload=function(){
	// 忘记密码？-发送验证码
	function sendCode(){
		new Vue({
			el:'#findPassword',
			data:{
				emails:"",
				identifyingCode:"",
			},
			methods:{
				submit(){
					if(this.emails==""&&this.identifyingCode==""){
						alert("请填写完整")
					}else{
						axios.post("http://s.coolndns.com/codes"+"?"+"code="+this.identifyingCode+"&"+"biaoshi="+localStorage.getItem("times")).then(function(res){
							if(res.data.infomtion=="验证成功！"){
								alert("验证成功")
								localStorage.setItem("email",$("#mail").val())
								console.log(localStorage.getItem("email"))
								
								location.href="resetPassword.html"
								
							}else{
								this.identifyingCode=""
								this.emails=""
								alert("验证失败！")
							}
						})
					}
				},
				send(){
					var num=60;
					var lock=false;
					var email = this.emails;
					if(localStorage.getItem("yan")=="邮箱验证完成！"){
						if($("#time").text()=="发送验证码"){
							axios.get("http://s.coolndns.com/ecode"+"?"+"email="+email+"&"+"biaoshi="+localStorage.getItem("times")).then(function(res){
								if(res.data.infomtion=="验证码已发送至邮箱！"){
									alert("验证码已发送至邮箱！请注意查收")
									var clear=setInterval(function(){
										$("#time").text((num--)+"s")
										if(num=="0"){
											clearInterval(clear);
											$("#time").text("发送验证码");
											num=60;
										}
									},1000)
								}else{
									alert("发送失败！")
								}
							})
						}else{	
							alert("操作过于频繁，请"+$("#time").text().substring(0,2)+"秒后在操作")
						}
					}else{
						alert("请输入注册时候的邮箱！")
					}
					
					
				}
			},
			mounted(){
				$("#mail").blur(function(){
					  	if(this.value!=""){
				  			var email = this.value;
							var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
							axios.post("http://s.coolndns.com/email"+"?"+"email="+email+"&"+"biaoshi="+localStorage.getItem("times")).then(function(res){
								if(res.data.information!="邮箱验证完成！"){
									alert("请输入正确的邮箱！")
								}else{
									localStorage.setItem("yan",res.data.information)
								}
							})
							if(!reg.test(email)){
								 alert("邮箱格式错误！")
							}
					  	}
				})
				
			}
		})
	}
	sendCode();
}