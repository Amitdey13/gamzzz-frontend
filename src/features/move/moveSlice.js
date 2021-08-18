import { createSlice } from "@reduxjs/toolkit";
export const moveSlice = createSlice({
  name: "move",
  initialState: {
    value: {
      turn: false,
      number: 0
    }
  },
  reducers: {
    setMove: (state, action) => {
      state.value.turn = action.payload
    },
    increaseMove: (state,action) => {
      state.value.number++
    }
  },
});

export const { setMove, increaseMove } = moveSlice.actions;
export default moveSlice.reducer;
