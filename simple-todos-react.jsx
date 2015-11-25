// 写在第一行
// 定义一个集合来支撑我们的任务列表
Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
	 // 下面的代码最会在客户端运行
	Meteor.startup(function() {
		// 在页面加载完成之后，使用 Meteor.startup 来渲染 React 组件
		React.render(<App />,document.getElementById('render-target'));
	});
}