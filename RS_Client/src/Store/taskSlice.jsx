import { createSlice } from "@reduxjs/toolkit";

const initialtasks = {
  tasks: [],
};

const TaskSlice = createSlice({
  name: "tasks",
  initialState: initialtasks,
  reducers: {
    addTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export default TaskSlice;
