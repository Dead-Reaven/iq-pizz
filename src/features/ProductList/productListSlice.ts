import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductListSlice {
	value: any
}

const initialState: ProductListSlice = {
	value: [],
}

const productListSlice = createSlice({
	name: 'productList',
	initialState,
	reducers: {},
})

export { productListSlice as customerSlice }
export const {} = productListSlice.actions
export default productListSlice.reducer
