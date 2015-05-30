$(document).ready(function(){
$("body").append("<style>.tinAutoUl{width:100%;padding:0%;margin:0px;border:solid 1px rgb(170,170,170);}.tinAutoUl li{background-color:white;padding:4px}.tinAutoUl li:hover{cursor:pointer;background-color: #39F;</style>");
$.fn.clickedLi = function(vv,obj){
this.parent().parent().hide();
obj.value = vv.innerHTML;
};
$.fn.auto = function(options){
	var ob=$(this);
	var resultCount= (options.resultCount)?options.resultCount:5;
	var rand1=Math.floor((Math.random()*10)+1),rand2=Math.floor((Math.random()*10)+1),rand3=parseInt(rand1+""+rand2);
	var htmlContent="<div txt='' id='dv_"+rand3+"' style='background-color:green;display:none;position:absolute;z-index:10000'>";
	htmlContent+="<ul id='ul_"+rand3+"' par='"+rand3+"' class='tinAutoUl' style='list-style:none;'>";
	if(options && options.json)
	for(var indx=0;indx<options.json.length;htmlContent+="<li>"+options.json[indx++]);
	$("body").append(htmlContent+"</ul></div>");
	$("#dv_"+rand3).css('left',this.offset().left);
	$("#dv_"+rand3).css('top',this.offset().top+this.height()+10);
	$("#dv_"+rand3).css('width', this.width());
	$("#dv_"+rand3+ " ul li").click(function(){
		ob.val($(this).html());
		$("#dv_"+rand3).hide();
	});
	$(this).click(function(){
		$(this).trigger('keyup');
		//$("#dv_"+rand3).show();
	});						
	$(this).blur(function(){
		//$("#dv_"+rand3).hide();
	});
	$(this).focus(function(){$(this).trigger('click')});
	$(this).keyup(function()
	{
			var text_to_search =  $(this).val().toLowerCase();
			var curText = $(this).attr('id');
			$("#dv_"+rand3+" ul li").hide();
			$("#dv_"+rand3).hide();
			if(text_to_search.trim()=="")return;
			if(options.minLength)if(text_to_search.length<options.minLength)return;
			if(options.ajax)
			{
				$.post(options.ajax,{tinCompleteRequest:text_to_search},function(data,status){
					resData = JSON.parse(data);
					var curHTML = "",cnt=0;
					for(res in resData)	
					if(++cnt<=resultCount)curHTML += "<li onclick='$(this).clickedLi(this,"+curText+")'>"+resData[res]+"</li>";
					$("#dv_"+rand3+" ul").html(curHTML);	
					if(cnt>0)$("#dv_"+rand3).show();
				});
			}
			
			if(!options.json)return;	
			var cnt=0;
			$("#dv_"+rand3+" ul li").each(function()
			{ 
				if ($(this).html().toLowerCase().indexOf(text_to_search) >= 0 && cnt<resultCount) {
					$(this).show();
					$("#dv_"+rand3).show();
					cnt++;
				}
			});
	});
};
});