import { useDispatch, useSelector } from 'react-redux'
import PizzaCard from '../ProductCard/ProductCard'
import { clearProducts, addProduct } from '../../features/orderSlice'
import { RootState } from '../../app/store'
import MultiSelectDropDown from '../UI/MultySelect'
import './ProductList.css'

type MenuTypes = Array<{ label: string; value: number; price: number }>

const menu: MenuTypes = [
	{ label: 'Паперони', value: 1, price: 99 },
	{ label: '4 сиру', value: 2, price: 129 },
	{ label: '4 мяса', value: 3, price: 110 },
	{ label: 'курка', value: 4, price: 90 },
	{ label: 'Салямі White 30', value: 5, price: 150 },
	{ label: 'Сирна салямі 30', value: 6, price: 120 },
	{ label: 'Маргарита 30', value: 7, price: 69 },
]

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
