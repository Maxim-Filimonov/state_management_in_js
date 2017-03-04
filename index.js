var todos = [
  "Buy some milk",
  "Buy some water",
  "Clean the room"
]

function renderTodos() {
  return todos.map(function (todo) {
    var labelBegin = "<label> " + todo;
    return labelBegin + "<input type='checkbox'/> </label>";
  });
}

$(function () {
  $("#todos").html(renderTodos());
  $("input:checkbox").click(function (e) {

    if ($(e.target.parentElement).hasClass("completed")) {
      $(e.target.parentElement).removeClass("completed");
    } else {
      $(e.target.parentElement).addClass("completed");
    }
  });;
});
