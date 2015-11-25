// Task 组件 - 表示单个的待做事宜
Task = React.createClass({
	propTypes: {
		 // 这个组件从React的prop中接受task并显示
		 // 我们使用propTypes来表示这个属性是必须的
		 //React.PropTypes声明了一系列的校验确保我们接收的数据是合法的
		task:React.PropTypes.object.isRequired
	},
	toggleChecked(){
		Tasks.update(this.props.task._id,{
			$set:{checked: ! this.props.task.checked}
		});
	},
	deleteThisTask(){
		Tasks.remove(this.props.task._id);
	},
	render(){
		// 添加下面一行的内容
	    // 当任务被完成的时候给它们一个不同的class
	    // 这样，通过CSS中的设置后，它们会看起来更好一些。
	    const taskClassName = this.props.task.checked ? "checked" : "";
		
		return (
			<li taskClassName={taskClassName}>
				<button className='delete' onClick={this.deleteThisTask}>
					&times;
				</button>

				<input
					type='checkbox'
					readOnly={true}
					checked={this.props.task.checked}
					onClick={this.toggleChecked} />
				<span className='text'>{this.props.task.text}</span>
			</li>
		);
	}
});