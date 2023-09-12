import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userslice";
import ProjectSlice from "./projectslice";
import ClientSlice from "./clientSlice";
import MemberSlice from "./memberSlice";
import TaskSlice from "./taskSlice";
import ReportSlice from "./ReportSlice";

const store = configureStore({
  reducer: {
    task: TaskSlice.reducer,
    user: UserSlice.reducer,
    project: ProjectSlice.reducer,
    member: MemberSlice.reducer,
    client: ClientSlice.reducer,
    report: ReportSlice.reducer,
  },
});

export const userAction = UserSlice.actions;
export const projectAction = ProjectSlice.actions;
export const clientAction = ClientSlice.actions;
export const memberAction = MemberSlice.actions;
export const taskAction = TaskSlice.actions;
export const reportAction = ReportSlice.actions;
export default store;
