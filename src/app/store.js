import { configureStore } from '@reduxjs/toolkit'
import appreducer from '../reducers/app.reducer'


export const store = configureStore({
    reducer: {
        links: appreducer
    },
})