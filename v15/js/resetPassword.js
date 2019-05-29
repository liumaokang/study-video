window.onload=function(){
	var root=new Vue({
		el:'#findPassword',
		data:{
			newpassword:"",
			emails:localStorage.getItem("email"),
			password:""
		},
		methods:{
			submit(){
				var lpassword=this.password.length;
				var lnewpassword=this.newpassword.length;
				if(this.password!=""&&this.newpassword!=""&&this.emails!=""){
					var a=(lpassword>=6&&lpassword<=21&&lnewpassword>=6&&lnewpassword<=21);
					var b=(this.password==this.newpassword);
					var reg =(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/)
					var c=(reg.test(this.emails))
					if(a==false){
						alert("请输入6-21位字符！")
					}else if(b==false){
						alert("两次密码输入不一致！")
					}else if(c==false){
						alert("邮箱格式错误！")
					}else if(a==false&&b==false&&c==false){
						alert("请重新输入密码")
						this.password=""
						this.newpassword=""
						this.emails=""
					}else{}
					
					if(a==true&&b==true){
						axios.post("http://s.coolndns.com/paw",{
							newpaw:this.newpassword,
							email:this.emails,
							paw:this.password
						}).then(function(res){
							console.log(res)
							if(res.data.infomtion=="密码重置成功！"){
								alert("密码重置成功！")
								location.href="login.html"
							}else{
								alert("密码重置失败！")
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