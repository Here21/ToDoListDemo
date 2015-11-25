App = React.createClass({
	// 修改内容起始
 	// 这个mixin使得getMeteorData方法可以使用
  	mixins: [ReactMeteorData],

  	// 从Tasks集合中获取数据并添加到this.data中
  	getMeteorData(){
  		return {
  			tasks:Tasks.find({}).fetch()
  		}
  	},

	getTasks(){
		return [
			{ _id:1, text:"this is task 1"},
			{ _id:2, text:"this is task 2"},
			{ _id:3, text:"this is task 3"}
		]
	},

	renderTasks(){
		// 从this.data中获取数据
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},
	render(){
		return (
			<div className='container'>
				<header>
					<h1>Todo List</h1>
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
});