import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '../features/orderSlice'
import formSlice from '../features/formSlice'
export const store = configureStore({
	reducer: { order: orderSlice, form: formSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
