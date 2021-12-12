import axios from "axios";
import * as apiActions from "./apiActions";

//=======================
/* const action = {
  type: "call", //whatever
  payload: {
    url: "/bugs",
    method: "get",
    data: {},
    onSuccess: "bugsReceived", //whatever
    onError: "apiFailed", //whatever
  },
}; */
//=======================
//const api =  (store) =>  (next) =>  async (action) => {
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    //==================================
    // NO apiCallBegan
    if (action.type !== apiActions.apiCallBegan.type) return next(action);
    //==================================
    //OTHERWISE...
    const { url, method, data, onStart, onSuccess, onError } = action.payload;
    //WE GIVE THE ABILITY TO DISPATCH BEFORE MAKING CALL
    if (onStart) dispatch({ type: onStart }); //this is for the loader, loadBugs brings onStart property

    // YES apiCallBegan
    //Just put it there
    next(action); //so it appears in redux devtools

    //1.api call, axios
    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url, // url: url //bugs
        method, //method: method
        data, //data: data
      });

      //if goes well
      //General succcess
      dispatch(apiActions.apiCallSuccess(response.data)); //payload of this action
      //Specific action
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      //General error
      dispatch(apiActions.apiCallFailed(error.message));
      //specific error
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };
export default api;
