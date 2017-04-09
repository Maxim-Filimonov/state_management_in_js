
function renderQuestion(question) {
  return "<li>" + question.title + "</li>"
}
function renderQuestions(questions) {
  return questions.map(renderQuestion);
}
function renderInto(selector, renderFunc) {
  document.querySelector(selector).innerHTML = renderFunc();
}
function render() {
  renderInto("#welcome", function () { return welcome(state); });
}
// ** HACKY PART **
var state = stateFunctions.extend(initialState);
render();
// start(state);
// console.log(state.currentQuestion());