import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { FormTypes, updateForm } from '../../features/formSlice'
import MultiSelectDropDown from '../UI/MultySelect'
import './ContactForm.css'

import { RootState } from '../../app/store'
// type StoresTypes = Array<{ label: string; value: string }>

// const stores: StoresTypes = [
// 	{
// 		label: '1',
// 		value: '1',
// 	},
// 	{
// 		label: '2',
// 		value: '2',
// 	},
// 	{
// 		label: '3',
// 		value: '3',
// 	},
// ]

function ContactForm() {
	const infoState = useSelector((state: RootState) => state.form.data)
	// const [storeSelected, setStoreSelected] = useState<StoresTypes>([])
	const dispatch = useDispatch()
	const onChangeFieldHandler = (field: keyof FormTypes, value: string) => {
		dispatch(updateForm({ key: field, value }))
	}

	return (
		<div className='contact'>
			<form className='contact_container '>
				<div className='contact_container_store-search hide-checkbox'>
					{/* <MultiSelectDropDown
						options={stores}
						value={
							storeSelected.length > 0
								? [storeSelected[storeSelected.length - 1]]
								: []
						}
						onChange={setStoreSelected}
						hasSelectAll={false}
						closeOnChangedValue
						labelledBy='Торгова точка'
					/> */}
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
