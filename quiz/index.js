var initialState = {
  currentQuestionIndex: undefined,
  questions: [
    {
      title: 'What is javascript closujre?',
      choices: ["It's magic", 'the combination of a function and the lexical environment within which that function was declared.'],
      correctChoiceIndex: 1
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
  return nextQuestion(state);
}
function select(state, choiceIndex) {
  return state.currentQuestion().correctChoiceIndex === choiceIndex;
}

/**** Tests *****/
function testStartWithInitial() {
  var testState = {};
  var changedState = start(testState);
  var actual = changedState.currentQuestionIndex;
  if (actual === 0) {
    console.log("PASS");
  } else {
    console.error("FAIL");
  }
}
function stateFunctionsTests() {
  var testState = { questions: ['42?'], currentQuestionIndex: 0 };
  var changedState = stateFunctions.extend(testState);
  var actual = changedState.currentQuestion();

  if (actual === "42?") {
    console.log("PASS");
  } else {
    console.error("FAIL");
  }

  testState.currentQuestionIndex = 1;
  testState.questions = ['42?', 'Why?'];

  var changedState = stateFunctions.extend(testState);
  var actual = changedState.currentQuestion();

  if (actual === "Why?") {
    console.log("PASS");
  } else {
    console.error("FAIL");
  }
}
function testStartAgain() { }

function testSelect() {
  var testState = {
    currentQuestionIndex: 0,
    questions: [
      {
        title: '42?',
        choices: [42, 2, 3, 4],
        correctChoiceIndex: 0
      }
    ]
  };
  stateFunctions.extend(testState);

  var result = select(testState, 0);
  if (result === true) {
    console.log("PASS");
  } else {
    console.error("FAIL");
  }

  var result = select(testState, 1);
  if (result === false) {
    console.log("PASS");
  } else {
    console.error("FAIL");
  }
}
function testNextQuestion() {
  var testState = {
    currentQuestionIndex: 0,
    questions: [{ title: 'How much?' }, { title: "Why?" }]
  };
  var changedState = nextQuestion(testState);
  var actual = changedState.currentQuestionIndex;
  var expected = 1;
  if (actual == expected) {
    console.log("PASS");
  } else {
    console.error("FAIL");
  }
}

function test() {
  testStartWithInitial();
  stateFunctionsTests();
  testSelect();
  testNextQuestion();
}

// ** HACKY PART **
var state = stateFunctions.extend(initialState);
console.log(welcome(state));
start(state);
console.log(state.currentQuestion());