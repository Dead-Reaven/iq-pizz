import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CustomerSlice {
	value: Array<{ name: string; id: number; order: Array<string> }>
}

const initialState: CustomerSlice = {
	value: [],
}

const customerSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {
		addCustomer: (
			state,
			action: PayloadAction<{ name: string; id: number }>
		) => {
			state.value.push({
				name: action.payload.name,
				id: action.payload.id,
				order: [],
			})
		},

		addOrder: (state, action: PayloadAction<{ id: number; order: string }>) => {
			const { id, order } = action.payload
			const customerId = state.value.findIndex((customer) => customer.id === id)
			state.value[customerId].order.push(order)
		},
	},
})

export { customerSlice }
export const { addCustomer, addOrder } = customerSlice.actions
export default customerSlice.reducer
