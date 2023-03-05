import { useDispatch, useSelector } from 'react-redux'
// import { useState } from 'react'
import PizzaCard from '../PizzaCard/PizzaCard'
import { addProduct } from '../../features/orderSlice'
import { RootState } from '../../app/store'

import './ProductList.css'

function ProductList() {
	const orderData = useSelector((state: RootState) => state.order.data)
	const dispatch = useDispatch()

	return (
		<div className='pizza-list'>
			<div className='pizza-list_container'>
				<div className='pizza-list_container_flex   '>
					{orderData.map((product) => (
						<PizzaCard id={product.id} key={product.id} />
					))}
				</div>
				<input
					type='button'
					value='add'
					onClick={() => {
						dispatch(addProduct())
					}}
				/>
			</div>
		</div>
	)
}

export default ProductList
