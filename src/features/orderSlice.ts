import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import getTotalProductPrice from '../utils/updateProductPrice'
import { nanoid } from 'nanoid'

type AdditionTypes = Array<{
	label: string
	value: string // id
	price: number
	ico?: string
}>

type ProductTypes = {
	readonly label: string
	readonly price: number // per one item
	readonly id: string
	addition?: AdditionTypes // additional food for product
	comment?: string
	quantity: number // quantity of product items
	totalPrice: number // per full order
}

interface orderTypes {
	products: Array<ProductTypes>
}

const initialState: orderTypes = {
	products: [],
}

const orderSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (
			state,
			action: PayloadAction<{ label: string; price: number }>
		) => {
			state.products.push({
				label: action.payload.label,
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

		setProductQuantity: (
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) => {
			const { quantity, id } = action.payload
			state.products = state.products.map((product) => {
				if (product.id === id) {
					product.quantity = quantity
					product.totalPrice = getTotalProductPrice(state.products, id)
				}

				return product
			})
		},
		setProductAddition: (
			state,
			action: PayloadAction<{ id: string; addition: AdditionTypes }>
		) => {
			const { addition, id } = action.payload
			state.products = state.products.map((product) => {
				if (product.id === id) {
					product.addition = addition
					product.totalPrice = getTotalProductPrice(state.products, id)
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
	setProductQuantity,
	delProduct,
	addProduct,
	setProductAddition,
	writeProductComment,
} = orderSlice.actions
export default orderSlice.reducer
