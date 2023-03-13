import { RiDeleteBin6Line } from 'react-icons/ri'
import {
	delProduct,
	setProductQuantity,
	addProductAddition,
	writeProductComment,
} from '../../features/orderSlice'
import { ProductTypes } from '../../features/orderSlice'
import { useDispatch } from 'react-redux'
import './ProductCard.css'
import AdditionDropdown, { Options } from '../UI/SearchAddition/SearchAddition'
import { nanoid } from 'nanoid'
import MultiSelectDropDown from '../UI/MultySelect'

const optionsAdditions: Options[] = [
	{ label: 'Виноград 🍇', price: 20 },
	{ label: 'Манго 🥭', price: 10 },
	{ label: 'Полуниця 🍓', price: 40 },
	{ label: 'Сир 🧀', price: 50 },
	{ label: 'Бекон 🥓', price: 30 },
	{ label: 'Полуниця 🍓', price: 29 },
	{ label: 'Сир 🧀', price: 20 },
	{ label: 'Бекон 🥓', price: 50 },
].map((el) => {
	return { ...el, quantity: 0, totalPrice: el.price, id: nanoid() }
})

interface ProductCard {
	product: ProductTypes
}

function PizzaCard(props: ProductCard) {
	const { id, label, comment, quantity, totalPrice, addition } = props.product

	const dispatch = useDispatch()

	const plusQuantityHandle = () =>
		dispatch(setProductQuantity({ quantity: quantity + 1, id }))

	const minusQuantityHandle = () =>
		dispatch(setProductQuantity({ quantity: quantity - 1, id }))

	const onDeleteProducthandle = () => {
		dispatch(delProduct({ id }))
	}

	const onChangeAdditionHandle = (addition: Options[]) => {
		dispatch(
			addProductAddition({
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
						<div className='pizza-card_header_name'>{label}</div>
						<div className='pizza-card_header_block-selected-items'>
							{addition &&
								addition.map(({ label }) => (
									<span className='pizza-card_header_block-selected-items_item'>
										{label}
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
						<AdditionDropdown
							options={optionsAdditions}
							value={addition}
							onChange={(value) => onChangeAdditionHandle(value)}
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
