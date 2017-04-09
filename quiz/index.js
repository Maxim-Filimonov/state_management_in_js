
function renderQuestion(question) {
  return "<li>" + question.title + "</li>"
}
function renderQuestions(questions) {
  return questions.map(renderQuestion);
}
function render() {
  $("#welcome").html(welcome(state))
  // $(".questions").html(renderQuestions(state.questions));
}
// ** HACKY PART **
var state = stateFunctions.extend(initialState);
render();
// start(state);
// console.log(state.currentQuestion());