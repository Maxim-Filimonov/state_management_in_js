
// ** HACKY PART **
var state = stateFunctions.extend(initialState);
console.log(welcome(state));
start(state);
console.log(state.currentQuestion());