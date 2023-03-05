import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import './ContactForm.css'

function ContactForm() {
	const [deliveryType, setDeliveryType] = useState<string>('')
	const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, 5))

	const toggleDeliveryType = (type: string) => setDeliveryType(type)

	return (
		<div className='contact'>
			<form className='contact_container'>
				<input list='categories' placeholder='Торгова точка' />
				<datalist id='categories'>
					<option value='ПодМостом' />
					<option value='Рандом' />
					<option value='Ластплейс' />
				</datalist>

				<div className='contact_container_personal-data'>
					<input type='text' placeholder="Ім'я" />
					<input type='text' placeholder='Тел' />
				</div>

				<div className='contact_container_delivey'>
					<div className='contact_container_delivey_type'>
						<div className='type-delivery'>
							<Form.Select
								className='select-type-delivery'
								onChange={(e) => toggleDeliveryType(e.target.value)}
							>
								<option value='' selected hidden>
									Тип доставки
								</option>
								<option value='courier'>Доставка</option>
								<option value='courier_time'>Доставка врем</option>
								{/* <option value='self_delivery'>Самовивіз</option>
								<option value='self_delivery_time'>Самовивіз врем</option> */}
							</Form.Select>
							<input
								type='time'
								className='contact_container_delivey_time'
								value={time}
								defaultValue={'00:00'}
								onChange={(e) => setTime(e.target.value)}
							/>
						</div>
					</div>

					{deliveryType === 'courier' && (
						<input type='text' placeholder='Адреса' className='adress' />
					)}
				</div>
			</form>
		</div>
	)
}

export default ContactForm
