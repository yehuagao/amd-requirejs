require(['config'],function(){
	require(['jquery', 'common'],function($, common){
		console.log('test require')
		console.log(common.setCookie)
	})
})