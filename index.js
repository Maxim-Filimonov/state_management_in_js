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
  return todos.map(renderTodo);
}

function removeTodo(e) {
  var index = parseInt($(e.target).parents("li").attr("id"));
  state.todos.splice(index, 1);

  $(e.target.parentElement.remove())
  save();
}

function toggleTodo(e) {
  var index = parseInt($(e.target).parents("li").attr("id"));
  var todo = state.todos[index];
  todo.completed = !todo.completed;

  ($(e.target.parentElement).toggleClass("completed"))
  save();
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

  $("#todos").html(renderTodos(state.todos));
}

$(function () {
  restore();
  $("input:checkbox").click(toggleTodo);
  $("input:button.js-delete").click(removeTodo);

  $("#add-todo").click(function (e) {
    var newTodo = {
      text: $("#add-text").val(),
      completed: false
    }
    state.todos.push(newTodo);
    var htmlTodo = $(renderTodo(newTodo));
    htmlTodo.find("input:checkbox").click(toggleTodo);
    htmlTodo.find("input:button.js-delete").click(removeTodo);

    $("#todos").append(htmlTodo);
    save();
  });

  $("#insert-todo").click(function (e) {
    var newTodo = {
      text: $("#add-text").val(),
      completed: false
    }

    var htmlTodo = $(renderTodo(newTodo));
    htmlTodo.find("input:checkbox").click(toggleTodo);
    htmlTodo.find("input:button.js-delete").click(removeTodo);

    $("#todos").prepend(htmlTodo);
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
