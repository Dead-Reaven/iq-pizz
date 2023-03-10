import React, { useState } from 'react'
import ProductDropdown from './components/UI/SearchAddition/SearchAddition'
import 'bootstrap/dist/css/bootstrap.min.css'

interface ProductType {
	products: Array<{
		label: string
		id: number
		price: number
		quantity: number
		isCheked: boolean
	}>
}

const App = () => {
	const options: ProductType['products'] = [
		{ label: 'Product 1', id: 0, price: 10, isCheked: false, quantity: 1 },
		{ label: 'Product 2', id: 1, price: 20, isCheked: false, quantity: 1 },
		{ label: 'Product 3', id: 2, price: 30, isCheked: false, quantity: 1 },
	]
	const [value, setValue] = useState<ProductType['products']>([])
	return (
		<div style={{ maxWidth: '400px', margin: 'auto' }}>
			<h1>Select products</h1>
			<ProductDropdown />
			<pre>{value.toString()}</pre>
		</div>
	)
}

export default App
