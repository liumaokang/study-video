$(function(){
	var localurl=window.location.href;//本地路径
	var a=localurl.lastIndexOf('/')
	var urlWeb=localurl.slice(0,a)
	if(JSON.parse(localStorage.getItem("title"))!==null){
		// 导航栏
		function addnav(){
			var newArra=JSON.parse(localStorage.getItem("title"))
			var ulList=$("#index")[0];
			for(let i=0;i<newArra.length;i++){	
				var metas=$(".indexTitle").clone(true)[0];
				ulList.append(metas);//qppendTo和append的区别，动态添加导航标题
				var liList=$("#index>li");
				liList.eq(i).find("a").text(newArra[i].name)
				if(newArra[i].id=="1"){
					liList.eq(i).find("a").attr("href","index.html")
				}
				if(newArra[i].id=="3"){
					liList.eq(i).find("a").attr("href","techers.html")
				}
				// if(newArra[i].id=="5"){
				// 	liList.eq(i).find("a").attr("href","aboutUs.html")
				// }
				if(newArra[i].id=="6"){
					liList.eq(i).find("a").attr("href","aboutUs.html")
				}
			}
		}
		addnav();
		
	}else{
		$.ajax({
			url:"http://s.coolndns.com/navigation",
			type:"get",
			success(res){
				var newArra=JSON.parse(res).data
				console.log(newArra)
				var ulList=$("#index")[0];
				for(let i=0;i<newArra.length;i++){	
					var metas=$(".indexTitle").clone(true)[0];
					ulList.append(metas);//qppendTo和append的区别，动态添加导航标题
					var liList=$("#index>li");
					liList.eq(i).find("a").text(newArra[i].name)
					if(newArra[i].id=="1"){
						liList.eq(i).find("a").attr("href","index.html")
					}
					if(newArra[i].id=="3"){
						liList.eq(i).find("a").attr("href","techers.html")
					}
					if(newArra[i].id=="6"){
						liList.eq(i).find("a").attr("href","aboutUs.html")
					}
				}
				
				localStorage.setItem('title',JSON.stringify(newArra));
			}
		})
	}
	// 个人中心列表
	function person(){
		var PList=$(".sele p");
		var lilist=$(".naviphone .denglu ul li")
		for(let i=0;i<PList.length;i++){
			if(localStorage.getItem("token")){
				PList[i].style.display="block"
				lilist[i].style.display="block"
			}else{
				PList[i].style.display="none"
				PList[1].style.display="block"
				lilist[i].style.display="none"
				lilist[1].style.display="block"
			}		
		}

		
	}
	person()

	//栏目详情(购买页面)
	function columnsDetails(){
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
		$.ajax({
			url:"http://s.coolndns.com/column/"+id+"?"+"token"+"="+localStorage.getItem("token"),
			type:"get",
			date:{
			},
			success(res){
				var title=res.data.name;
				var imgs=res.data.cover;
				localStorage.setItem("column",imgs)
				var teachername=res.data.teacher_name;
				var teacherimg=res.data.teacher_img;
				var content=res.data.content;
				var price=res.data.price;
				$(".shaoer-guidance>p").text(title);
				$(".children .htitle").text("首页/"+title);
				$(".shaoer-guidance .sideimg").attr("src",imgs);
				$("#teacher_img").attr("src",teacherimg);
				$("#price").text(price)
				$("#teacher_name").text(teachername)
				$("#price1").text(price+"元")
				$(".children-txt>div").html(content)
				if(res.payment_status!="未购买"&&localStorage.getItem("tishi")){
					$(".shops").mouseenter(function(){
						$(".shopss").remove();
					  });
					$(".pershoped").text("已购买")
					$(".pintuan .tuan").text("已购买")				
					$(".pintuan").mouseenter(function(){
						$(".pingshares").remove();
				     });
				}
			}
		})
	}
	columnsDetails();
	// 拼团详情页面
	function AssembleDetails(){
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
		$.ajax({
			url:"http://s.coolndns.com/details",
			data:{
				column_id:id
			},
			type:"get",
			success(res){
				var date=JSON.parse(res).data;
				var pinshop=date.group_price;
				var people=date.people_number;
				var startTime=date.start_time;
				var endTime=date.end_time;
				$(".pintuan .tuan").text(people+"人团")
				$(".shop-obj .pinshop").text("￥"+pinshop)
				var startimes=startTime.replace(/-/g,"/")
				var endtimes=endTime.replace(/-/g,"/");
				$(".count_down").countDown({
		            startTimeStr:startimes,//开始时间
		            endTimeStr:endtimes,//结束时间
		            daySelector:".day_num",
		            hourSelector:".hour_num",
		            minSelector:".min_num",
		            secSelector:".sec_num"
		        });

			}
		})
	}
	AssembleDetails()
	// 教师详情
	function techersDetails(){
		var url = window.location.href;
		var num=url.indexOf("=")+1;
		var id=url.slice(num,url.length)
		$.ajax({
			url:"http://s.coolndns.com/articles"+"/"+id,
			data:{
				
			},
			success(res){
				var date=res.data
				$(".teachernames").text(date.title)
				$(".teacherimg").attr("src",date.cover)
				$(".teacherContent").html(date.content)
			}
		})
	}	
	techersDetails()
	// 教师团队更多
	function techersSteamMore(){
	$.ajax({
		url:"http://s.coolndns.com/articles",
		data:{
			limit:10,
			page:1,
			count:1,
			styles:6
		},
		success(res){
			var date=JSON.parse(res).data
			var uls=$(".members");
			for(let i=0;i<date.length;i++){
				var lifirsted=$(".teacher-per").clone(true);
				uls.append(lifirsted)
				lifirsted.attr("class","")
				var newslist=$(".members li")
				newslist.eq(i).find("img").attr("src",date[i].cover)
				newslist.eq(i).find(".teachernames").text(date[i].title)		
				newslist.eq(i).find(".teachers-main").html(date[i].content)		
				newslist.eq(i).click(function(){
					location.href=urlWeb+"/teacher-details.html"+"?id="+date[i].id;
				})
				newslist.eq(date.length).remove()
			}
			
		}
	})
	}	
	techersSteamMore()
	// 拼团价格
	function AssemblePrice(){
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
		$.ajax({
			url:"http://s.coolndns.com/price",
			data:{
				column_id:id
			},
			type:"get",
			success(res){
				var date=JSON.parse(res);
				if(date.msg=="没有找到该栏目的拼团信息！"){
					$(".pintuan").mouseenter(function(){
						$(".pingshares").remove()
					});
					localStorage.setItem("pintuan","0")
					$(".pintuan").css("background-color","#666");
					$(".pintuan i").css("display","block")
					$("#pingprice").text("0元")
					$(".tuan").text("拼团购买")
				}else{
					$("#pingprice").text("￥"+date.group_price)
					localStorage.setItem("pintuan","1")
				}
			}
		})
	}
	AssemblePrice()
	// 退出功能
	function quit(){
		$(".quit").click(function(){
			$.ajax({
				url:"http://s.coolndns.com/logout",
				data:{
					token:localStorage.getItem("token")
				},
				type:"get",
				success(res){
					console.log(a)
				    var a=JSON.parse(res).status;
				    var loginstatus=localStorage.getItem("tishi")
				     if(a=="1"&&loginstatus=="请求成功"){
			     	    // localStorage.setItem("clear",a)
				     	location.href="login.html";
				     	var name=$("#name").val("");
						var age=$("#age").val("");
						var porce=$("#porce").val("");
						var phone=$("#phone").val("");
						localStorage.clear();

				     }
				}
			})
		})	
	}
	quit();
	// 获取用户信息
	function personDetailss(){
		if(localStorage.getItem("name")){
			var PList=$(".sele p");
			var lilist=$(".naviphone .denglu ul li");
			PList.eq(1).find("a").text(localStorage.getItem("name")+"(已登录)")
			lilist.eq(1).find("a").text(localStorage.getItem("name")+"(已登录)")
		}else{
			$.ajax({
				url:"http://s.coolndns.com/user/",
				type:"get",
				data:{
					token:localStorage.getItem("token")
				},
				success(res){
					var a=res.data;
					var name=a.name;
					var PList=$(".sele p");
					var lilist=$(".naviphone .denglu ul li");
					PList.eq(1).find("a").text(name+"(已登录)")
					lilist.eq(1).find("a").text(name+"(已登录)")
					localStorage.setItem("name",name)
				}
			})
			
		}
	}
	personDetailss()
	// 网页配置
	$.ajax({
		url:"http://s.coolndns.com/setting",
		type:"get",
		success(res){
			var date=JSON.parse(res).data;
			var about=date.about;   //关于我们
			var address=date.address;  //地址
			var agreement=date.agreement; //用户协议
			var copyright=date.copyright;  //版权
			var keywords=date.keywords; //关键字
			var description=date.description; //描述
			var title=date.title; //标题
			var logoimg=date.logo; //LOGO
			var qqNumber=date.qq;  //qq账号
			var maimg=date.qr_code; //二维码
			var telephone=date.telephone //联系电话
			//网页三大标签
			var metas=document.getElementsByTagName("meta")
			for(let i=0;i<metas.length;i++){
				if(metas[i].getAttribute("name")=="Keywords"){
					metas[i].setAttribute("content",keywords)
				}
				if(metas[i].getAttribute("name")=="description"){
					metas[i].setAttribute("content",description)
				}
			}
			$(".logo img").attr("src",logoimg)
			$(".logo img").click(function(){
				location.href="index.html"
			})
			$(".foot .fl>div").text(copyright)
			$(".foot .fl>p").text(address)
			$(".foot .fr img").attr("src",maimg)
		}
	})
	// 检测关闭浏览器
		// window.onbeforeunload = onbeforeunload_handler;   
	 //    window.onunload = onunload_handler;
	 //    function onbeforeunload_handler(){
	 //    		alert(1)   
		//        localStorage.clear()
	 //    } 	         
	 //    function onunload_handler(){ 
	 //    	alert(1)
		//     localStorage.clear()
	 //    }   
})


