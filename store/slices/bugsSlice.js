//DUCKS PATTERN
import {
  /* createAction, createReducer, */ createSlice,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../middleware/apiActions";
import moment from "moment";

//actionTypes
//const BUG_ADDED = "bugAdded";
//const BUG_REMOVED = "bugRemoved";
//const BUG_RESOLVED = "bugResolved";

//actionCreators
/* export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description, // description: description
  },
}); */
//let lastId = 0;
//============================
//give it a configuration object with properties
const bugsSlice = createSlice({
  name: "bugs",
  //initialState: [],
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  //********************************************************
  //REDUCERS
  reducers: {
    //map actions => action handlers
    //********************************************************
    bugsRequested: (bugs, action) => {
      //defining a reducer like this creates an action as well, of the type bugsRequested
      bugs.loading = true; //set the state to true
    },
    //********************************************************
    bugsRequestedFailed: (bugs, action) => {
      bugs.loading = false; //set the state to true
    },
    //********************************************************
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload; //SETS THE STATE after receiving action from middleware api
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    //********************************************************
    bugAssignedToUser: (bugs, action) => {
      //object destructuring from action payload
      const { id: bugId, userId } = action.payload;
      //because we passed bugID and userId from dispatch
      //look it up in the array of bugs in the state
      //index is position where item is first found before a repetition
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      //next go to the array and set userId to this const index, new property userId
      //remember, we are mutating the state, because toolkit + immer.js
      bugs.list[index].userId = userId;
    },
    //********************************************************
    /*  bugRemoved: (bugs, action) => {
      return bugs.filter((bug) => bug.id !== action.payload.id);
    }, */
    //********************************************************
    bugAdded: (bugs, action) => {
      bugs.list.push(
        action.payload /* {
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      } */
      );
    },
    //********************************************************
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      //mutating code
      bugs.list[index].resolved = true;
    },
    //********************************************************
  },
});
//console.log("the bugSlice:", bugsSlice); //has actions
//============================
//OBJECT DESTRUCTURING
/* export */ const {
  bugAdded,
  bugResolved,
  /* bugRemoved, */
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestedFailed,
} = bugsSlice.actions;
export default bugsSlice.reducer;
//============================
//============================
//============================
//============================
//============================
//============================
const global = "/bugs";

//ACTION CREATOR
//load bugs is a function which call another function to pass dispatch and getState, and create lastFetch
//also  dispatch from there the action
export const loadBugs = () => (dispatch, getState) => {
  //get lastFetch property
  const { lastFetch } = getState().entities.bugs;
  //console.log("lastFetch", lastFetch);
  //Now moment difference with lastFetch moment
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      //use the action and send payload
      url: global,
      //method: "get", by default get is used
      //data: {},
      onStart: bugsRequested.type, //this is refering the objet destructured
      onSuccess: bugsReceived.type, //the type gets defined automatically when createAction()
      //onError: apiActions.apiCallFailed.type, //whatever
      onError: bugsRequestedFailed.type,
    })
  );
};
//============================
//ACTION CREATOR
export const addBug = (bug) =>
  apiCallBegan({
    url: global,
    method: "post",
    data: bug, //bug object
    onSuccess: bugAdded.type, //do this action
  });

//============================
//ACTION CREATOR
export const resolveBug = (id) =>
  apiCallBegan({
    url: global + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });
//============================
//ACTION CREATOR
export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: global + "/" + bugId,
    method: "patch",
    data: { userId }, //object with the single property we are going to update
    onSuccess: bugAssignedToUser.type, //do this reducer action to set state after api call success
  });
//============================
//============================
//============================
//SELECTOR FUNCTIONS
//takes the state and returns the computed state
//This selector doesnt use cache, beacause it creates an array everytime

//give input and output
//input is state
//output is operation on state

//BEFORE MEMOIZE
//export const getUnresolvedBugs = (state) =>
//should take state and return computed state
//state.entities.bugs.filter((bug) => !bug.resolved);//filter creates another array

//AFTER MEMOIZE with reselect library
//THIS SELECTOR WILL RETURN THE RESULT FROM THE CACHE
export const getUnresolvedBugs = createSelector(
  //createSelector from reselect to Memoize, give it input with selector
  //INPUT
  (state) => state.entities.bugs, //selector function
  (state) => state.entities.projects, //selector function
  //OUTPUT: result function, takes inputs as parameters
  //here we compute the inputs, in this case we want to filter
  (bugs, projects) => bugs.list.filter((bug) => !bug.resolved) //result function
  //if the list of bugs or projects doesnt change, logic filter will not be applied
);
//============================
//export const getBugsByUser = createSelector(
//give it an id so activates the createSelector
export const getBugsByUser = (userId) =>
  createSelector(
    //we pass the state from index dispatch with store.getState
    (state) => state.entities.bugs, //first arg, input (in this case a selector function for the state)
    //bugs => bugs.filter(bug => bug.userId === ????)
    (bugs) => bugs.filter((bug) => bug.userId === userId) //second arg , output
  );
//============================
//export const bugAdded = createAction("bugAdded");

/* export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id, // id: id
  },
}); */
//export const bugResolved = createAction("bugResolved");

/* export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: {
    id: id,
  },
}); */
//export const bugRemoved = createAction("bugRemoved");

//reducer

//********************
//redux toolkit
//param 1: initial state
//param 2: object mmaps actions to functions that handle those actions (event => event handler
//********************
/* export default createReducer([], {
  //bugAdded: (bugs, action) => {
  [bugAdded.type]: (bugs, action) => {
    //[bugAdded.type] calculates the name of action dinamically
    //mutating code, no ...obj,
    //redux toolkit uses immer
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },

  //bugResolved: (bugs, action) => {
  [bugResolved.type]: (bugs, action) => {
    //state parameter can be renamed to whatever in reduxtoolkit, to bugs
    const index = bugs.findIndex((bug) => bug.id === action.payload.id);
    //mutating code
    bugs[index].resolved = true;
  },
}); */
//********************
/* export default function reducer(state = [], action) {
  switch (action.type) {
    //case BUG_ADDED:
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    //case BUG_REMOVED:
    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);

    //case BUG_RESOLVED:
    case bugResolved.type:
      //update if each if id is the one, update with immutability
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    //neither
    default:
      return state;
  }
} */
