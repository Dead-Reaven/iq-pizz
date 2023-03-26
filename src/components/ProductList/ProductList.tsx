import { useDispatch, useSelector } from 'react-redux'
import PizzaCard from '../ProductCard/ProductCard'
import { clearProducts, addProduct, MenuTypes } from '../../features/orderSlice'
import { RootState } from '../../app/store'
import MultiSelectDropDown from '../UI/MultySelect'
import menu from '../../data/menu'
import './ProductList.css'

function ProductList() {
	const productsState = useSelector((state: RootState) => state.order.products)

	const dispatch = useDispatch()

	const onSelectProductHandle = (selectedProducts: MenuTypes) => {
		const length = selectedProducts.length
		if (length > productsState.length) {
			// if added new product to selected
			dispatch(
				addProduct({
					// add selected item to global state
					...selectedProducts[length - 1],
				})
			)
		} else if (selectedProducts.length === 0) dispatch(clearProducts())
	}

	return (
		<div className='pizza-list'>
			<div className='pizza-list_container'>
				<div className='pizza-list_container_flex   '>
					<div className='pizza-list_container_flex_block-add-poduct hide-checkbox'>
						<MultiSelectDropDown
							options={menu}
							value={productsState.map(({ label, id, price }) => {
								return { label, price, value: id }
							})}
							hasSelectAll={false}
							onChange={onSelectProductHandle}
							labelledBy='Обрати піццу'
						/>
					</div>
					{productsState.map((product) => (
						<PizzaCard product={product} key={product.id} />
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductList
