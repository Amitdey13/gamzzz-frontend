import { configureStore } from "@reduxjs/toolkit"
import boardReducer from "./features/board/boardSlice"
import moveReducer from "./features/move/moveSlice"

export default configureStore({
    reducer: {
        board: boardReducer,
        move: moveReducer
    },
})