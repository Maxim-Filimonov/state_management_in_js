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
  assertEqual(testState.currentQuestionAnswer().result, true);

  var result = select(testState, 1);
  assertEqual(testState.currentQuestionAnswer().result, false);
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
function testoverallResults() {
  var testState = {
    answers: [
      {
        result: true
      },
      {
        result: false
      }]
  }

  var result = overallResults(testState);
  assertEqual(result, testState.answers);
}

function testSelectWithoverallResults() {
  var testState = {
    questions: [{ correctChoiceIndex: 0 }, { correctChoiceIndex: 1 }]
  }
  stateFunctions.extend(testState);
  testState = start(testState);
  testState = select(testState, 0);
  testState = nextQuestion(testState)
  testState = select(testState, 0);
  var answers = overallResults(testState);
  var answerResults = answers.map(function (answer) {
    return answer.result;
  })

  assertEqual(answerResults[0], true);
  assertEqual(answerResults[1], false);
}

function testIsStarted() {
  var testState = {
    questions: [{ correctChoiceIndex: 0 }, { correctChoiceIndex: 1 }]
  }
  stateFunctions.extend(testState);

  assertEqual(testState.isStarted(), false, "quiz should not be started by default");

  start(testState);
  assertEqual(testState.isStarted(), true, "quiz should be started after the start");
}

function test() {
  testStartWithInitial();
  stateFunctionsTests();
  testSelect();
  testNextQuestion();
  testStartAgain();
  testoverallResults();
  testSelectWithoverallResults();
  testIsStarted()
}

/*** Test Helpers ***/
function assertEqual(actual, expected, message) {
  if (actual === expected) {
    console.log("PASS");
  } else {
    if (message === undefined) {
      message = "";
    }
    console.error("FAIL:" + message, arguments.callee.caller.name, actual, expected);
  }
}