import { RiDeleteBin6Line } from 'react-icons/ri'
import {
	delProduct,
	setProductQuantity,
	addProductAddition,
	writeProductComment,
	BorderTypes,
	changeProductBorder,
} from '../../features/orderSlice'
import {
	ProductTypes,
	AdditionTypes as Options,
} from '../../features/orderSlice'
import { useDispatch } from 'react-redux'
// import './ProductCard.css'
import QuantityMultySelect from '../UI/QuantityMultySelect/QuantityMultySelect'
import { nanoid } from 'nanoid'
import RadioSelect from '../UI/RadioSelect/RadioSelect'
import './testStyles.css'

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

const optionsBorders: Array<BorderTypes> = [
	{ label: 'Базовий', price: 0 },
	{ label: 'Сирний', price: 39 },
	{ label: 'Сулугуні', price: 49 },
	{ label: 'Кремовий', price: 49 },
].map((el) => {
	return { ...el, id: nanoid() }
})

interface ProductCard {
	product: ProductTypes
}

function PizzaCard(props: ProductCard) {
	const { id, label, comment, quantity, totalPrice, addition, border } =
		props.product

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
	const onChangeBorderhandle = (border: BorderTypes) => {
		dispatch(
			changeProductBorder({
				id,
				border,
			})
		)
	}

	return (
		<div className='test-container'>
			<div className='test-header-container'>
				<div className='test-order-label-info'>
					<h2>{label}</h2>

					{addition &&
						addition.map(({ label, quantity }) => (
							<div>
								<span className='test-addition-item'>
									{quantity > 1 ? `(${label}x${quantity})` : label}
								</span>
							</div>
						))}
				</div>
				<div className='test-price-container'>
					<h3 style={quantity > 1 ? { color: 'red' } : {}}>{totalPrice} ₴</h3>
					<span className='test-product-quantity-price'>
						{quantity > 1 && `x${quantity}`}
					</span>
				</div>
			</div>
			<div className='test-footer-container'>
				<QuantityMultySelect
					options={optionsAdditions}
					value={addition}
					onChange={(value) => onChangeAdditionHandle(value)}
				/>
				<RadioSelect
					options={optionsBorders}
					value={border ?? optionsBorders[0]}
					onChange={(value) => {
						onChangeBorderhandle(value)
					}}
				/>
				<input
					className='test-comment'
					value={comment}
					onChange={(e) => {
						dispatch(writeProductComment({ id: id, comment: e.target.value }))
					}}
					placeholder='Коментарій'
				/>

				{
					<div className='test-count-block'>
						<input type='button' value='+' onClick={plusQuantityHandle} />
						{quantity > 1 ? (
							<input type='button' value='-' onClick={minusQuantityHandle} />
						) : (
							<RiDeleteBin6Line
								tabIndex={0}
								type='button'
								className='test-btn-del-product '
								onClick={onDeleteProducthandle}
							/>
						)}
					</div>
				}
			</div>
		</div>

		// <div className='container_pizza-card'>
		// 	<div className='pizza-card'>
		// 		<form>
		// 			<div className='pizza-card_header'>
		// 				<h4 className='pizza-card_header_name'>{label}</h4>
		// 				<div className='pizza-card_header_block-selected-items'>
		// {addition &&
		// 	addition.map(({ label, quantity }) => (
		// 		<span className='pizza-card_header_block-selected-items_item'>
		// 			{quantity > 1 ? `(${label}x${quantity})` : label}
		// 		</span>
		// 	))}
		// 				</div>
		// 				<div className='pizza-card_header_block-price'>
		// 					<h4
		// 						className='pizza-card_header_block-price_price'
		// 						style={quantity > 1 ? { color: 'red' } : { color: 'black' }}
		// 					>
		// 						{totalPrice}₴
		// 					</h4>
		// 					<span className='pizza-card_header_block-prise_count'>
		// 						{quantity > 1 && `x${quantity}`}
		// 					</span>
		// 				</div>
		// 			</div>
		// 			<div className='pizza-card_footer '>
		// 				<div className='pizza-card_footer_container-addition'>
		// <RadioSelect
		// 	options={optionsBorders}
		// 	value={border ?? optionsBorders[0]}
		// 	onChange={(value) => {
		// 		onChangeBorderhandle(value)
		// 	}}
		// />
		// <QuantityMultySelect
		// 	options={optionsAdditions}
		// 	value={addition}
		// 	onChange={(value) => onChangeAdditionHandle(value)}
		// />
		// 				</div>
		// 				<input
		// 					className='pizza-card_footer_comment'
		// 					value={comment}
		// 					onChange={(e) => {
		// 						dispatch(
		// 							writeProductComment({ id: id, comment: e.target.value })
		// 						)
		// 					}}
		// 					placeholder='Коментарій'
		// 				/>
		// 				<div className='pizza-card_footer_count-block'>
		// 					<input type='button' value='+' onClick={plusQuantityHandle} />
		// 					{quantity > 1 && (
		// 						<input type='button' value='-' onClick={minusQuantityHandle} />
		// 					)}
		// 				</div>
		// 			</div>
		// 		</form>
		// 	</div>
		// <button className='btn-del-product ' onClick={onDeleteProducthandle}>
		// 	<RiDeleteBin6Line />
		// </button>
		// </div>
	)
}

export default PizzaCard
