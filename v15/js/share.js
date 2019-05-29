$(function(){
    // 分享给QQ好友
       var user_id=localStorage.getItem("user_id")
        var urls=window.location.href+"&user_id="+user_id;
        // var covers=localStorage.getItem("imgs")
        $("#qq_id").click(function(){
            if(localStorage.getItem("tishi")){              
                var p = {
                    url : urls, /*获取URL，可加上来自分享到QQ标识，方便统计*/
                    desc:'',
                    //title : '新玩法，再不来你就out了！', /*分享标题(可选)*/
                    title:'',
                    summary : '', /*分享摘要(可选)*/
                    pics : "", /*分享图片(可选)*/
                    flash : '', /*视频地址(可选)*/
                    site : "好学堂", /*分享来源(可选) 如：QQ分享*/
                    style : '201',
                    width : 32,
                    height : 32
                };
                var s = [];
                for ( var i in p) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }

                var url = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&');

                // return url;
                window.location.href =url;
                //document.write(['<a class="qcShareQQDiv" href="http://connect.qq.com/widget/shareqq/index.html?',s.join('&'), '" >分享给QQ好友</a>' ].join(''));
            // }
            }else{
                alert("请先登录在分享")
            }
      })
        // 微信分享 
    	$(".wx").click(function(){            
             if(localStorage.getItem("tishi")){
                 var urll=window.location.href
                 localStorage.setItem("erurl",urll)
                 location.href="wx.html"
              }else{
                  alert("请先登录在分享")
               }
    	})      
            


})