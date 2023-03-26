import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useState } from 'react'
import './Order.css'

function OrderResult() {
	const [show, setShow] = useState(false)

	const orderState = useSelector((state: RootState) => state.form.data)
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

	const products = [
		...productsState.map(({ label, border, quantity, comment, addition }) => {
			const name = quantity > 1 ? `(${label}x${quantity}) ` : `${label} `
			const additionFood = addition.map(({ label, quantity }) => {
				return quantity > 1 ? `(${label}x${quantity}) ` : ` ${label}`
			})
			let borderType = ''
			if (border) {
				borderType =
					border?.label !== 'Базовий' ? `+ бортик ${border.label} ` : ' '
			}

			return name + borderType + additionFood + (comment ?? '') + '\n'
		}),
	]
	const order = [
		`${orderState.name} ${orderState.tel} `,
		`${orderState.store}`,
		`${deliveryType} ${orderState.time}`,
		`${orderState.adress} `,
		[...products],
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
					className='total-order_container_content'
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

export default OrderResult
