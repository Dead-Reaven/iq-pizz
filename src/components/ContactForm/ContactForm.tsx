import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { FormTypes, updateForm } from '../../features/formSlice'
import MultiSelectDropDown from '../UI/MultySelect'
import stores, { StoreTypes } from '../../data/stores'
import './ContactForm.css'

import { RootState } from '../../app/store'

function ContactForm() {
	const infoState = useSelector((state: RootState) => state.form.data)
	const dispatch = useDispatch()
	const onChangeFieldHandler = (field: keyof FormTypes, value: string) => {
		dispatch(updateForm({ key: field, value }))
	}

	const onSelectStorehandler = (store: Array<StoreTypes>) => {
		dispatch(
			updateForm({
				key: 'store',
				value: store.length ? store[store.length - 1].label : '',
			})
		)
	}
	return (
		<div className='contact'>
			<form className='contact_container '>
				<div className='contact_container_store-search hide-checkbox'>
					<MultiSelectDropDown
						options={stores}
						value={
							infoState.store.length > 0
								? [{ label: infoState.store, value: '0' }]
								: []
						}
						onChange={onSelectStorehandler}
						hasSelectAll={false}
						closeOnChangedValue
						labelledBy='Торгова точка'
					/>
				</div>

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
