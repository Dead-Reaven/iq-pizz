import React from 'react'
import Form from 'react-bootstrap/Form'
import { HTMLInputTypeAttribute, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateInfo, OrderInfoTypes } from '../../features/orderSlice'
import './ContactForm.css'

import { RootState } from '../../app/store'

function ContactForm() {
	const info = useSelector((state: RootState) => state.order?.info)
	const [deliveryType, setDeliveryType] = useState<string>('')
	const toggleDeliveryType = (type: string) => setDeliveryType(type)
	const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, 5))
	const [personalData, setPersonalData] = useState({ name: '', tel: '' })
	const [store, setStore] = useState('')
	const [adress, setAdress] = useState('')
	const [contactState, setContactState] = useState<OrderInfoTypes>({
		//orderinfotypes props:
		store: '',
		contact: {
			name: '',
			tel: '',
		},
		deliveryType: {
			type: '',
			adress: '',
			time: '',
		},
	})

	const dispatch = useDispatch()
	// event: React.FormEvent<HTMLFormElement>
	const onUpdateHandler = (event: any) => {
		event.preventDefault()

		console.log(event.target.id, event.target.value)
		const id: string = event.target.id
		const value: string = event.target.value

		
		// if (info) dispatch(updateInfo({...info, info[]: value  })) }
	}

	return (
		<div className='contact'>
			<form className='contact_container' onChange={onUpdateHandler}>
				<input list='categories' placeholder='Торгова точка' id='store' />
				<datalist id='categories'>
					<option value='ПодМостом' />
					<option value='Рандом' />
					<option value='Ластплейс' />
				</datalist>

				<div className='contact_container_personal-data'>
					<input type='text' placeholder="Ім'я" id='name' />
					<input type='text' placeholder='Тел' id='tel' />
				</div>

				<div className='contact_container_delivey'>
					<div className='contact_container_delivey_type'>
						<div className='type-delivery'>
							<Form.Select
								className='select-type-delivery'
								onChange={(e) => toggleDeliveryType(e.target.value)}
								id='deliveryType'
							>
								<option value='' selected hidden>
									Тип доставки
								</option>
								<option value='self_delivery'>Сам</option>
								<option value='self_delivery_time'>Сам времянной</option>
								<option value='courier'>Доставка текущий</option>
								<option value='courier_time'>Доставка времянной</option>
							</Form.Select>
						</div>
					</div>
					<div className='contact_container_delivey_fields'>
						{deliveryType.includes('courier') ? (
							<>
								<input
									type='text'
									id='adress'
									placeholder='Адреса'
									className='adress'
								/>
								{deliveryType.includes('time') && (
									<input
										type='time'
										className='contact_container_delivey_time'
										value={time}
										id='time'
										onChange={(e) => setTime(e.target.value)}
									/>
								)}
							</>
						) : (
							deliveryType.includes('self_delivery') && (
								<input
									type='time'
									className='contact_container_delivey_time'
									id='time'
									value={time}
									onChange={(e) => setTime(e.target.value)}
								/>
							)
						)}
					</div>
				</div>
				{/* <input type="submit" value="Accept" onSubmit={}/> */}
				{/* <input type="reset" value="Reset" /> */}
			</form>
			<pre>{`${info}`}</pre>
		</div>
	)
}

export default ContactForm
