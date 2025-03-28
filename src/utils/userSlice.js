import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name: 'user',
    initialState: null,
    reducers:{
        addUser: (state, action) => {
            const {data,status} = action.payload;
            return {data,status};
        },
        removeUser: (state) => {
            return null;
        },
    }
});

export const {addUser,removeUser} = userSlice.actions;
export default userSlice.reducer;
