import { useState } from 'react'
import AdditionDropdown, {
	Options,
} from './components/UI/SearchAddition/SearchAddition'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import ContactForm from './components/ContactForm/ContactForm'
import ProductList from './components/ProductList/ProductList'
import OrderResult from './components/OrderResult'
import './App.css'

const App = () => {
	// const [value, setValue] = useState<Options[]>(options)
	// return (
	// 	<div style={{ maxWidth: '400px', margin: 'auto' }}>
	// 		<h1>Select products</h1>
	// 		<ProductDropdown value={value} onChange={(value) => setValue(value)} />
	// 		<pre>{value.map((el) => (el.isChecked ? el.label : '')).toString()}</pre>
	// 	</div>
	// )

	return (
		<div className='App'>
			<div className='grid-container'>
				<Header />
				<ContactForm />
				<ProductList />
				<OrderResult />
			</div>
		</div>
	)
}

export default App
