$(function(){
	$('#uploadImgId').on('click', function() {
		uploadImg(this);
	});
});

/**
 * 上传图片
 * @param t
 * @param e
 */
function uploadImg(t) {
	//图片上传
	$('#uploadFormId').remove();
	$(t).after('<form id="uploadFormId" action="managerImg/uploadImg.do" method="post" encType="multipart/form-data" style="display:none"/></form>');
	$('#uploadFormId').html('<input type="file" name="file" id="fileUploadId" />');
	$('#fileUploadId').on('change', function(){
		$('#uploadFormId').ajaxSubmit({
			success: function (data) {
				if(0 == data.code) {
					var d = data.data;
					appendImg(d);
				}else {
					alert(data.msg);
				}
			}
		});
	});
	$('#fileUploadId').click();
}


/**
 * 添加图片
 */
function appendImg(u) {
	var urls = u.split(',');
	//图片id
	var imgId = urls[0];
	//图片url
	var imgHttpURL = urls[1];
	$("#uploadImgId").attr("src",imgHttpURL);
	$("#imgIdinput").val(imgId);
}

