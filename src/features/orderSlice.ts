import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

type AdditionTypes = Array<{ name: string; price: number }>

type ProductTypes = {
	readonly name: string
	readonly price: number
	readonly id: string
	addition?: AdditionTypes
	comment?: string
	quantity: number
	totalPrice: number
}


interface orderTypes {
	products: Array<ProductTypes>
}

const initialState: orderTypes = {
	products: [],
}

const updateProductPrice = (products: Array<ProductTypes>, id: string) => {
	const product = products.find((product) => product.id === id)
	if (product) {
		product.totalPrice = product.quantity * product.price
		if (product.addition?.length) {
			product.totalPrice +=
				product.quantity *
				product.addition.reduce((sum, product) => sum + product.price, 0)
		}
		return product.totalPrice
	}
	return 0
}

const orderSlice = createSlice({
	name: 'products',
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
				if (product.id === id) {
					product.quantity = quantity
					product.totalPrice = updateProductPrice(state.products, id)
				}

				return product
			})
		},
		updateAddition: (
			state,
			action: PayloadAction<{ id: string; addition: AdditionTypes }>
		) => {
			const { addition, id } = action.payload
			state.products = state.products.map((product) => {
				if (product.id === id) {
					product.addition = addition
					product.totalPrice = updateProductPrice(state.products, id)
				}
				return product
			})
		},
		writeProductComment: (
			state,
			action: PayloadAction<{ id: string; comment: string }>
		) => {
			state.products = state.products.map((product) => {
				if (product.id === action.payload.id) {
					product.comment = action.payload.comment
				}
				return product
			})
		},
	},
})

export type { ProductTypes, AdditionTypes }
export { orderSlice }
export const {
	clearProducts,
	updateQuantity,
	delProduct,
	addProduct,
	updateAddition,
	writeProductComment,
} = orderSlice.actions
export default orderSlice.reducer
