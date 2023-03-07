import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

// type ProductTypes = Array<{
// 	name: string
// 	addition?: Array<{ name: string; price: number }>
// 	comment: string
// 	quantity: number
// 	price: number
// 	id: string
// }>

interface OrderInfoTypes {
	store?: string // a store point adress
	name?: string
	tel?: string
	delivery_type?: string
	adress?: string
	time?: string
}

interface TestProductTypes {
	info: OrderInfoTypes
	data: Array<{ id: string; name: string }>
}

const initialState: TestProductTypes = {
	data: [],
	info: {
		store: '',
		name: '',
		tel: '',
		delivery_type: '',
		adress: '',
		time: '',
	},
}
const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		updateProducts: (state, action: PayloadAction<Array<{ name: string }>>) => {
			// takes new array with selected products and updates the state
			state.data = action.payload.map((product) => {
				return { name: product.name, id: nanoid() }
			})
		},
		delProduct: (state, action: PayloadAction<{ id: string }>) => {
			state.data = state.data.filter((el) => el.id !== action.payload.id)
		},
		updateInfo: (
			state,
			action: PayloadAction<{ key: keyof OrderInfoTypes; value: string }>
		) => {
			state.info[action.payload.key] = action.payload.value
		},
	},
})

export type { OrderInfoTypes }
export { orderSlice }
export const { updateProducts, delProduct, updateInfo } = orderSlice.actions
export default orderSlice.reducer
