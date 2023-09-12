import { createSlice } from "@reduxjs/toolkit";

const initialReport = {
  reports: [],
};

const ReportSlice = createSlice({
  name: "reports",
  initialState: initialReport,
  reducers: {
    addReports(state, action) {
      state.reports = action.payload.reverse();
    },
  },
});

export default ReportSlice;
