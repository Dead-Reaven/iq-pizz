import { useState } from 'react'
import MultiSelectDropDown from '../UI/MultySelect'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { delProduct } from '../../features/orderSlice'

import { useDispatch } from 'react-redux'
import './PizzaCard.css'

const options = [
	{ label: 'Виноград 🍇', value: '1' },
	{ label: 'Манго 🥭', value: '2' },
	{ label: 'Полуниця 🍓', value: '3' },
	{ label: 'Сир 🧀', value: '4' },
	{ label: 'Бекон 🥓', value: '5' },
	{ label: 'Полуниця 🍓', value: '6' },
	{ label: 'Сир 🧀', value: '7' },
	{ label: 'Бекон 🥓', value: '8' },
]

function PizzaCard({ id, name }: { id: string; name?: string }) {
	const [count, setCount] = useState(1)
	const [selected, setSelected] = useState<
		Array<{ label: string; value: string }>
	>([])

	const dispatch = useDispatch()

	const plusCount = () => setCount((prev) => prev + 1)
	const minusCount = () => setCount((prev) => (prev > 1 ? prev - 1 : prev))
	// const delProduct = () => {}

	return (
		<div className='container_pizza-card'>
			<div className='pizza-card'>
				<form>
					<div className='pizza-card_header'>
						<div className='pizza-card_header_name'>{name}</div>
						{/* <input
							className='pizza-card_header_name '
							list='pizza-list'
							placeholder='Піца'
						/> */}
						{/* <datalist id='pizza-list'>
							<option value='1' />
							<option value='2' />
							<option value='3' />
						</datalist> */}
						<div className='pizza-card_header_block-selected-items'>
							{selected.map(({ label }) => (
								<span className='pizza-card_header_block-selected-items_item'>
									{label.slice(0, label.length - 2)}
								</span>
							))}
						</div>
						<div className='pizza-card_header_block-price'>
							<h4 className='pizza-card_header_block-price_price'>99$</h4>
							<span className='pizza-card_header_block-prise_count'>
								{count > 1 && `x${count}`}
							</span>
						</div>
					</div>
					<div className='pizza-card_footer '>
						<MultiSelectDropDown
							className='pizza-card_footer_select-addition'
							options={options}
							value={selected}
							hasSelectAll
							onChange={setSelected}
							labelledBy='Додати'
						/>
						<input
							className='pizza-card_footer_comment'
							placeholder='Коментарій'
						/>
						<div className='pizza-card_footer_count-block'>
							<input type='button' value='+' onClick={plusCount} />
							{count > 1 && (
								<input type='button' value='-' onClick={minusCount} />
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
