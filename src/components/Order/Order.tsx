import './Order.css'
interface OrderTypes {}

function Order() {
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
				<pre>{order}</pre>
			</div>
		</div>
	)
}

export default Order
