window.onload=function(){
	var localurl="C:/Users/Administrator/Desktop";//本地路径
	var weburl="http://39.106.168.20";
	var strUrl=window.location.href;
	var arrUrl=strUrl.split("/");
	var strPage=arrUrl[arrUrl.length-2];
	//动态信息-新闻列表业
	function newsdetails(){
		$.ajax({
			url:"http://s.coolndns.com/articles",
			data:{
				limit:2,
				page:1,
				count:1,
				styles:2
			},
			success(res){
				var date=JSON.parse(res).data;
				var title=date
				var uls=$(".hotasked-hots>ul");
				for(let i=0;i<date.length;i++){
					var lifirsted=$(".lifirst").clone(true);
					uls.append(lifirsted)
					lifirsted.attr("class","")
					$("#hot-titless").text("首页/"+date[i].styles)
					var newslist=$(".hotasked-hots>ul li")
					newslist.eq(i).find("img").attr("src",date[i].cover)
					newslist.eq(i).find("#content").text(date[i].content)
					newslist.eq(i).find("#biaoti").text(date[i].title)			
					newslist.eq(i).find(".hotasked-hots-left .ameta").click(function(){
						location.href=localurl+"/"+strPage+"/normal-news.html"+"?id="+date[i].id;
					})
					newslist.eq(date.length).remove()
				}
				
			}
		})
	}	
	newsdetails()
	//动态信息-新闻详情页
	function NewsDetails(){
		var url = window.location.href;
		var num=url.indexOf("=")+1;
		var id=url.slice(num,url.length)
		$.ajax({
			url:"http://s.coolndns.com/articles/"+id,
			type:"get",
			success(res){
				var date=res.data;
				var title=date.title;
				$(".news-main>.title").text(title)
				var content=date.content;
				$(".news-main>.content1").html(content)
				var time=date.created_at;
				$(".news-main>.date").text(time)
				var imgs=date.cover;
				$(".news-main .imgss").attr("src",imgs)
				var imgtitle=date.styles;
				$(".news .titles").text("首页 / "+imgtitle)

			}
		})
	}
	NewsDetails();
	// 实时新闻
	function updateNews(){
		$.ajax({
			url:"http://s.coolndns.com/articles",
			data:{
				limit:2,
				page:1,
				count:1,
				styles:4
			},
			success(res){
				var date=JSON.parse(res).data;
				// console.log(date)
				var ols=$("#updateNews");
				// console.log(ols)
				for(let i=0;i<date.length;i++){
					var lifirsted=$(".lifirsts").clone(true);
					ols.append(lifirsted)
					lifirsted.attr("class","")
					// console.log(date[i].title)
					var newslist=$("#updateNews li")
					newslist.eq(i).find(".updateNews_a").text(date[i].title)			
					newslist.eq(i).find(".updateNews_a").click(function(){
						location.href=localurl+"/"+strPage+"/normal-news.html"+"?id="+date[i].id;
					})
					newslist.eq(date.length).remove()
				}	
			}
		})
	}	
	updateNews()
	//热点资讯
	function hostasked(){
		$.ajax({
			url:"http://s.coolndns.com/articles",
			data:{
				limit:2,
				page:1,
				count:1,
				styles:3
			},
			success(res){
				var date=JSON.parse(res).data;
				// console.log(date)
				var ols=$("#hotaskeds");
				// console.log(ols)
				for(let i=0;i<date.length;i++){
					var lifirsted=$(".lifirstss").clone(true);
					ols.append(lifirsted)
					lifirsted.attr("class","")
					// console.log(date[i].title)
					var newslist=$("#hotaskeds li")
					newslist.eq(i).find(".asked").text(date[i].title)			
					newslist.eq(i).find(".asked").click(function(){
						location.href=localurl+"/"+strPage+"/normal-news.html"+"?id="+date[i].id;
					})
					newslist.eq(date.length).remove()
				}	
			}
		})
	}	
	hostasked()
}