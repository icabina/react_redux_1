//MIDDLEWARE FUNCTION
//takes 3 parameters
//const logger = (store, next, action) => {};

//store
//next, next middleware, if is last, next is the reducer
//action, dispatched action

//CURRYING convert parameters into single functions with only 1 parameter
//const logger = (store) => (next) => (action) => {
const logger = (param) => (store) => (next) => (action) => {
  //param to pass parameters in middleware and keep store intact, otherwise store will turn into the parameters
  console.log("console", param);
  //console.log("store", store);
  //console.log("next", next);
  //console.log("action", action);
  //if we dont call next() pailas
  next(action); //pass the action
};

export default logger;
