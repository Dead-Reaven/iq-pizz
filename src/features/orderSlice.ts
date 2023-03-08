import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

type AdditionTypes = Array<{ name: string; price: number }>

interface ProductTypes {
	readonly name: string
	readonly price: number
	readonly id: string
	addition?: AdditionTypes
	comment?: string
	quantity: number
	totalPrice: number
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
		addProduct: (
			state,
			action: PayloadAction<{ name: string; price: number }>
		) => {
			state.products.push({
				name: action.payload.name,
				price: action.payload.price,
				id: nanoid(),
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
				if (product.id === id) product.quantity = quantity

				return product
			})
		},
		updateAddition: (
			state,
			action: PayloadAction<{ id: string; addition: AdditionTypes }>
		) => {
			const { addition, id } = action.payload
			state.products = state.products.map((product) => {
				if (product.id === id) product.addition = addition

				return product
			})
		},

		updateProductPrice: (state, action: PayloadAction<{ id: string }>) => {
			// this function updates the product price  and calculates the quantity and addition food
			state.products = state.products.map((product) => {
				if (product.id === action.payload.id) {
					product.totalPrice = product.quantity * product.price
					if (product.addition?.length) {
						product.totalPrice +=
							product.quantity *
							product.addition.reduce((sum, product) => sum + product.price, 0)
					}
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

export type { OrderInfoTypes, ProductTypes, AdditionTypes }
export { orderSlice }
export const {
	clearProducts,
	updateQuantity,
	delProduct,
	updateInfo,
	addProduct,
	updateAddition,
	updateProductPrice,
} = orderSlice.actions
export default orderSlice.reducer
