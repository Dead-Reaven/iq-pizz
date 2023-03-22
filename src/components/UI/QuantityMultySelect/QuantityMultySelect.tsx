import React, { useState } from 'react'
import { Form, Dropdown, ButtonGroup } from 'react-bootstrap'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { AdditionTypes as Options } from '../../../features/orderSlice'
import './QuantityMultySelect.css'

interface Props {
	options: Array<Options>
	value: Array<Options>
	onChange: (callbackfn: Options[]) => void
}

const QuantityMultySelect = ({ options, value, onChange }: Props) => {
	const [showDropdown, setShowDropdown] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(event.target.value)

	const filteredProducts = options.filter(({ label }) =>
		label.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const plusQuantity = (valueId: string) => {
		onChange(
			value.map((item) => {
				if (item.id === valueId) {
					const mutableItem = { ...item }
					mutableItem.quantity += 1
					mutableItem.totalPrice = mutableItem.quantity * item.price
					return mutableItem
				}
				return item
			})
		)
	}

	const minusQuantity = (valueId: string) => {
		const modifiedArray = value.map((item) => {
			if (item.id === valueId) {
				const mutableItem = { ...item }
				if (mutableItem.quantity - 1 > 0) {
					mutableItem.quantity -= 1
					mutableItem.totalPrice = mutableItem.quantity * item.price
				} else {
					mutableItem.isChecked = false
					mutableItem.totalPrice = 0
					mutableItem.quantity = 0
				}
				return mutableItem
			}
			return item
		})

		onChange(modifiedArray.filter((item) => item.isChecked))
	}

	const toggleIsCheck = (isChecked: boolean, item: Options) => {
		if (isChecked) {
			const mutableItem = { ...item }
			mutableItem.isChecked = true
			mutableItem.quantity = 1
			mutableItem.totalPrice = item.price
			onChange([...value, mutableItem])
		} else {
			onChange([...value.filter((addition) => addition.id !== item.id)])
		}
	}

	const checkedToString = () => {
		return value
			.filter((el) => el.isChecked)
			.map((el) => el.label + (el.quantity > 1 ? el.quantity : ''))
			.toLocaleString()
	}

	const clearCheked = (e: any) => {
		e.preventDefault()
		onChange([])
	}
	const findValue = (optionId: any) => {
		return value.find((checked) => checked.id === optionId)
	}
	return (
		<>
			<Dropdown show={showDropdown} className='dropdown-quantity'>
				<Dropdown.Toggle
					variant='success'
					id='dropdown-products'
					className='w-100'
					onClick={() => setShowDropdown((prev) => !prev)}
				>
					{checkedToString() || 'Додати	'}
					<button
						className='product-search-box-clear'
						onClick={(e) => {
							clearCheked(e)
							setShowDropdown((prev) => !prev)
						}}
					>
						<RiDeleteBin2Line />
					</button>
				</Dropdown.Toggle>

				<Dropdown.Menu className='product-dropdown-menu w-100 '>
					<ButtonGroup className='product-search-box'>
						<Form.Control
							placeholder='Filter'
							onChange={handleSearchChange}
							className='product-search'
							value={searchTerm}
						/>
						{searchTerm.length ? (
							<button
								className='product-search-box-clear'
								onClick={() => setSearchTerm('')}
							>
								<RiDeleteBin2Line />
							</button>
						) : null}
					</ButtonGroup>
					<Form>
						{filteredProducts.map((item) => {
							return (
								<Form className='product-item' key={item.id}>
									<label className='checkbox-container' tabIndex={1}>
										<span tabIndex={1}>{item.label}</span>
										<input
											type='checkbox'
											tabIndex={1}
											key={item.id}
											checked={findValue(item.id)?.isChecked ?? false}
											onChange={(e) => {
												toggleIsCheck(e.target.checked, item)
											}}
											id={item.id}
										/>
										<button
											onClick={(e) => {
												e.preventDefault()
												document.getElementById(item.id)?.click()
											}}
											className='checkmark'
											tabIndex={0}
										></button>
									</label>
									<div className='quantity-container'>
										<div className='quantity-control'>
											{findValue(item.id)?.isChecked && (
												<>
													<input
														type='button'
														onClick={() => {
															const itemIndex = findValue(item.id)?.id
															if (itemIndex) minusQuantity(itemIndex)
														}}
														value='-'
													/>
													<span>{findValue(item.id)?.quantity}</span>
													<input
														type='button'
														onClick={() => {
															const itemIndex = findValue(item.id)?.id
															if (itemIndex) plusQuantity(itemIndex)
														}}
														value='+'
													/>
												</>
											)}
											<div className='product-price'>
												<span>
													{findValue(item.id)?.totalPrice ?? item.price}
												</span>
											</div>
										</div>
									</div>
								</Form>
							)
						})}
					</Form>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}
export default QuantityMultySelect
