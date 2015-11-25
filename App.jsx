App = React.createClass({
	// 修改内容起始
 	// 这个mixin使得getMeteorData方法可以使用
  	mixins: [ReactMeteorData],

  	// 从Tasks集合中获取数据并添加到this.data中
  	getMeteorData(){
  		return {
  			tasks:Tasks.find({},{sort:{createdAt:-1}}).fetch()
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

	handleSubmit(event) {
		event.preventDefault();

		// 通过React的ref属性找到输入框的值
		var text = React.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text:text,
			createdAt:new Date() // 当前时间
		});

		// 复原表单
		React.findDOMNode(this.refs.textInput).value="";
	},

	render(){
		return (
			<div className='container'>
				<header>
					<h1>Todo List</h1>
				</header>
				{/* 添加开始 */}
    			<form className="new-task" onSubmit={this.handleSubmit} >
		      	<input
			        type="text"
			        ref="textInput"
			        placeholder="Type to add new tasks" />
			    </form>
			    {/* 添加开始 */}				
			    <ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
});