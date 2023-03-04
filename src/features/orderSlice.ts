import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderOptions {
	store: string // a store point adress
	contact: {
		name: string
		tel: string
	}
	deliveryType: {
		type: string | 'delviery' | 'self_delivery'
		adress?: string
	}
	time: string
}

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
