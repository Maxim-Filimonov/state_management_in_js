var todos = [
  "Buy some milk",
  "Buy some water",
  "Clean the room"
]

function renderTodo(todo) {
  var labelBegin = "<label> " + todo;
  return labelBegin + "<input type='checkbox'/> </label>";
}

function renderTodos() {
  return todos.map(renderTodo);

}
function toggleTodo(e) {
  ($(e.target.parentElement).toggleClass("completed"))
}

$(function () {
  $("#todos").html(renderTodos());
  $("input:checkbox").click(toggleTodo);;

  $("#add-todo").click(function (e) {
    var newTodo = $("#add-text").val();
    var htmlTodo = $(renderTodo(newTodo));
    htmlTodo.find("input:checkbox").click(toggleTodo);
    $("#todos").append(htmlTodo);
  });

  $("#insert-todo").click(function (e) {
    var newTodo = $("#add-text").val();
    var htmlTodo = $(renderTodo(newTodo));
    htmlTodo.find("input:checkbox").click(toggleTodo);
    $("#todos").prepend(htmlTodo);
  });
});
