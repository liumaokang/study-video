window.onload=function(){
	var localurl=window.location.href;//本地路径
	var a=localurl.lastIndexOf('/')
	var urlWeb=localurl.slice(0,a)
	// 购买过的栏目列表
	function columns(){
		$.ajax({
			url:"http://s.coolndns.com/buy",
			type:"get",
			data:{
				token:localStorage.getItem("token")
			},
			success(res){
				var date=JSON.parse(res).data;
				var uls=$(".shoped-video")
				console.log(date)
				for(let i=0;i<date.length;i++){						
					var lifirsted=$(".columns").clone(true);
					uls.append(lifirsted)
					lifirsted.attr("class","")
					var newslist=$(".shoped-video li")
					// newslist.eq(i).find(".qiNumber").text("第"+(i+1)+"期")
					newslist.eq(i).find(".columnTitle").text(date[i].name)	
					newslist.eq(i).find(".columnsobj").click(function(){
						location.href=urlWeb+"/video-details.html"+"?id="+date[i].id;
					})
					newslist.eq(date.length).remove()
						
					
				}				
			}
		})
	}
	columns();	
}