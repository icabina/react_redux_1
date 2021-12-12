import { createSlice } from "@reduxjs/toolkit";
let lastid = 0;
const usersSlide = createSlice({
  name: "usersSlide",
  initialState: [],
  reducers: {
    //userAdded defines action type everywhere
    userAdded: (users, action) => {
      //state is projects
      users.push({
        //we can mutate because we are using redux-toolkit, which uses immer.js library to convert mutating to non-mutating code
        id: ++lastid,
        name: action.payload.name,
      });
    },
  },
});
export const { userAdded } = usersSlide.actions;
export default usersSlide.reducer;
