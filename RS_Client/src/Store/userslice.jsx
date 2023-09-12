import { createSlice } from "@reduxjs/toolkit";

const initialuser = {
  user: null,
  projects: [],
  clients: [],
  tasks: [],
  members: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialuser,
  reducers: {
    loggedIn(state, action) {
      action.payload.name = action.payload.email.substring(0, 2).toUpperCase();
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    addTasks(state, action) {
      state.tasks = action.payload;
    },
    addProjects(state, action) {
      state.projects = action.payload.reverse();
    },
    addClients(state, action) {
      state.clients = action.payload.reverse();
    },
    addMembers(state, action) {
      state.members = action.payload.reverse();
    },
  },
});

export default UserSlice;
