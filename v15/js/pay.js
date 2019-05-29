window.onload=function(){
	// 购买接口
	// 单人购买
	// 支付接口
	// 拼团购买
		var url = window.location.href;
		var num=url.indexOf("?")
		var a=url.slice(num+1,url.length);
		var b=a.split("&")
		var obj={}
		for(let i=0;i<b.length;i++){
			var c=b[i].split("=");
			var key=c[0]
			var value=c[1]
			obj[key]=value;
		}
		var id=obj.id;
		d=localStorage.getItem("d")
		if(!d){

			localStorage.setItem("d",obj.user_id)
		}

		console.log(localStorage.getItem("d"))
	function pershop(){
		var url = window.location.href;
		var num=url.indexOf("?")
		var a=url.slice(num+1,url.length);
		var b=a.split("&")
		var obj={}
		for(let i=0;i<b.length;i++){
			var c=b[i].split("=");
			var key=c[0]
			var value=c[1]
			obj[key]=value;
		}
		var id=obj.id;
		$(".zhiShop1").click(function(){
			if(localStorage.getItem("tishi")){
					$.ajax({
						url:"http://s.coolndns.com/pay",
						type:"post",
						data:{
							column_id:id,
							group_master_id:localStorage.getItem("d"),
							is_group:localStorage.getItem("pintuan"),
							token:localStorage.getItem("token")
						},
						success(res){
							if(res){
								window.open("zhifubao.html"+"?id="+id)	
							}
						}
					})
			}else{
				alert("请先登录！在购买！")
				location.href="login.html"
			}
		})
	}
	pershop()
	// 单人购买接口
	function shopping(){
		var url = window.location.href;
		var num=url.indexOf("?")
		var a=url.slice(num+1,url.length);
		var b=a.split("&")
		var obj={}
		for(let i=0;i<b.length;i++){
			var c=b[i].split("=");
			var key=c[0]
			var value=c[1]
			obj[key]=value;
		}

		var id=obj.id;
			$(".zhiShop").click(function(){
				if(localStorage.getItem("tishi")){
						$.ajax({
							url:"http://s.coolndns.com/pay",
							type:"post",
							data:{
								column_id:id,
								group_master_id:0,
								is_group:0,
								token:localStorage.getItem("token")
							},
							success(res){
								if(res){
									window.open("zhifubao.html"+"?id="+id)	
								}
							}
						})
				}else{
					alert("请先登录！在购买！")
					location.href="login.html"
				}
			})
	}
	shopping() 
	if(localStorage.getItem("tuanend")=="1"){
	    $(".pintuan").mouseenter(function(){
			$(".pingshares").remove();
		});
		$(".pintuan").css("background-color","#000");    	
    }
}