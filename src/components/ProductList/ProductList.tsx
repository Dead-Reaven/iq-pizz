import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import PizzaCard from '../PizzaCard/PizzaCard'
import { addProduct } from '../../features/orderSlice'
import { RootState } from '../../app/store'
import './ProductList.css'
import MultiSelectDropDown from '../UI/MultySelect'

const options = [
	{ label: 'Паперони', value: '1' },
	{ label: '4 сиру', value: '2' },
	{ label: '4 мяса', value: '3' },
	{ label: 'курка', value: '4' },
	{ label: 'Салямі White 30', value: '5' },
	{ label: 'Сирна салямі 30', value: '6' },
	{ label: 'Маргарита 30', value: '7' },
]

function ProductList() {
	const orderData = useSelector((state: RootState) => state.order.data)
	const dispatch = useDispatch()
	const [selected, setSelected] = useState<
		Array<{ label: string; value: string }>
	>([])
	const pushToState = (name: string) => {
		// dispatch(addProduct({ name }))
	}
	useEffect(() => {
		const lastItem = selected[selected.length - 1]

		if (lastItem) {
			// setSelected([lastItem])
			dispatch(addProduct({ name: lastItem?.label }))
		}
	}, [selected])

	// useEffect(() => {
	// 	return () => setSelected([])
	// }, [orderData])

	return (
		<div className='pizza-list'>
			<div className='pizza-list_container'>
				<div className='pizza-list_container_flex   '>
					<div className='pizza-list_container_flex_block-add-poduct hide-checkbox'>
						<MultiSelectDropDown
							options={options}
							value={selected}
							hasSelectAll={false}
							onChange={setSelected}
							labelledBy='Обрати піццу'
						/>
					</div>

					{orderData.map(({ name, id }) => (
						<PizzaCard id={id} name={name} key={id} />
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductList
