import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { updateInfo, OrderInfoTypes } from '../../features/orderSlice'
import './ContactForm.css'

import { RootState } from '../../app/store'

function ContactForm() {
	const infoState = useSelector((state: RootState) => state.order?.info)
	const dispatch = useDispatch()
	const onChangeFieldHandler = (field: keyof OrderInfoTypes, value: string) => {
		dispatch(updateInfo({ key: field, value }))
	}
	return (
		<div className='contact'>
			<form className='contact_container'>
				<input
					list='categories'
					value={infoState.store}
					onChange={(event) =>
						onChangeFieldHandler('store', event.target.value)
					}
					placeholder='Торгова точка'
				/>
				<datalist id='categories'>
					<option value='ПодМостом' />
					<option value='Рандом' />
					<option value='Ластплейс' />
				</datalist>

				<div className='contact_container_personal-data'>
					<input
						type='text'
						placeholder="Ім'я"
						value={infoState.name}
						onChange={(event) =>
							onChangeFieldHandler('name', event.target.value)
						}
					/>
					<input
						type='text'
						placeholder='Тел'
						value={infoState.tel}
						onChange={(event) =>
							onChangeFieldHandler('tel', event.target.value)
						}
					/>
				</div>

				<div className='contact_container_delivey'>
					<div className='contact_container_delivey_type'>
						<div className='type-delivery'>
							<Form.Select
								className='select-type-delivery'
								value={infoState.delivery_type}
								onChange={(event) =>
									onChangeFieldHandler('delivery_type', event.target.value)
								}
							>
								<option defaultChecked selected hidden>
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
						{infoState.delivery_type?.includes('courier') ? (
							<>
								<input
									type='text'
									value={infoState.adress}
									onChange={(event) =>
										onChangeFieldHandler('adress', event.target.value)
									}
									placeholder='Адреса'
									className='adress'
								/>
								{infoState.delivery_type?.includes('time') && (
									<input
										type='time'
										className='contact_container_delivey_time'
										value={infoState.time}
										onChange={(event) =>
											onChangeFieldHandler('time', event.target.value)
										}
									/>
								)}
							</>
						) : (
							infoState.delivery_type?.includes('self_delivery') && (
								<input
									type='time'
									className='contact_container_delivey_time'
									value={infoState.time}
									onChange={(event) =>
										onChangeFieldHandler('time', event.target.value)
									}
								/>
							)
						)}
					</div>
				</div>
			</form>
		</div>
	)
}

export default ContactForm
