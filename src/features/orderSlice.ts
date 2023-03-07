import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

interface ProductTypes {
	name: string
	// addition?: Array<{ name: string; price: number }>
	// comment?: string
	quantity?: number | 1
	price: number
	id: string
}

interface OrderInfoTypes {
	store: string // a store point adress
	name: string
	tel: string
	delivery_type: string
	adress?: string
	time?: string
}

interface orderTypes {
	info: OrderInfoTypes
	products: Array<ProductTypes>
}

const initialState: orderTypes = {
	products: [],
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
		updateProducts: (
			state,
			action: PayloadAction<Array<{ name: string; price: number }>>
		) => {
			state.products = action.payload.map((product) => {
				return { name: product.name, id: nanoid(), price: product.price }
			})
			console.log(action.payload);
		},
		delProduct: (state, action: PayloadAction<{ id: string }>) => {
			state.products = state.products.filter(
				(el) => el.id !== action.payload.id
			)
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) => {
			state.products = state.products.map((product) => {
				if (product.id === action.payload.id)
					product.quantity = action.payload.quantity

				return product
			})
		},

		updateInfo: (
			state,
			action: PayloadAction<{ key: keyof OrderInfoTypes; value: string }>
		) => {
			state.info[action.payload.key] = action.payload.value
		},
	},
})

export type { OrderInfoTypes, ProductTypes }
export { orderSlice }
export const { updateProducts, updateQuantity, delProduct, updateInfo } =
	orderSlice.actions
export default orderSlice.reducer
