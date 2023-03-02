import { useDispatch, useSelector } from 'react-redux/es/exports'
import { RootState } from './app/store'
import ContactForm from './features/Contact/ContactForm'
import ProductList from './features/ProductList/ProductList'
import Order from './components/Order'
import './App.css'

function App() {
	return (
		<div className='App'>
			<div className='grid-container'>
				<header className='header'>
					<div className='header-container'>
						<nav>Замовлення</nav>
						<nav>Меню</nav>
						<nav>Торгові точки</nav>
					</div>
				</header>
				<ContactForm />
				<ProductList />
				<Order />
			</div>
		</div>
	)
}

export default App
