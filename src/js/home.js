require(['config'],function(){
	require(['jquery', 'common', 'echarts'],function($, common, echarts){
		console.log('test require')
		console.log(common.setCookie)
		console.log($)
		console.log(echarts)
	})
})