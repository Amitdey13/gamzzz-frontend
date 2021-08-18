import { createSlice } from "@reduxjs/toolkit";
export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        value: ["", "", "", "", "", "", "", "", ""]
    },
    reducers: {
        addMoves: (state, action) => {
            let temp = [...state.value]
            temp[action.payload.position] = action.payload.sign
            state.value = temp
        }
    }
})

export const { addMoves } = boardSlice.actions
export default boardSlice.reducer