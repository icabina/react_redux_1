import { createSlice } from "@reduxjs/toolkit";
let lastid = 0;
const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState: [],
  reducers: {
    //action => action handler
    projectAdded: (projects, action) => {
      //state is projects
      projects.push({
        id: ++lastid,
        name: action.payload.name,
      });
    },
  },
});
export const { projectAdded } = projectsSlice.actions;
export default projectsSlice.reducer;
