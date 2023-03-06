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

// interface OrderTypes {
// 	store: string // a store point adress
// 	contact: {
// 		name: string
// 		tel: string
// 	}

// 	deliveryType: {
// 		type: string | 'delviery' | 'self_delivery'
// 		adress?: string
// 		time?: string
// 	}

// 	food: ProductTypes
// }
// type TestProductTypes = Array<{
// 	id: string
// }>

interface TestProductTypes {
	data: Array<{ id: string; name: string }>
}
// 	id: string
// }>

const initialState: TestProductTypes = { data: [] }
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
	},
})

export { orderSlice }
export const { updateProducts, delProduct } = orderSlice.actions
export default orderSlice.reducer
