import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useState } from 'react'

import './Order.css'
interface OrderTypes {}

function Order() {
	const [show, setShow] = useState(false)
	const order = `
Юля 0994482165 
Энтузиасти 
сам временной 12.20 
Франческа 30 
Курка BBQ 30
-10% по входящей жалобе 
Итого : 171 грн
	`

	return (
		<div className='total-order'>
			<div className='total-order_container'>
				<pre
					onClick={() => {
						setShow(true)
						navigator.clipboard.writeText(order)
					}}
				>
					*Натисни щоб скопіювати*
					{order}
				</pre>
				<ToastContainer position='bottom-end' className='p-4'>
					<Toast
						onClose={() => setShow(false)}
						show={show}
						delay={3000}
						autohide
					>
						<Toast.Body className='toast-copyed' >
							Заказ скопійовано
						</Toast.Body>
					</Toast>
				</ToastContainer>
			</div>
		</div>
	)
}

export default Order
