App = React.createClass({
	// 修改内容起始
 	// 这个mixin使得getMeteorData方法可以使用
  	mixins: [ReactMeteorData],

  	getInitialState(){
  		return {
  			hideCompleted:false
  		}
  	},

  	// 从Tasks集合中获取数据并添加到this.data中
  	getMeteorData(){
  		let query = {};
  		if (this.state.hideCompleted) {
  			// If hide completed is checked, filter tasks
  			query = {checked:{$ne:true}};
  		}

  		return {
  			tasks:Tasks.find(query,{sort:{createdAt:-1}}).fetch(),
  			incompleteCount:Tasks.find({checked:{$ne:true}}).count()
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

	toggleHideCompleted(){
		this.setState({
			hideCompleted:! this.state.hideCompleted
		});
	},

	render(){
		return (
			<div className='container'>
				<header>
					<h1>Todo List({this.data.incompleteCount})</h1>
				</header>
				<label className='hide-completed'>
					<input 
						type='checkbox'
						readOnly={true}
						checked={this.state.hideCompleted}
						onClick={this.toggleHideCompleted} />
						Hide Completed Tasks
				</label>
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