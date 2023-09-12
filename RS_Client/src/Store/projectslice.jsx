import { createSlice } from "@reduxjs/toolkit";

const initialproject = {
  projects: [],
};

const ProjectSlice = createSlice({
  name: "projects",
  initialState: initialproject,
  reducers: {
    addProjects(state, action) {
      state.projects = action.payload.reverse();
    },
  },
});

export default ProjectSlice;
