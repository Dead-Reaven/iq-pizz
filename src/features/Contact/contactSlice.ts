import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ContactSlice {
	value: any
}

const initialState: ContactSlice = {
	value: [],
}

const contactSlice = createSlice({
	name: 'productList',
	initialState,
	reducers: {},
})

export { contactSlice as customerSlice }
export const {} = contactSlice.actions
export default contactSlice.reducer
