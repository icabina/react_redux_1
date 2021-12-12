//const func = (store) => (next) => (action) => {
//THUNK COMES IN TOOLIK, in middlewares in configureStore, add [...defaultMiddlewares, logger, toast]
const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //if (typeof action === "function") action();
    //***********then WE CALL THE FUNCTION "action()"
    if (typeof action === "function") action(dispatch, getState);
    //dispatch function
    //otherwise if is plain middleware object pass it
    else next(action);
    //else pass the action to the next middleware or reducer
  };

export default func;
