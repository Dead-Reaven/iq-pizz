import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FoodTypes = Array<{
	name: string
	addition?: Array<{ name: string; price: number }>
	comment: string
	quantity: number
	price: number
	id: string
}>

interface OrderOptions {
	store: string // a store point adress
	contact: {
		name: string
		tel: string
	}

	deliveryType: {
		type: string | 'delviery' | 'self_delivery'
		adress?: string
		time?: string
	}

	food: FoodTypes
}

const initialState: any = {}

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
})

export {}
export const {} = orderSlice.actions
export default orderSlice.reducer
