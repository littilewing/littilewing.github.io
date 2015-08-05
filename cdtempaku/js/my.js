
/*
 * url params
 */
var studioid = getUrlVars()["studioid"]; 
if(studioid === undefined){
				studioid = "1349344";
}
var title = decodeURIComponent(getUrlVars()["title"]);
var maxcnt = 2;	
var cnt = 0;
var reloadtime = 300000;	//autoreload time.

(function($) {


	// click to display project on the main display.
	$("#smallimages img").live("click", function(){
		
		//id = $(this).attr("id").replace(/thumb-/g,"");
		id = $(this).attr("src").replace(/[^0-9]/g,"");

		 addProject(id);
	});

	$("#title").live("dblclick",function(){
					window.open().location.href= "https://scratch.mit.edu/studios/" + studioid + "/";

	});

	$(".projecttitle").live("dblclick",function(){
					window.open().location.href=
					"https://scratch.mit.edu/projects/" + $(this).parent().attr("id") + "/";

	});


	$('#title').textillate({ in: { effect: 'rollIn' } });
	
	$("#content2").scratchstudio({
		studioid:studioid ,
	 	page:"1",
		callback:function (target,projectid){
		
			cnt++;
		
			if(cnt <=  maxcnt  ){
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
	 	//slidesToShow: 6,
	 	//slidesToScroll: 6,
		autoplay:true,
		autoplaySpeed:3000,
		swipeToSlide:true,
		//centerMode: true,
	  	variableWidth: true,
	  	dots:true,
	  	arrows:true,

	});
	
	
	setTimeout(reload,reloadtime);
	
	function reload(){
	
		$("#_dummy_scratchstudio_"+studioid ).remove();
		
		console.log("reload:start" + reloadtime);
		
		
		
		$("#content2").scratchstudio({
			studioid:studioid ,
		 	page:"1",
			callback:function (target,projectid){
			
				//console.log("xx="+ "#thumb-" + projectid +":"+  $("#thumb-" + projectid).get(0));
				
				if(  $("#thumb-" + projectid).get(0) == undefined )
				{
					console.log("new project" + projectid);
					
					//add thumbnail image.
					$("#smallimages").scratchproject({
						projectid:projectid,
						imageonly:true,
						callback:function(target,dom){
							$('.multiple-items').slick('slickAdd',dom);
						},
					});
					
					addProject(projectid);
				}
				
				
				
			},//endcalback
	 	});
	 	
	 	setTimeout(reload,reloadtime);
 	
	
	}
	function addProject(id){
	
		if( $("#" + id).attr("id")){
			reid = id;
		}else{
			reid = $("#content2 div.project:last").attr("id");
		}
		
		$("#"+reid).hide("slow",function(){
			$("#"+reid).remove();
			$("#content2").scratchproject({projectid:id,
				autostart:true,
			});
		});
		
	}
					
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

