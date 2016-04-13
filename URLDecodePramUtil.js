//获取URL中指定的参数
function getDecodePram(name){
	var decodePram = new DecodePrams();
	return decodePram[name];
}

//获取URL中的参数列表
function DecodePrams() {
	var decodeObj = new Base64();
	var name, value; 
	var str = location.href;
	var num = str.indexOf("?") 
	str = str.substr(num + 1);

	var arr = str.split("&"); //各个参数放到数组里
	for(var i = 0; i < arr.length; i++){ 
		num = arr[i].indexOf("="); 
		if(num > 0){ 
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1).replace("#","");
			
			this[name] = decodeObj.decode((value));
		} 
    } 
} 
