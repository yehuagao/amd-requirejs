define(function(){
	var obj =  {
		randomNum:function(min, max){
			return parseInt(Math.random()*(max-min+1)) + min;
		},
		// setCookie('username','yeye',now,'/');//
		setCookie:function(name,val,expires,path){
			// cookie名/值（必填）
			var str_cookie = name + '=' + val;

			// cookie有效期
			if(expires){
				str_cookie += ';expires=' + expires.toUTCString();
			}

			// cookie路径
			if(path){
				str_cookie += ';path=' + path;
			}
			document.cookie = str_cookie;
		},
		getCookie:function(name){
		// 获取所有cookie并拆分成数组
			var cookies = document.cookie;
			var arr_cookie = cookies.split('; ');

			// 存放cookie值
			var res = '';

			// 遍历数组，找到所需的cookie，并返回
			for(var i=0;i<arr_cookie.length;i++){
				var arr = arr_cookie[i].split('=');
				if(arr[0] === name){
					res = arr[1];
				}
			}

			return res;
		},
		deleteCookie:function(name){
			// 利用设置有效期来达到删除cookie的效果
			var now = new Date();
			now.setDate(now.getDate()-1);
			document.cookie = name + '=0;expires=' + now.toUTCString();
		},
	 	ajaxFun:function(option){
			$.ajax({
				type: option.type,
				url: option.url,
				crossDomain: true,
				beforeSend: function(request) {    
					request.setRequestHeader("Content-Type", "application/json");          
    			}.bind(this),
				data: JSON.stringify(option.data),
				success: function(res) {
					if(typeof res.result == 'string'){
						this.setCookie('access_token', res.result)
					}
					option.successFun(res)
				}.bind(this),
				error: function(err) {
					option.failedFun(err)
				}
			});

		}

	}
	return obj;
})
