var todoList = {
  todos: [],
  /*We needed this early on, to work in the console. But now that the view object is established to displayTOdos in the DOM, we don't need this console-targetd code any more. Leaving here for future reference instead of deleted
  displayTodos: function() {
    if(this.todos.length === 0){
      console.log("Your todo list is empty!");
    } else {
      console.log("My todos:");
      for(var i=0; i<this.todos.length; i++){
        if(this.todos[i].completed === true){
          console.log("(x) " + this.todos[i].todoText);
        } else {
          console.log("( ) " + this.todos[i].todoText);
        }
      }
    }
  },*/

 addTodo: function(todoText) {
   /*the "todos" variable no longer pertains since we created
   the todoList object
   add `this` keyword to refer to the todoList object
  //when calling this anonymous function:*/
  this.todos.push({
    todoText: todoText,
    completed: false
  });
 },

 changeTodo: function(position, todoText){
   this.todos[position].todoText = todoText;
 },

 deleteTodo: function(position){
   /*splice method takes the position where you want
   to start deleting things and the number of things
   you want to delete */
   this.todos.splice(position, 1);
 },

 toggleCompleted: function(position){
   var todo=this.todos[position];
   todo.completed = !todo.completed;
 },

 toggleAll: function(){
   var totalTodos=this.todos.length;
   var completedTodos = 0;
   //get number completed todos:
   for(var i = 0; i<totalTodos; i++){
     if(this.todos[i].completed === true){
       completedTodos++;
     }
   }

   //if everything is true, make everything false. count completed todos. does count of completed todos equal all todos?  if so we have met this first condition.
   if (completedTodos ===totalTodos) {
     //make everything false
     for(var i=0; i<totalTodos; i++){
       this.todos[i].completed = false;
     }
   } else {
     //otherwise, make everything true
     for(var i=0; i<totalTodos; i++){
     this.todos[i].completed=true;
      }
    }
 }
};

/*//we want access to the display todos  button in html
var displayTodosButton = document.getElementById('displayTodosButton');
//we want to run displayTOdos() method when someone clicks
displayTodosButton.addEventListener('click', function() {
    todoList.displayTodos();
});

//here the same: access the toggleAll button in html and have it work when someone clicks:
var toggleAllButton = document.getElementById('toggleAllButton');
toggleAllButton.addEventListener('click', function(){
  todoList.toggleAll();
}); */

var handlers = {
    addTodo: function(){
      var addTodoTextInput = document.getElementById('addTodoTextInput')
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    },
    changeTodo: function(){
      var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
      var changeTodoTextInput = document.getElementById('changeTodoTextInput');
      todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
      changeTodoTextInput.value ='';
      changeTodoPositionInput.value ='';
      view.displayTodos();
    },
    deleteTodo: function(){
      var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
      todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
      deleteTodoPositionInput.value = '';
      view.displayTodos();
    },
    toggleCompleted: function(){
      var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
      todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
      toggleCompletedPositionInput.value='';
      view.displayTodos();
    },
    toggleAll: function(){
      todoList.toggleAll();
      view.displayTodos();
    }
};

// a new method called `view` that is responsible for taking functions and displaying them to screen
// it doesn't have any logic or change anything in the app -- it takes the "todos" array and dispalys it
var view = {
  displayTodos: function() {
    //set up variable that goes into the markup and grabs the ul that will hold our list of 'todos':
    var todosUl= document.querySelector('ul');
    //set the list to empty:
    todosUl.innerHTML = '';
    //then loop over the list array to create a 'li' for each todo item --
    //notice that this is happening in the DOM -- not changing the markup!
    //the newly created li is then appended to the ul
    for(var i=0; i<todoList.todos.length; i++){
      var todoLi = document.createElement('li');
//we are in a new object here, so 'this' doesn't work - we need a way to refer to todoList.todos
      var todo = todoList.todos[i];
      //establish a variable for whether to todo list item is completed:
      var todoTextWithCompletion = '';
      if(todo.completed === true){
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      //set text content of the element: take the todoLi element, access its textContent property, and set it to todoText propert of each of our todoText objects
      todoLi.textContent = todoTextWithCompletion;
      todosUl.appendChild(todoLi);
    }
  }
};
