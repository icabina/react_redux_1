//import { createStore } from "redux";
//import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";
import toast from "./middleware/toast";
import api from "./middleware/api";
/* import { getDefaultMiddleware } from "@reduxjs/toolkit"; */

//higher order function, takes funciton as parameter

export default function cs() {
  //const store = createStore(
  //reducer,
  //==========================
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //==========================
  //store enhancer for tracing: npm i redux-devtools-extension
  //Higher order function
  //pass an object to configure the store enhancer to enable trace
  //devToolsEnhancer({
  // trace: true,
  //})
  //reducer: reducer
  //const store =
  //return configureStore({ reducer, middleware: [logger("console")] });
  return configureStore({
    reducer,
    //middleware: [thunk, logger({ destination: "console" })],
    middleware: [
      /* (getDefaultMiddleware) => [
      ...getDefaultMiddleware(), //to get thunk, and not override with custom middlewares */
      logger({ destination: "log to console the middleware" }),
      func,
      toast,
      api,
    ],
    //With func (thunk in toolkit), we can dispatch functions
  });
  //return store;
}
