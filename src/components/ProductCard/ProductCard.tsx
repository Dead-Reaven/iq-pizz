import MultiSelectDropDown from '../UI/MultySelect'
import { RiDeleteBin6Line } from 'react-icons/ri'
import {
	delProduct,
	setProductQuantity,
	setProductAddition,
	writeProductComment,
} from '../../features/orderSlice'
import { ProductTypes, AdditionTypes } from '../../features/orderSlice'
import { useDispatch } from 'react-redux'
import './ProductCard.css'

const additionFood: AdditionTypes = [
	{ label: 'Виноград ', value: '1', price: 20, ico: '🍇' },
	{ label: 'Манго ', value: '2', price: 10, ico: '🥭' },
	{ label: 'Полуниця ', value: '3', price: 40, ico: '🍓' },
	{ label: 'Сир ', value: '4', price: 50, ico: '🧀' },
	{ label: 'Бекон ', value: '5', price: 30, ico: '🥓' },
	{ label: 'Полуниця ', value: '6', price: 29, ico: '🍓' },
	{ label: 'Сир ', value: '7', price: 20, ico: '🧀' },
	{ label: 'Бекон ', value: '8', price: 50, ico: '🥓' },
]

interface ProductCard {
	product: ProductTypes
}

function PizzaCard(props: ProductCard) {
	const {
		id,
		label: name,
		comment,
		quantity,
		totalPrice,
		addition,
	} = props.product

	const dispatch = useDispatch()

	const plusQuantityHandle = () =>
		dispatch(setProductQuantity({ quantity: quantity + 1, id }))

	const minusQuantityHandle = () =>
		dispatch(setProductQuantity({ quantity: quantity - 1, id }))

	const onDeleteProducthandle = () => {
		dispatch(delProduct({ id }))
	}

	const handleMultiSelectChange = (addition: AdditionTypes) => {
		dispatch(
			setProductAddition({
				id,
				addition,
			})
		)
	}

	return (
		<div className='container_pizza-card'>
			<div className='pizza-card'>
				<form>
					<div className='pizza-card_header'>
						<div className='pizza-card_header_name'>{name}</div>
						<div className='pizza-card_header_block-selected-items'>
							{addition?.map(({ label, ico }) => (
								<span className='pizza-card_header_block-selected-items_item'>
									{label.replace(ico ?? '', '')}
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
							options={additionFood.map((option) => {
								return {
									...option,
									label: option.label + option.ico,
								}
							})}
							value={addition ?? []}
							onChange={handleMultiSelectChange}
							labelledBy='Додати'
							hasSelectAll
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
							<input type='button' value='+' onClick={plusQuantityHandle} />
							{quantity > 1 && (
								<input type='button' value='-' onClick={minusQuantityHandle} />
							)}
						</div>
					</div>
				</form>
			</div>
			<button className='btn-del-product ' onClick={onDeleteProducthandle}>
				<RiDeleteBin6Line />
			</button>
		</div>
	)
}

export default PizzaCard
