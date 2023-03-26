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
import QuantityMultySelect from '../UI/QuantityMultySelect/QuantityMultySelect'
import RadioSelect from '../UI/RadioSelect/RadioSelect'
import { additionBorders, additionFood } from '../../data/addition'
import './testStyles.css'

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
		<div className='pizza-card-container'>
			<div className='pizza-header-container'>
				<h4 className='pizza-header-container-label'>{label}</h4>
				<div className='pizza-header-container-options'>
					<div className='border-type'>
						<RadioSelect
							options={additionBorders}
							value={border ?? additionBorders[0]}
							onChange={onChangeBorderhandle}
						/>
					</div>
					<div className=' addition '>
						<QuantityMultySelect
							options={additionFood}
							value={addition}
							onChange={onChangeAdditionHandle}
						/>
					</div>
				</div>
				<div className='price-container'>
					<h3
						className='pizza-price'
						style={quantity > 1 ? { color: 'red' } : {}}
					>
						{totalPrice} ₴
					</h3>
					<span className='product-quantity-price'>
						{quantity > 1 && `x${quantity}`}
					</span>
				</div>
			</div>

			<div className='footer-container'>
				<input
					className='comment'
					value={comment}
					onChange={(e) => {
						dispatch(writeProductComment({ id: id, comment: e.target.value }))
					}}
					placeholder='Коментарій'
				/>

				{
					<div className='count-block'>
						<input type='button' value='+' onClick={plusQuantityHandle} />
						{quantity > 1 ? (
							<input type='button' value='-' onClick={minusQuantityHandle} />
						) : (
							<RiDeleteBin6Line
								tabIndex={0}
								type='button'
								className='btn-del-product '
								onClick={onDeleteProducthandle}
							/>
						)}
					</div>
				}
			</div>
		</div>
	)
}

export default PizzaCard
