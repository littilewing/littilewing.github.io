/*
 * get scratch projects in a studio infomation in json format
 * @auther tomoki hayashi
 *
 */


(function($) {

$.fn.scratchproject = function(options){

	var _this = this;	
	var projecturl_prefix = "https://scratch.mit.edu/projects/embed/__id__/?autostart=";

//引数を設定する
  var defaults = {
				projectid:"1188244",
				autostart:false,
				imageonly:false,
				width:"485",
				height:"402",
				"class":"project border_radius_32",
				callback: null,
  }
 var setting = $.extend(defaults, options);

	//apiurl for get project infomation.
	var projectapiurl = "https://scratch.mit.edu/api/v1/project/__id__/?format=json";

	var callback = function(json){

		var d = $("<div></div>",{
			id:setting.projectid,
			"class":setting.class, 
		});

		d.append("<h3 class=\"projecttitle\">" + json.title + "</h3>");

		if(setting.imageonly == false){
			var emb = $("<iframe></iframe>",{
				allowtransparency:true,
				width:setting.width ,
				height:setting.height ,
				src: projecturl_prefix.replace(/__id__/g, 
							setting.projectid) 
							+ (setting.autostart ? "true":"false"),
				frameborder:0,
			});


			$(d).append(emb);

			$(d).append($("<div/>",{"class":"owner"}).append(json.owner));
			$(d).append($("<div/>",{"class":"description"}).append(json.description));

			if(typeof setting.callback === "function"){
							alert("ssss"+$(_this));
				setting.callback(_this,d);

			}
			else{
				$(_this).prepend(d);
				//$("#"+projectid).hide();
				$("#"+projectid).show("slow");

			}

		}
		else{

			console.log("imgid:" + setting.projectid);
			
			var img = $("<img />",{"class":"thumb border_radius_100",
					src:"https:"+json.thumbnail,
					id:"thumb-"+setting.projectid,
					width:"160",
					height:"160",
			}	);
			d = $("<div/>");
			d.append(img);
			if(callback){
							setting.callback(_this,d);
			}
			else{
				$(_this).prepend(d);
			}

		}

	};
	
	$.getJSON(
					projectapiurl.replace(/__id__/g,setting.projectid),
					function(data) {
						//	setting.callback(_this,data);
						callback(data);	
					});
				

	return (this);
};

//プラグイン定義
$.fn.scratchstudio = function(options){

	/*			
	 * default settings
	 */ 
	//apiurl for get projects in studio id.
	var studioapiurl = "https://scratch.mit.edu/site-api/projects/in/__id__/__page__/";
	var callbackfunc = function(target,projectid){
					console.log("defailt");
					$(target).scratchproject({projectid:projectid });


	};
  //引数を設定する
	//
	var _this = this;
  var defaults = {
				studioid:"1188244",
				page: "1",
				callback:callbackfunc,
  };
  var setting = $.extend(defaults, options);

	studioapiurl = studioapiurl.replace(/__id__/g,setting.studioid);
	studioapiurl = studioapiurl.replace(/__page__/g,setting.page);

	dummyid = '_dummy_scratchstudio_'+setting.studioid;
	console.log("access to:" + studioapiurl );
	//console.log(this);


	//get projects in the studio.	
	$.ajax({
		url: studioapiurl,
		dataType:"html",
		success: function(data) {

			//get API result ,and append temporary(dummy) dom	
			console.log("dummyiid:" + dummyid);
			$('<div />', { id: dummyid }).appendTo('body');
			$("#" + dummyid).hide().append(data);

			//start loop
			$("#" + dummyid).find(".title").find("a").each(function(i,elem ){


				projectid = $(elem).attr("href").match(/\d+/); 
				setting.callback(_this,projectid);


			});//end each loop

		}	, //end success
		error: function(xhr, status, err) {
			$('#'+ dummyid).html('エラー発生');
			//alert("error occured.");
			console.log("error occured");
		} // 通信失敗時は<div>要素にメッセージを表示

	});//end $.ajax
	

    //メソッドチェーン対応(thisを返す)
    return(this);
};

})(jQuery);

function initialize_lazyload(){
}






