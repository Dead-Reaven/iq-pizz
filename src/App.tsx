import ContactForm from './components/ContactForm/ContactForm'
import ProductList from './components/ProductList/ProductList'
import OrderResult from './components/OrderResult'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
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
