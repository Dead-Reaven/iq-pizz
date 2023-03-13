import React, { useState } from 'react'
import { Form, Dropdown, Button, ButtonGroup } from 'react-bootstrap'
import { RiDeleteBack2Fill, RiDeleteBin2Line } from 'react-icons/ri'
import './SearchAddition.css'

interface Options {
	label: string
	price: number
	id: string
	quantity: number
	totalPrice: number
	isChecked?: boolean
}

interface Props {
	options: Array<Options>
	value: Array<Options>
	onChange: (callbackfn: Options[]) => void
}

const AdditionDropdown = ({ options, value, onChange }: Props) => {
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
			<Dropdown
				show={showDropdown}
				className='dropdown-quantity'
				style={{ minWidth: '400px' }}
			>
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
									<Form.Check
										className='product-name'
										label={item.label}
										key={item.id}
										checked={findValue(item.id)?.isChecked ?? false}
										onChange={(e) => {
											toggleIsCheck(e.target.checked, item)
										}}
									/>
									<div className='quantity-container'>
										<div className='quantity-control'>
											{findValue(item.id)?.isChecked && (
												<>
													<Button
														onClick={() => {
															const itemIndex = findValue(item.id)?.id
															if (itemIndex) minusQuantity(itemIndex)
														}}
													>
														-
													</Button>
													<span>{findValue(item.id)?.quantity}</span>
													<Button
														onClick={() => {
															const itemIndex = findValue(item.id)?.id
															if (itemIndex) plusQuantity(itemIndex)
														}}
													>
														+
													</Button>
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
export type { Options }
export default AdditionDropdown
