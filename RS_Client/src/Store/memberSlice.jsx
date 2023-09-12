import { createSlice } from "@reduxjs/toolkit";

const initialMember = {
  members: [],
};

const MemberSlice = createSlice({
  name: "members",
  initialState: initialMember,
  reducers: {
    addMembers(state, action) {
      state.members = action.payload.reverse();
    },
  },
});

export default MemberSlice;
