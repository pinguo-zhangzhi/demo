
var React = require('react');

var TodoAction = Reflux.createActions(['addItem', 'deleteItem']);


var TodoListStore = Reflux.createStore({

	listenables:[TodoAction],

	getInitialState:function(){

		return this.list = [];

	},

	onAddItem:function(text){
		this.list.unshift(text);
		this.trigger(this.list);
	},

	onDeleteItem:function(index){
		this.list = this.list.slice(0,index).concat(this.list.slice(index+1));
		this.trigger(this.list);
	}

});


var Input = React.createClass({

	inputValueChange:function(event){

		var text = event.target.value;
		if (event.which === 13 && text) {
			TodoAction.addItem(text);
		};

	},

	render:function(){
		return (<input type='text' placeholder="添加todo" className="write-input" id="writeInput" onKeyUp={this.inputValueChange} />);
	}

});

var TodoList = React.createClass({

	render:function(){

		var _this = this;

		return (<ul className="ul">

				{
					this.props.list.map(function(obj, index){

						return (<li className="li">{obj} 
							<button className="close-button" onClick={TodoAction.deleteItem.bind(null,index)} >删除</button>
							</li>)

					})
				}
			</ul>);

	}	

});

var Page = React.createClass({

	mixins:[Reflux.connect(TodoListStore, 'list')],

	render:function(){

		return (<div>
			<Input />
			<TodoList list={this.state.list} />
			</div>);

	}

})


React.render(

	<Page />,
	document.querySelector('#page')
	);
