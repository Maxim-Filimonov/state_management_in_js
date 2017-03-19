var state = {
  todos: []
};

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

// create - take some db and render it on the page
// UPDATE - state changes -- update dom tree
/// DELETE - element remove from the state - remove the representation of that element tree

// state -> user interface

function deleteTodo(e) {
  var index = parseInt($(e.target).parents("li").attr("id"));

  state.todos.splice(index, 1);

  save();
  render(state);
}

function toggleTodo(e) {
  var index = parseInt($(e.target).parents("li").attr("id"));

  var todo = state.todos[index];
  todo.completed = !todo.completed;

  render(state);
  save();
}

function save() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}

function render(state) {
  var htmlTodo = $(renderTodos(state.todos));
  htmlTodo.find("input:checkbox").click(toggleTodo);
  htmlTodo.find("input:button.js-delete").click(deleteTodo);
  $("#todos").html(htmlTodo);
}

function restore() {
  var storedTodo = localStorage.getItem("todos");
  if (storedTodo === "undefined") {
    storedTodo = JSON.stringify([]);
  }
  state.todos = JSON.parse(storedTodo);

  render(state);
}

$(function () {
  restore();

  $("#add-todo").click(function (e) {
    // Get the input from dom
    var newTodo = {
      text: $("#add-text").val(),
      completed: false
    }

    // Modify the state
    state.todos.push(newTodo);

    // render
    render(state)
    save();
  });

  $("#insert-todo").click(function (e) {
    // Get the input from dom
    var newTodo = {
      text: $("#add-text").val(),
      completed: false
    }

    // Modify the state
    state.todos.splice(0, 0, newTodo);

    // render
    render(state)
    save();
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


// function test() {
//   addTodo("Buy milk")
//   addTodo("Another")
//   completed("Buy Milk")
//   var completed = function (x) {
//     return x.completed;
//   }
//   if (state.todos.filter(completed) === 1) {
//     console.log("TEST PASSED");
//   } else {
//     console.log("TEST FAILED");
//   }
// }