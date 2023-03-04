import PizzaCard from '../PizzaCard/PizzaCard'
import './ProductList.css'

function ProductList() {
	return (
		<div className='pizza-list'>
			<div className='pizza-list_container'>
				<div className='pizza-list_container_flex'>
					<PizzaCard />
					<PizzaCard />
					<PizzaCard />
					<PizzaCard />
				</div>
			</div>
		</div>
	)
}

export default ProductList
