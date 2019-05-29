window.onload=function(){
	//动态信息-新闻列表
	function details(){
		$.ajax({
			url:"http://s.coolndns.com/articles",
			data:{
				limit:1,
				page:1,
				count:1,
				styles:1
			},
			success(res){
				// var date=res.data;
				// var title=date.title;
				// var content=date.content;
				// var img=data.cover;
				console.log(res)
			}
		})
	}	
	details()
}