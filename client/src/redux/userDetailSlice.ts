import {createSlice} from "@reduxjs/toolkit"

const userDetailSlice = createSlice({
    name:'user',
    initialState: {
        name: '',
        userId:'',
        authentication: false,
        AllUser: [],
        token:''
    },
    reducers:{
        addUserDetail(state, action){
            state.name = action.payload.name
            state.authentication = action.payload.authentication
            state.userId = action.payload.userId
            state.token = action.payload.token
        },
        allAllUsers(state, action){
            state.AllUser = [...action.payload] as any
        }
    }
})

export const {addUserDetail, allAllUsers} = userDetailSlice.actions

export default userDetailSlice.reducer