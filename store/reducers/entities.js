import { combineReducers } from "redux";
import bugsReducer from "../slices/bugsSlice";
import projectsReducer from "../slices//projectsSlice";
import usersReducer from "../slices//usersSlice";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer,
});
