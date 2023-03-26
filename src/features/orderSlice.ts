import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import getTotalProductPrice from '../utils/updateProductPrice'
import { nanoid } from 'nanoid'

interface AdditionTypes {
	label: string
	price: number
	id: string
	quantity: number
	totalPrice: number
	isChecked: boolean
}
interface BorderTypes {
	label: string
	price: number
	id: string
}

type ProductTypes = {
	readonly label: string
	readonly price: number // per one item
	readonly id: string
	addition: Array<AdditionTypes> // additional food for product
	border?: BorderTypes // can be only one item. use RadioSelect
	comment?: string
	quantity: number // quantity of product items
	totalPrice: number // per full order
}

type MenuTypes = Array<{
	label: string
	price: number
	value: any
}>

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
				addition: [],
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
		addProductAddition: (
			state,
			action: PayloadAction<{ id: string; addition: Array<AdditionTypes> }>
		) => {
			state.products = state.products.map((product) => {
				if (product.id === action.payload.id) {
					product.addition = action.payload.addition
					product.totalPrice = getTotalProductPrice(state.products, product.id)
				}
				return product
			})

			// console.log(action.payload.id)
		},

		changeProductBorder: (
			state,
			action: PayloadAction<{
				id: string
				border: BorderTypes
			}>
		) => {
			state.products = state.products.map((product) => {
				if (product.id === action.payload.id) {
					product.border = action.payload.border
					product.totalPrice = getTotalProductPrice(state.products, product.id)
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

export type { ProductTypes, AdditionTypes, BorderTypes, MenuTypes }
export { orderSlice }
export const {
	clearProducts,
	setProductQuantity,
	delProduct,
	addProduct,
	addProductAddition,
	writeProductComment,
	changeProductBorder,
} = orderSlice.actions
export default orderSlice.reducer
