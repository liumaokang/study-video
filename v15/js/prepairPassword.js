window.onload=function(){
	var root=new Vue({
		el:'#findPassword',
		data:{
			oldpassword:"",
			newpassword:"",
			password:""	
		},
		methods:{
			submit(){
				var lpassword=this.password.length;
				var lnewpassword=this.newpassword.length;
				if(this.password!=""&&this.newpassword!=""&&this.oldpassword!=""){
					var a=(lpassword>=6&&lpassword<=21&&lnewpassword>=6&&lnewpassword<=21);
					var b=(this.password==this.newpassword);
					if(a==false){
						alert("请输入6-21位字符！")
					}else if(b==false){
						alert("两次密码输入不一致！")
					}else if(a==false&&b==false){
						alert("请重新输入密码")
						this.password=""
						this.newpassword=""
						// this.oldpassword=""
					}else{}
					
					if(a==true&&b==true){
						axios.post("http://s.coolndns.com/newpaw"+"?"+"newpaw="+this.newpassword+"&"+"newpaws="+this.password+"&"+"token="+localStorage.getItem("token")+"&"+"paw="+this.oldpassword,{
						}).then(function(res){
							// console.log(res.data)
							if(res.data.information=="新密码与原密码相同！"){
								alert("修改成功！,请重新登录！")
								localStorage.removeItem('token')
								location.href="login.html"
							}else if(res.data.information=="原密码错误！"){
								alert("原密码错误")
							}				
						})	
					}
					
				}else{
					alert("请完善您的信息！")
				}
				
			}
		},
		mounted(){
			$("#mail").blur(function(){
			  	if(this.value!=""){
		  			var email = this.value;
					var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
					if(!reg.test(email)){
						 alert("邮箱格式错误！")
					}
			  	}
			})
		}
	})
}