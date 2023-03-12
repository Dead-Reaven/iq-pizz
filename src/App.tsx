import { useState } from 'react'
import ProductDropdown, {
	Options,
} from './components/UI/SearchAddition/SearchAddition'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
	const options: Options[] = [
		{
			label: 'Pizza',
			price: 40,
			id: 0,
			quantity: 0,
			totalPrice: 0,
		},
		{
			label: 'Cacao',
			price: 39,
			id: 1,
			quantity: 0,
			totalPrice: 0,
		},
		{
			label: 'Moccachino',
			price: 119,
			id: 2,
			quantity: 0,
			totalPrice: 0,
		},
	]

	const [value, setValue] = useState<Options[]>(options)
	return (
		<div style={{ maxWidth: '400px', margin: 'auto' }}>
			<h1>Select products</h1>
			<ProductDropdown value={value} onChange={(value) => setValue(value)} />
			<pre>{value.map((el) => (el.isChecked ? el.label : '')).toString()}</pre>
		</div>
	)
}

export default App
