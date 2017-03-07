function renderTodo(todo) {
  var checked = "";
  var labelClass = "";
  if (todo.completed) {
    checked = "checked=checked"
    labelClass = "class='completed'"
  }
  var labelBegin = "<li><label " + labelClass + ">" + todo.text;
  var deleteButton = "<input type='button' value='Deletel' class='js-delete'/>";
  return labelBegin + "<input type='checkbox' " + checked + "/> </label>" + deleteButton + "</li>";
}

function renderTodos(todos) {
  return todos.map(renderTodo);
}

function removeTodo(e) {
  $(e.target.parentElement.remove())
  save();
}

function toggleTodo(e) {
  ($(e.target.parentElement).toggleClass("completed"))
  save();
}

function save() {
  var todos = $("input:checkbox").get().map(function (chk) {
    var completed = $(chk.parentElement).hasClass("completed");
    var text = $(chk.parentElement).text()
    return {
      completed: completed,
      text: text
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos))
}

function restore() {
  var todosSaved = JSON.parse(localStorage.getItem("todos"))
  $("#todos").html(renderTodos(todosSaved));
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
