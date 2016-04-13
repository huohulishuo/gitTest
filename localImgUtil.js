(function($) {
	$.fn.extend({
		"showImg" : function (inputId,callFunction) {
			//Input对象
			var file = document.getElementById(inputId);
			var imgPic = this[0];				//jQuery对象不支持base64编码流的设置，要转换成普通dom对象
			var thisFile = file.files[0]
			if (thisFile) {
				//图片大小
				var fileSize = 0;
				if (thisFile.size > 1024 * 1024) {
					fileSize = (Math.round(thisFile.size * 100 / (1024 * 1024)) / 100).toString()+ 'MB';
				} else {
					fileSize = (Math.round(thisFile.size * 100 / 1024) / 100).toString()+ 'KB';
				}
				if(false == callFunction(thisFile.name, fileSize, thisFile.type)){
					return;
				};
				//使用IE条件注释来判断是否IE6，通过判断userAgent不一定准确
				if (document.all)document.write('<!--[if lte IE 6]><script type="text/javascript">window.ie6= true<\/script><![endif]-->');
				//chrome,firefox7+,opera,IE10,IE9，IE9也可以用滤镜来实现
				if (window.FileReader) {
					oFReader = new FileReader();
					oFReader.readAsDataURL(thisFile);
					oFReader.onload = function(oFREvent) {
						imgPic.src = oFREvent.target.result;
					};
				} else if (document.all) {//IE8-
					file.select();
					var reallocalpath = document.selection.createRange().text//IE下获取实际的本地文件路径
					if (window.ie6)
						//IE6浏览器设置img的src为本地路径可以直接显示图片
						imgPic.src = reallocalpath; 
					else { 
						//设置img的src为base64编码的透明图片，要不会显示红xx
						imgPic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\""
								+ reallocalpath + "\")";
						imgPic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
					}
				} else if (file.files) {					//firefox6
					if (file.files.item(0)) {
						url = file.files.item(0).getAsDataURL();
						imgPic.src = url;
					}
				}
			}
			return $(imgPic);
		}
	});
})(jQuery);
