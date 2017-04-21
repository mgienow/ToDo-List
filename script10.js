var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos.
    for (var i = 0; i < totalTodos; i++) {
     if (this.todos[i].completed === true) {
       completedTodos++;
        }
      }
    });


    // Case 1: If everything’s true, make everything false.
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
         this.todos[i].completed = false;
      }

    // Case 2: Otherwise, make everything true.
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
};


var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  /* this code gets changed once we have put in
    deleteTodo: function() {
    // the line below gets removed to remove the 'delete` command box in the original Todo list.
    //we no longer needed this once we have built code for there to be a delet button with each list item
    var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    //also don't need this since we no longer need to reset the delete position box to blank:
    deleteTodoPositionInput.value = '';
    view.displayTodos();
    SO THE NEW CODE IS:*/

    deleteTodo: function(position){
      todoList.deleteTodo(position);
      view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton'
    return deleteButton;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event){
      var elementClicked=event.target;
      if(elementClicked.className === 'deleteButton'){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    })
  }
};

view.setUpEventListeners();



/*var todosUl = document.querySelector('ul');

todosUl.addEventListener('click', function(event) {
  //console.log(event.target.parentNode.id);

  //1. get the element that was clicked on.
  var elementClicked = event.target;

  //check if elementClicked is a delete button:
  if(elementClicked.className === 'deleteButton'){
    //then 2. Run "handlers.deleteTodo(position)" on whatever was clicked on
    // -- the position is the ID on the LI item that was clicked: elementClicked.parentNode.id
    //problem being that 'elementClicked.parentNode.id' is a string and we need to return a number.
    //parseInt means JS will do its best to return a number value for whatever is passed in the ()s
    //parseInt(elementClicked.parentNode.id);
    //Ultimately:
    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
  }
  //NOW, MOVE EVERYTHING TO `VIEWS` OBJECT FOR MOST APPROPRIATE ORGANIZATION
})

*/
