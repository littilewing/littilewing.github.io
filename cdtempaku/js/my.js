
/*
 * url params
 */
var studioid = getUrlVars()["studioid"];//"1188244";
var title = decodeURIComponent(getUrlVars()["title"]);
var maxcnt = 3;	
var cnt = 0;

(function($) {

	$("#smallimages img").live("click", function(){

		id = $(this).attr("id").replace(/thumb-/g,"");

		if( $("#" + id).attr("id")){
			reid = id;
		}else{
			reid = $("#content2 div.project:last").attr("id");

		}
		console.log(reid);
		$("#"+reid).hide("slow",function(){
			$("#"+reid).remove();
			$("#content2").scratchproject({projectid:id,
				autostart:true,
			});
		});
	});

	$("#content2").scratchstudio({
		studioid:studioid ,
	 	page:"1",
		callback:function (target,projectid){
			console.log("call");
			cnt++;
			console.log(cnt);
			if(cnt <  maxcnt){
				$(target).scratchproject({projectid:projectid,
					autostart:true,
				});
			}


			$("#smallimages").scratchproject({projectid:projectid,
				imageonly:true,
				callback:function(target,dom){
					$('.multiple-items').slick('slickAdd',dom);
				},
			});


		},//end callback	
 	});


$(".multiple-items").slick({
	infinite: true,
 	slidesToShow: 8,
 	slidesToScroll: 1,
	autoplay:true,
	autoplaySpeed:3000,
});
					
})(jQuery);





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

