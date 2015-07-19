
var studioid = "1349344";//"1188244";
var page = 1;


var apiurl = "https://scratch.mit.edu/site-api/projects/in/";
var projecturl_prefix = "//scratch.mit.edu/projects/embed/";
var projecturl_surffix = "/?autostart=true";

$(function () {

	$("#content").hide();

	url = apiurl + studioid + "/" + page + "/";

	$.ajax({
		url: url,
		dataType:"html",
		success: function(data) {
		console.log(url);
			var h = $(data);
			$("#content").append(h);

			$("#content").find(".title").find("a").each(function(i,elem ){

				projectid = $(elem).attr("href").match(/\d+/); ;
				projecttitle = $(elem).text();

					console.log( i+"href=" + projectid);

					var prjtag = makeEmbedTag(projectid,projecttitle);

					console.log("prj=" + prjtag);

					$("#content2").append(prjtag);
				});


				$('.single-item2').slick({
					  autoplay: true,
						autoplaySpeed: 5000,
						//adaptiveHeight: true,
						//dots: true,
						//infinite: true,
						//speed: 600,
						centerMode: true,
						//vertical:true,
						//fade:false,
						//easing:true,
						variableWidth: true,
						responsive:true,
						accessibility:true,
						});
				
						/*
				$('.single-item3').slick({
					  autoplay: true,
						autoplaySpeed: 5000,
						//adaptiveHeight: true,
						//dots: true,
						//infinite: true,
						//speed: 600,
						centerMode: true,
						//vertical:true,
						//fade:false,
						//easing:true,
						variableWidth: true,
						responsive:true,
						accessibility:true,
						});
				*/



		}	, 
		error: function(xhr, status, err) {
			$('#content').html('エラー発生');
		} // 通信失敗時は<div>要素にメッセージを表示

	});
	//});

});

function makeEmbedTag(id,text){

	var d = $("<div></div>",{
		id:id,
		"class":"project " 
	});
	d.append("<h3 class=\"projecttitle\">"+text+"</h3>");

	var emb = $("<iframe></iframe>",{
		allowtransparency:true,
		width:485,
		height:402,
		src: projecturl_prefix+projectid+projecturl_surffix,
		frameborder:0,
	}	);


	$(d).append(emb);

	return d;

}

function initialize_lazyload(){
}



