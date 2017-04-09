
/* Render functions */
function renderQuestion(question) {
  return "<li>" + question.title + "</li>"
}
function renderQuestions(questions) {
  return questions.map(renderQuestion);
}

function renderWelcome() {
  return welcome(state);
}
/*********** CLEAN THIS UP BEFORE GOING FORWARD **********/
function renderActions() {
  if (!state.isStarted()) {
    return {
      html: function () { return "<button type='button' id='startButton'>Start</button>" },
      addHandlers: function () {
        addHandler("#startButton", "click", function () {
          start(state)
          render();
        });
      }
    }
  } else {
    return {
      html: function () { return "Start the quiz" }
    };
  }
}

function render() {
  renderInto("#welcome", { html: renderWelcome });
  renderInto(".actions", renderActions());
}

/* Helpers */
function addHandler(selector, event, handler) {
  document.querySelector(selector).addEventListener(event, handler);
}
function renderInto(selector, renderElement) {
  document.querySelector(selector).innerHTML = renderElement.html();
  if (renderElement.addHandlers) {
    renderElement.addHandlers();
  }
}
// ** HACKY PART **
var state = stateFunctions.extend(initialState);
render();
// start(state);
// console.log(state.currentQuestion());