function renderTodo(todo) {
  var checked = "";
  var labelClass = "";
  if (todo.completed) {
    checked = "checked=checked"
    labelClass = "class='completed'"
  }
  var labelBegin = "<label " + labelClass + ">" + todo.text;
  return labelBegin + "<input type='checkbox' " + checked + "/> </label>";
}

function renderTodos(todos) {
  return todos.map(renderTodo);
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
  $("input:checkbox").click(toggleTodo);;

  $("#add-todo").click(function (e) {
    var newTodo = {
      text: $("#add-text").val(),
      completed: false
    }
    var htmlTodo = $(renderTodo(newTodo));
    htmlTodo.find("input:checkbox").click(toggleTodo);
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
