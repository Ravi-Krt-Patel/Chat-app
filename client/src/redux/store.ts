import {configureStore} from "@reduxjs/toolkit"
import userDetail from "./userDetailSlice"

export const store = configureStore({
    reducer:{
        userDetail
    }
})