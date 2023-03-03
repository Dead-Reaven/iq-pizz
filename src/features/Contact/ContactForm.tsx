import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useState } from 'react'
import './ContactForm.css'

interface OrderOptions {
	store: string // a store point adress
	contact: {
		name: string
		tel: string
	}
	deliveryType: {
		type: string
		adress?: string
	}
	time: string
}
const getTime = () => new Date().toLocaleTimeString().slice(0, 5)

function ContactForm() {
	const [deliveryType, setDeliveryType] = useState<string>('')
	const [time, setTime] = useState(getTime())

	const toggleDeliveryType = (type: string) => setDeliveryType(type)
	// const [radios, setRadios] = useState([
	// 	{ name: 'Самовивіз', value: '' },
	// 	{ name: 'Самовивіз врем', value: '' },
	// 	{ name: 'Доставка', value: '' },
	// 	{ name: 'Доставка врем', value: '' },
	// ])

	const toggleRadio = () => {}
	return (
		<div className='contact '>
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
							<input
								type='radio'
								onChange={(e) => toggleDeliveryType(e.target.value)}
								id='option1'
								name='options'
								value='self'
							/>
							<label htmlFor='option1'>Самовивіз</label>
							<input
								type='radio'
								onChange={(e) => toggleDeliveryType(e.target.value)}
								id='option2'
								name='options'
								value='courier'
							/>
							<label htmlFor='option2'>Доставка</label>
						</div>
					</div>

					{deliveryType === 'courier' ? (
						<div className='courier-type'>
							<input type='text' placeholder='Адреса' />
							<input
								type='time'
								className='contact_container_delivey_time'
								value={time}
								onDoubleClick={() => setTime(getTime())}
								defaultValue={'00:00'}
								onChange={(e) => setTime(e.target.value)}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			</form>
		</div>
	)
}

export default ContactForm
