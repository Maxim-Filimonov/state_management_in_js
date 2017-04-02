var initialState = {
  currentQuestionIndex: undefined,
  questions: [
    {
      title: 'What is javascript closujre?',
      choices: ["It's magic", 'the combination of a function and the lexical environment within which that function was declared.'],
      correctChoiceIndex: 1
    },
    {
      title: 'What is variable hoisting?',
      choices: ["the variable declaration is moved to the top of the scope where it is declared.", 'dunno'],
      correctChoiceIndex: 0
    }
  ],
  welcomeMessage: 'Hi, Welcome to Get To Know JavaScript Quiz',
}

var stateFunctions = {
  currentQuestion: function () {
    return this.questions[this.currentQuestionIndex];
  },
  extend: function (state) {
    return Object.assign(state, stateFunctions);
  }
}

function welcome(state) {
  return state.welcomeMessage;
}

function nextQuestion(state) {
  if (state.currentQuestionIndex !== undefined) {
    state.currentQuestionIndex++;
  } else {
    state.currentQuestionIndex = 0;
  }
  return state;
}

function start(state) {
  state.currentQuestionIndex = undefined;
  return nextQuestion(state);
}
function select(state, choiceIndex) {
  return state.currentQuestion().correctChoiceIndex === choiceIndex;
}

// ** HACKY PART **
var state = stateFunctions.extend(initialState);
console.log(welcome(state));
start(state);
console.log(state.currentQuestion());