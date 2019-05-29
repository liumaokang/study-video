window.onload=function(){
	var localurl=window.location.href;//本地路径
	var a=localurl.lastIndexOf('/')
	var urlWeb=localurl.slice(0,a)
	// 栏目模块
	function columns(){
		$.ajax({
			url:"http://s.coolndns.com/column",
	     	type:"get",
			success(res){
				var date=res.data;
				var	liList=$(".liList>li")[0];
				for(let i=0;i<date.length;i++){
					var imgs=date[i].cover;
					var price=date[i].price;
					var name=date[i].name;
					var ID=date[i].id;
					var divs=$(".inds").clone(true)[0];
					liList.append(divs)
					var divnews=$(".liList>li>div")
					divnews.attr("class","ind")
					divnews.eq(i).find("#images").attr("src",imgs)
					divnews.eq(i).find(".biaoti>span").text(name)
					if(date[i].price=="0"){
						divnews.eq(i).find(".biaoti>a").text("观看")
					}else{
						divnews.eq(i).find(".biaoti>a").text("付费")
					}
					divnews.eq(i).find(".biaoti>a").click(function(){
						if(date[i].price=="0"){
							location.href=urlWeb+"/video-details.html"+"?id="+date[i].id
						}else{						
							location.href=urlWeb+"/weiqi-guidance.html"+"?id="+date[i].id;
						}
					})
				}

			}
		})
	}
	columns();
	// 控制首页栏目状态
	function control(){
			$.ajax({
			url:"http://s.coolndns.com/homepage",
			data:{},
			type:"get",
			success(res){
				var date=JSON.parse(res).data;	
				var columns=$(".column");
				var arra=[];
				for(let i=0;i<date.length;i++){
						var status=date[i].status;
						if(date[i].status=="1"){	
							columns[i].innerHTML=date[i].name;
							arra[arra.length]=date;
							$(".column").eq(i).closest(".w").css("display","block")
						}
						if(date[i].status=="0"){
							$(".column").eq(i).closest(".w").css("display","none")
					}
				}
			}
		})
	}
	control();
	//动态信息-新闻列表业
	function indexnewsdetails(){
		$.ajax({
			url:"http://s.coolndns.com/articles",
			data:{
				limit:10,
				page:1,
				count:1,
				styles:2
			},
			success(res){
				var date=JSON.parse(res).data;
				var uls=$("#indexStatus");
				for(let i=0;i<date.length;i++){
					var lifirsted=$(".indexliList").clone(true);
					uls.append(lifirsted)
					lifirsted.attr("class","")
					var newslist=$("#indexStatus li")
					newslist.eq(i).find("img").attr("src",date[i].cover)
					newslist.eq(i).find(".newsmain").text(date[i].content)		
					newslist.eq(i).find(".look").click(function(){
						location.href=urlWeb+"/normal-news.html"+"?id="+date[i].id;
					})
					newslist.eq(date.length).remove()
				}
				
			}
		})
	}	
	indexnewsdetails()
	// 教师团队
	function techersSteam(){
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
				var uls=$("#teacher_img");
				for(let i=0;i<date.length;i++){
					var lifirsted=$(".teacher-img").clone(true);
					uls.append(lifirsted)
					lifirsted.attr("class","")
					var newslist=$("#teacher_img li")
					newslist.eq(i).find("img").attr("src",date[i].cover)
					newslist.eq(i).find(".teacher_name").text(date[i].title)		
					newslist.eq(i).find("a").click(function(){
						location.href=urlWeb+"/teacher-details.html"+"?id="+date[i].id;
					})
					newslist.eq(date.length).remove()
				}
				
			}
		})
	}	
	techersSteam()
	

	// 热点咨询
	function hostasked(){
		$.ajax({
			url:"http://s.coolndns.com/articles",
			data:{
				limit:10,
				page:1,
				count:1,
				styles:3
			},
			success(res){
				var date=JSON.parse(res).data;
				// console.log(date)
				var ols=$(".slide>ul");
				// console.log(ols)
				for(let i=0;i<date.length;i++){
					var lifirsted=$(".hotas").clone(true);
					ols.append(lifirsted)
					lifirsted.attr("class","")
					// console.log(date[i].title)
					var newslist=$(".slide>ul li")
					newslist.eq(i).find(".stu").text(date[i].title)			
					newslist.eq(i).find("img").attr("src",date[i].cover)			
					newslist.eq(i).click(function(){
						location.href=urlWeb+"/normal-news.html"+"?id="+date[i].id;
					})
					newslist.eq(date.length).remove()
				}	
			}
		})
	}	
	hostasked()

	// 精选视频
	function selectvideo(){
		$.ajax({
			url:"http://s.coolndns.com/video",
			data:{
				limit:4,
				page:1
			},
			success(res){
				var date=JSON.parse(res).data;
				var ols=$(".dynamic_information ul");
				for(let i=0;i<date.length;i++){
					var lifirsted=$(".jingvideo").clone(true);
					ols.append(lifirsted)
					lifirsted.attr("class","")
					// console.log(date[i].title)
					var newslist=$(".dynamic_information ul li")
					newslist.eq(i).find(".top .sum").text(date[i].summary)			
					newslist.eq(i).find(".fl .jingimg").attr("src",date[i].cover)			
					newslist.eq(i).find(".bot a").click(function(){
						location.href=urlWeb+"/video-details.html"+"?id="+date[i].column_id;
					})
					newslist.eq(date.length).remove()
				}	
			}
		})
	}	
	selectvideo()
	
}