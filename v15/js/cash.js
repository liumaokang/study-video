window.onload=function(){
		var extract=$("#extract");
		var check=$("#bgcolor");
		var cashs=$("#cash");
		var tablemain=$(".tab-main");
		var accountDetails=$(".account-details")
		var cash=$(".cash")

		extract.click(function(){
			tablemain.css("display","none");
			cash.css("display","none");
			accountDetails.css("display","block");
			$(this).attr("id","bgcolor");
			check.attr("id","");
			cashs.attr("id","");
			
		})
		if(extract.css("display")=="block"){
			$.ajax({
				url:"http://s.coolndns.com/record",
				data:{
					token:localStorage.getItem("token")
				},
				success(res){
					var date=JSON.parse(res).res;
					var tr=$("#account-details")
					if(JSON.parse(res).msg=="请求成功"){
						for(let i=0;i<date.length;i++){
							var newtr=$(".trs").clone(true)
							tr.append(newtr)
							newtr.attr("class","newtrs")
							var newtrs=$("#account-details .newtrs")
							newtrs.eq(i).find(".number").text(date[i].ordernum);
							newtrs.eq(i).find(".way").text(date[i].way);
							newtrs.eq(i).find(".tel").text(date[i].phone);
							newtrs.eq(i).find(".mou").text(date[i].transaction_amount);
							if(date[i].status=="0"){
								newtrs.eq(i).find(".status").text("申请中")
							}else if(date[i].status=="1"){
								newtrs.eq(i).find(".status").text("已同意")
							}else if(date[i].status=="2"){
								newtrs.eq(i).find(".status").text("已拒绝")
							}else if(newtrs.eq(i).find(td).text()=="null"){
								newtrs.eq(i).find(td).text("")
							}
							
							newtrs.eq(i).find(".times").text(date[i].updated_at);
							newtrs.eq(i).find(".timed").text(date[i].created_at);
							newtrs.eq(date.length).remove()	
						}
					}else{
						alert("无记录！")
					}

				}
			})
		}
		check.click(function(){
			tablemain.css("display","block");
			accountDetails.css("display","none");
			cash.css("display","none");
			$(this).css("background-color","")
			$(this).attr("id","bgcolor");
			extract.attr("id","")

		})
		function cashes(){
			$("#way").change(function(){
				var a=$("#way").find("option:selected").text();
				localStorage.setItem("methods",a)
				if(localStorage.getItem("methods")=="银行卡"){
					$("#account").attr('placeholder',"银行卡账号")
					// 银行卡号验证
					var pattern = /^([1-9]{1})(\d{14}|\d{18})$/,
		                str = $("#account").val().replace(/\s+/g, "");
		             $("#account").blur(function(){
		             	 if (!pattern.test(str)) {
	                		alert("请输入正确的银行卡号！")
	                		 $("#account").val("")
	                	 }
		             })
	               
				}
				if(localStorage.getItem("methods")=="支付宝"){
					$("#account").attr('placeholder',"支付宝账号")
					$("#account").blur(function(){
						var zhi=this.value;
						var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
						var pho=/^1[34578]\d{9}$/;
						if(!reg.test(zhi)&&!(pho.test(zhi))){
							alert("支付宝账号不正确！请重新输入！")
							$("#account").val("")
						}
					})
				}
				if(localStorage.getItem("methods")=="微信"){
					$("#account").attr('placeholder',"微信账号")
					$("#account").blur(function(){
					  	var tel =this.value;
	 	   				if(!(/^1[34578]\d{9}$/.test(tel))){ 
				            alert("请输入用于绑定银行卡的微信号")
				            this.value=""  
				        }
					})
				}
			})
			// 手机验证
			$("#number").blur(function(){
			  	var tel =this.value;
				 if(tel!=""){
				 	if(!(/^1[34578]\d{9}$/.test(tel))){ 
			            alert("请输入正确的手机格式")
			            this.value=""  
			        }
				 }
 	   				
			})
			// 提交信息
			$("#submit").click(function(){
				if($("#amount").val() != "" && $("#amount").val() != "" && $("#names").val() != ""&& localStorage.getItem("methods")!="支付方式" && $("#account").val()!="" && $("#number").val()!="" && $("#remark").val()!=""){
					$.ajax({
						url:"http://s.coolndns.com/withdrawals",
						type:"post",
						data:{
							token:localStorage.getItem("token"),
							amount:$("#amount").val(),
							name:$("#names").val(),
							way:localStorage.getItem("methods"),
							account:$("#account").val(),
							phone:$("#number").val(),
							remark:$("#remark").val()
						},
						success(res){
							if(res.data.msg=="请求成功"){
								alert("已完成提交")
							}else{
								alert("请完善您的信息!")
							}
						}
					})
				}else{
					alert("请检查信息或者完善您的信息！")
				}
			})
			
		}
		cashes()
		$("#resets").click(function(){
			$("#amount").val("")
			$("#names").val("")
			$("#account").val("")
			$("#number").val("")
			$("#remark").val("")
			localStorage.getItem("methods","支付方式")
		})	
		
		
		
		
}