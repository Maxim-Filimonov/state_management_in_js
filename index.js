var todos = [
  "Buy some milk",
  "Buy some water",
  "Clean the room"
]

function renderTodos() {
  return todos.map(function (todo) {
    return "<li>" + todo + "</li>";
  });
}

$(function () {
  $("#todos").html(renderTodos());
})