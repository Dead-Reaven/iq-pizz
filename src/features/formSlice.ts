import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormTypes {
	store: string // a store point adress
	name: string
	tel: string
	delivery_type: string
	adress?: string
	time?: string
}

interface FormInterface {
	data: FormTypes
}

const initialState: FormInterface = {
	data: {
		store: '',
		name: '',
		tel: '',
		delivery_type: '',
		adress: '',
		time: '',
	},
}

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		updateForm: (
			state,
			action: PayloadAction<{ key: keyof FormTypes; value: string }>
		) => {
			state.data[action.payload.key] = action.payload.value
		},
	},
})

export type { FormTypes }
export { formSlice }
export const { updateForm } = formSlice.actions
export default formSlice.reducer
