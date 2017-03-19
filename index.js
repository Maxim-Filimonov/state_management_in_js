var state = {
  todos: []
};

function addTodo(stateToChange, name, index) {
  if (index === undefined) {
    index = 0;
  }

  var todo = {
    text: name,
    completed: false
  };

  stateToChange.todos.splice(index, 0, todo);

  return stateToChange;
}

function complete(stateToChange, index) {
  var todo = stateToChange.todos[index];

  todo.completed = !todo.completed;

  return stateToChange;
}

function deleteTodo(stateToChange, index) {
  stateToChange.todos.splice(index, 1);

  return stateToChange;
}

function save() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}

function restore() {
  var storedTodo = localStorage.getItem("todos");
  if (storedTodo === "undefined") {
    storedTodo = JSON.stringify([]);
  }
  state.todos = JSON.parse(storedTodo);

  render(state);
}

function render(state) {
  var htmlTodo = $(renderTodos(state.todos));
  htmlTodo.find("input:checkbox").click(toggleTodoHandler);
  htmlTodo.find("input:button.js-delete").click(deleteTodoHandler);
  $("#todos").html(htmlTodo);
}

$(function () {
  restore();

  $("#add-todo").click(function (e) {
    addTodoHandler(state.todos.length)
  });

  $("#insert-todo").click(function (e) {
    addTodoHandler(0);
  });

  $("#hide-completed").click(function (e) {
    $(".completed").hide();
    $("#hide-completed").hide();
    $("#show-completed").show();
  });
  $("#show-completed").click(function (e) {
    $(".completed").show();
    $("#hide-completed").show();
    $("#show-completed").hide();
  });
});

function renderTodo(todo, index) {
  var checked = "";
  var labelClass = "";
  if (todo.completed) {
    checked = "checked=checked"
    labelClass = "class='completed'"
  }
  var labelBegin = "<li id=" + index + "><label " + labelClass + ">" + todo.text;
  var deleteButton = "<input type='button' value='Deletel' class='js-delete'/>";
  return labelBegin + "<input type='checkbox' " + checked + "/> </label>" + deleteButton + "</li>";
}

function renderTodos(todos) {
  return todos.map(renderTodo).join("");
}

function deleteTodoHandler(e) {
  var index = parseInt($(e.target).parents("li").attr("id"));

  deleteTodo(state, index);

  render(state);
  save();
}

function toggleTodoHandler(e) {
  var index = parseInt($(e.target).parents("li").attr("id"));

  complete(state, index);

  render(state);
  save();
}

function addTodoHandler(index) {
  // Get the input from dom
  var todoName = $("#add-text").val();

  // Modify the state
  addTodo(state, todoName, index);

  // render
  render(state)
  save();
}

// ******* TESTS ************ 
function testComplete() {
  var testState = { todos: [] };
  addTodo(testState, "Buy milk")
  addTodo(testState, "Another")
  complete(testState, 0);
  var completed = function (x) {
    return x.completed;
  }
  if (testState.todos.filter(completed).length === 1) {
    console.log("TEST PASSED");
  } else {
    console.log("TEST FAILED", testState);
  }
}
function testDelete() {
  var testState = { todos: [] };
  addTodo(testState, "Buy milk")
  addTodo(testState, "Another")
  deleteTodo(testState, 0);
  if (testState.todos.length === 1) {
    console.log("TEST PASSED");
  } else {
    console.log("TEST FAILED", testState);
  }
}

function test() {
  testComplete();
  testDelete();
}