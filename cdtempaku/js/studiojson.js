
var studioid = getUrlVars()["studioid"];//"1188244";
if( !studioid)
		studioid = "1188244";
var title = decodeURIComponent(getUrlVars()["title"]);

var page = 1;


var apiurl = "https://scratch.mit.edu/site-api/projects/in/";
var projecturl_prefix = "//scratch.mit.edu/projects/embed/";
var projecturl_surffix = "/?autostart=true";
var projectapiurl = "https://scratch.mit.edu/api/v1/project/__id__/?format=json";
var callfunc = function (json){
	alert(json);
};

$(function () {


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

				console.log( i+"href=" + projectid + projecttitle);
				console.log("url is " + projectapiurl.replace(/__id__/g,projectid));
				$.getJSON(
					projectapiurl.replace(/__id__/g,projectid),
					function(data) {
						//alert(data);
						callfunc(data);

					}
				);
			});
		}	, 
		error: function(xhr, status, err) {
			$('#content').html('エラー発生');
		} // 通信失敗時は<div>要素にメッセージを表示

	});//end $.ajax
	
});

function calledfunc(json){
	alert(json);
}

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i <hashes.length; i++)
	{
		hash = hashes[i].split('=');
	  vars.push(hash[0]);
	  vars[hash[0]] = hash[1];
	}
	return vars;
}


function initialize_lazyload(){
}




