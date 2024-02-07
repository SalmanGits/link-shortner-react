import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    links: [],
    isAuthenticated: false
}

export const appSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setLinks: (state, action) => {
            state.links = action.payload
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        }


    },
})

export const { setLinks, setAuthenticated } = appSlice.actions

export default appSlice.reducer