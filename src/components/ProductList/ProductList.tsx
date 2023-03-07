import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import PizzaCard from '../PizzaCard/PizzaCard'
import { updateProducts } from '../../features/orderSlice'
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
	const products = useSelector((state: RootState) => state.order.products)
	const dispatch = useDispatch()
	const [selectedProducts, setSelectedProducts] = useState<MenuTypes>([])

	useEffect(() => {
		dispatch(
			updateProducts(
				selectedProducts.map(({ label, value, price }) => {
					return { name: label, price: price } // menu[value - 1].price }
				})
			)
		)
		console.log(selectedProducts)
	}, [selectedProducts])

	return (
		<div className='pizza-list'>
			<div className='pizza-list_container'>
				<div className='pizza-list_container_flex   '>
					<div className='pizza-list_container_flex_block-add-poduct hide-checkbox'>
						<MultiSelectDropDown
							options={menu}
							value={products.map(({ name, id, price }) => {
								return { label: name, value: id, price }
							})}
							hasSelectAll={false}
							onChange={setSelectedProducts}
							labelledBy='Обрати піццу'
						/>
					</div>

					{products.map(({ name, id, price, quantity }) => (
						<PizzaCard
							name={name}
							id={id}
							price={price}
							quantity={quantity}
							key={id}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductList
