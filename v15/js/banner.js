window.onload=function(){
	$.ajax({
		url:"http://s.coolndns.com/banners",
		type:"get",
		data:{
			style:0
		},
		success(res){
			console.log(res)
		}
	})
}