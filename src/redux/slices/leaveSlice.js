import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingLeaves: [], // Pending tab ka data
  rejectedLeaves: [], // Rejected tab ka data
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    setPendingLeaves: (state, action) => {
      state.pendingLeaves = action.payload;
    },
    rejectLeave: (state, action) => {
      const rejectedLeave = state.pendingLeaves.find(
        (leave) => leave.id === action.payload
      );

      if (rejectedLeave) {
        state.rejectedLeaves.push(rejectedLeave); 
        state.pendingLeaves = state.pendingLeaves.filter(
          (leave) => leave.id !== action.payload
        ); // ✅ Pending se remove karega
      }
    },
  },
});

export const { setPendingLeaves, rejectLeave } = leaveSlice.actions;
export default leaveSlice.reducer;
