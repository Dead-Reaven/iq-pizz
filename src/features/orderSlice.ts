import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

interface ProductTypes {
	readonly name: string
	// addition?: Array<{ name: string; price: number }>
	// comment?: string
	readonly price: number
	quantity?: number
	totalPrice?: number
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
		addProduct: (state, action: PayloadAction<ProductTypes>) => {
			state.products.push({
				name: action.payload.name,
				price: action.payload.price,
				id: action.payload.id,
				quantity: 1,
				totalPrice: action.payload.price,
			})
		},

		clearProducts: (state) => {
			state.products = []
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
			const { quantity, id } = action.payload
			state.products = state.products.map((product) => {
				if (product.id === id) {
					product.quantity = quantity
					product.totalPrice = product.price * quantity
				}

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
export const {
	clearProducts,
	updateQuantity,
	delProduct,
	updateInfo,
	addProduct,
	// updatePrice,
} = orderSlice.actions
export default orderSlice.reducer
