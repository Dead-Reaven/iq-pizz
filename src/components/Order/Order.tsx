import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useState } from 'react'
import './Order.css'

function Order() {
	const [show, setShow] = useState(false)

	const orderState = useSelector((state: RootState) => state.order.info)
	const productsState = useSelector((state: RootState) => state.order.products)

	const deliveryType = orderState.delivery_type?.length
		? orderState.delivery_type?.includes('self')
			? orderState.delivery_type?.includes('time')
				? 'сам временной'
				: 'сам'
			: orderState.delivery_type?.includes('time')
			? 'доставка временной'
			: 'доставка текущий'
		: ''

	const order = [
		`${orderState.name} ${orderState.tel} `,
		`${orderState.store}`,
		`${deliveryType} ${orderState.time}`,
		`${orderState.adress} `,
		...productsState.map(
			(product) =>
				`${product.name} ${product.addition?.map(
					({ name }) => `${name.slice(0, name.length - 2)}`
				)} ${product?.comment || ''}`
		),

		`${
			productsState.length
				? 'Итого:' +
				  productsState.reduce((acc, product) => acc + product.totalPrice, 0)
				: ''
		}`,
	]

	const orderToString = () => {
		let string = ''
		order.forEach((line) => {
			string += `${line}\n`
		})

		return string.replaceAll(',', '')
	}
	return (
		<div className='total-order'>
			<div className='total-order_container'>
				<pre
					onClick={() => {
						setShow(true)
						navigator.clipboard.writeText(orderToString())
					}}
				>
					{orderToString()}
				</pre>
				<ToastContainer position='bottom-end' className='p-4'>
					<Toast
						onClose={() => setShow(false)}
						show={show}
						delay={3000}
						autohide
					>
						<Toast.Body className='toast-copyed'>
							Замовлення скопійовано 💸
						</Toast.Body>
					</Toast>
				</ToastContainer>
			</div>
		</div>
	)
}

export default Order
