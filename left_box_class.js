//JS 左侧弹出导航

$(document).ready(function() {
	
    $('#tbNav li').mousemove(function(){
		$('.pull_down2').eq($(this).index()).css('left','0').siblings().css('left','-150px')
	})
	$('#tbNav li').mouseout(function(){
		$('.pull_down2').eq($(this).index()).css('left','-150px').siblings().css('left','0')
	})
});


//移动商桥
/*var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?ddc97dbe6e72abe7fd53899b249eacae";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();*/

//PC商桥
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?be416973285b11569993d30b237a57bd";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();