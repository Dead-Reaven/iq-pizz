import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useState } from 'react'
import './Order.css'

function Order() {
	const [show, setShow] = useState(false)

	const orderState = useSelector((state: RootState) => state.order.info)

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
		`Итого: 99`,
	]
	// const isShowResult = () => {
	// 	let isShow = true
	// 	order.forEach((order) => {
	// 		if (order.length === 0) {
	// 			isShow = false
	// 		}
	// 	})
	// 	return isShow
	// }

	const orderToString = () => {
		let string = ''
		order.forEach((line) => {
			string += `${line}\n`
		})
		return string
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
						<Toast.Body className='toast-copyed'>Замовлення скопійовано 💸</Toast.Body>
					</Toast>
				</ToastContainer>
			</div>
		</div>
	)
}

export default Order
