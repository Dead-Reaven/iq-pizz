import { useEffect, useState } from 'react'
import MultiSelectDropDown from '../UI/MultySelect'
import { RiDeleteBin6Line } from 'react-icons/ri'
import {
	delProduct,
	updateQuantity,
	updateAddition,
	writeProductComment,
} from '../../features/orderSlice'
import { ProductTypes, AdditionTypes } from '../../features/orderSlice'
import { useDispatch } from 'react-redux'
import './PizzaCard.css'

const options = [
	{ label: 'Виноград 🍇', value: '1', price: 20 },
	{ label: 'Манго 🥭', value: '2', price: 10 },
	{ label: 'Полуниця 🍓', value: '3', price: 40 },
	{ label: 'Сир 🧀', value: '4', price: 50 },
	{ label: 'Бекон 🥓', value: '5', price: 30 },
	{ label: 'Полуниця 🍓', value: '6', price: 29 },
	{ label: 'Сир 🧀', value: '7', price: 20 },
	{ label: 'Бекон 🥓', value: '8', price: 50 },
]

interface ProductCard {
	product: ProductTypes
}

function PizzaCard(props: ProductCard) {
	const { id, name, comment, quantity, totalPrice } = props.product

	const [selected, setSelected] = useState<
		Array<{ label: string; value: string; price: number }>
	>([])

	const dispatch = useDispatch()

	const plusQuantity = () =>
		dispatch(updateQuantity({ quantity: quantity + 1, id }))

	const minusQuantity = () =>
		dispatch(updateQuantity({ quantity: quantity - 1, id }))

	useEffect(() => {
		dispatch(
			updateAddition({
				id: id,
				addition: selected.map((addition) => {
					return {
						name: addition.label,
						price: addition.price,
					}
				}),
			})
		)
	}, [selected])

	return (
		<div className='container_pizza-card'>
			<div className='pizza-card'>
				<form>
					<div className='pizza-card_header'>
						<div className='pizza-card_header_name'>{name}</div>
						<div className='pizza-card_header_block-selected-items'>
							{selected.map(({ label }) => (
								<span className='pizza-card_header_block-selected-items_item'>
									{label.slice(0, label.length - 2)}
								</span>
							))}
						</div>
						<div className='pizza-card_header_block-price'>
							<h4
								className='pizza-card_header_block-price_price'
								style={quantity > 1 ? { color: 'red' } : { color: 'black' }}
							>
								{totalPrice}₴
							</h4>
							<span className='pizza-card_header_block-prise_count'>
								{quantity > 1 && `x${quantity}`}
							</span>
						</div>
					</div>
					<div className='pizza-card_footer '>
						<MultiSelectDropDown
							className='pizza-card_footer_select-addition'
							options={options}
							value={selected?.map(({ label, value }, id) => {
								return {
									label,
									value,
									price: options[id].price,
								}
							})}
							hasSelectAll
							onChange={setSelected}
							labelledBy='Додати'
						/>
						<input
							className='pizza-card_footer_comment'
							value={comment}
							onChange={(e) => {
								dispatch(
									writeProductComment({ id: id, comment: e.target.value })
								)
							}}
							placeholder='Коментарій'
						/>
						<div className='pizza-card_footer_count-block'>
							<input type='button' value='+' onClick={plusQuantity} />
							{quantity > 1 && (
								<input type='button' value='-' onClick={minusQuantity} />
							)}
						</div>
					</div>
				</form>
			</div>
			<button
				className='btn-del-product '
				onClick={() => {
					dispatch(delProduct({ id }))
				}}
			>
				<RiDeleteBin6Line />
			</button>
		</div>
	)
}

export default PizzaCard
