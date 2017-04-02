function testStartWithInitial() {
  var testState = {};
  var changedState = start(testState);
  var actual = changedState.currentQuestionIndex;
  assertEqual(actual, 0)
}
function stateFunctionsTests() {
  var testState = { questions: ['42?'], currentQuestionIndex: 0 };
  var changedState = stateFunctions.extend(testState);
  var actual = changedState.currentQuestion();

  assertEqual(actual, "42?")

  testState.currentQuestionIndex = 1;
  testState.questions = ['42?', 'Why?'];

  var changedState = stateFunctions.extend(testState);
  var actual = changedState.currentQuestion();

  assertEqual(actual, "Why?")
}

function testStartAgain() {
  var testState = { currentQuestionIndex: 10 };
  var changedState = start(testState);
  var actual = changedState.currentQuestionIndex;
  assertEqual(actual, 0)
}

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
  assertEqual(result, true);

  var result = select(testState, 1);
  assertEqual(result, false);
}
function testNextQuestion() {
  var testState = {
    currentQuestionIndex: 0,
    questions: [{ title: 'How much?' }, { title: "Why?" }]
  };
  var changedState = nextQuestion(testState);
  var actual = changedState.currentQuestionIndex;
  var expected = 1;

  assertEqual(actual, expected);
}

function test() {
  testStartWithInitial();
  stateFunctionsTests();
  testSelect();
  testNextQuestion();
  testStartAgain();
}

/*** Test Helpers ***/
function assertEqual(actual, expected) {
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.error("FAIL", arguments.callee.caller.name);
  }
}