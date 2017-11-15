require(['config'],function(){
	require(['jquery', 'common', 'echarts','bootstrap'],function($, common, echarts, bootstrap){
		//初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		$('.dropdown').dropdown()
		//指定图表的配置项和数据
		var option = {
			title:{
				text: 'echarts demo'
			},
			tooltip: {
				trigger: 'axis',
				formatter:'{a} <br/>{b}： {c} ℃'
			},
			legend: {
				data:['天气']
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: []
			},
			yAxis: {
				type: 'value',
				axisLabel:{
					formatter:'{value}℃'
				}
			},
			series: [{
				name: '天气预报',
				type: 'line',
				stack: '总量',
				data: []
			}]
		};
		myChart.setOption(option)
		//请求天气预报信息
		setInterval(function(){
			ajaxWeather();
		},8000)
		
		function ajaxWeather(){
			$.get('http://localhost:8888/weather', function(res){
				var resData = res
				var result = resData.data.forecast;
				var wendu = parseInt(resData.data.wendu);
				var seriesArr = [];
				var xAxisArr = [];
				result.forEach(function(item, index){
					seriesArr.push(parseInt(item.high.replace(/[^\d]/g, '')) + wendu);
					xAxisArr.push(item.date)
				})

				myChart.setOption({
			        xAxis: {
			            data: xAxisArr
			        },
			        series: [{
			            name: '温度',
			            data: seriesArr
			        }]
			    });
			})
		}
		ajaxWeather();

	})
})