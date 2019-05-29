window.omload=function(){
	var date=$("meta")
	for(let i=0;i<date.length;i++){
		console.log(date.eq(i).attr("name")=="Keywords")
		console.log(date.eq(i).attr("Keywords")=="Keywords")
		console.log(date.eq(i).attr("name")=="Keywords")
	}
}