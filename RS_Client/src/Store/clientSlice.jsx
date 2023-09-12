import { createSlice } from "@reduxjs/toolkit";

const initialclient = {
  clients: [],
};

const ClientSlice = createSlice({
  name: "clients",
  initialState: initialclient,
  reducers: {
    addClients(state, action) {
      state.clients = action.payload.reverse();
    },
  },
});

export default ClientSlice;
