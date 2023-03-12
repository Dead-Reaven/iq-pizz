import React, { useEffect, useState } from 'react'
import { Form, Dropdown, Button, ButtonGroup } from 'react-bootstrap'
import './SearchAddition.css'
import { RiDeleteBack2Fill, RiDeleteBin2Line } from 'react-icons/ri'

interface Options {
	label: string
	price: number
	id: any
	quantity: number
	totalPrice: number
	isChecked?: boolean
}

interface Props {
	value: Array<Options>
	onChange: (callbackfn: Options[]) => void
}

const ProductDropdown = ({ value, onChange }: Props) => {
	const [showDropdown, setShowDropdown] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(event.target.value)

	const filteredProducts = value.filter(({ label }) =>
		label.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const plusQuantity = (id: number) => {
		onChange(
			value.map((el) => {
				if (el.id === id) {
					el.quantity = el.quantity ? (el.quantity += 1) : 1
					el.totalPrice = el.quantity * el.price
				}
				return el
			})
		)
	}
	const minusQuantity = (id: number) => {
		onChange(
			value.map((el) => {
				if (el.id === id) {
					if (el.quantity - 1 > 0) {
						el.quantity -= 1
					} else {
						el.quantity = 0
						el.isChecked = false
					}
					el.totalPrice = el.quantity * el.price
				}
				return el
			})
		)
	}

	const toggleIsCheck = (isChecked: boolean, id: number) => {
		onChange(
			value.map((el) => {
				if (el.id === id) {
					el.isChecked = isChecked
					el.quantity = isChecked ? 1 : 0
					el.totalPrice = 0
				}
				return el
			})
		)
	}

	const checkedToString = () => {
		return value
			.filter((el) => el.isChecked)
			.map((el) => el.label + (el.quantity > 1 ? el.quantity : ''))
			.toLocaleString()
	}

	const clearCheked = () => {
		onChange(
			value.map((el) => {
				return {
					...el,
					isChecked: false,
					totalPrice: el.price,
					quantity: 0,
				}
			})
		)
	}

	return (
		<>
			<Dropdown show={showDropdown} className=''>
				<Dropdown.Toggle
					variant='success'
					id='dropdown-products'
					className='w-100'
					onClick={() => setShowDropdown((prev) => !prev)}
				>
					{checkedToString() || 'Додати	'}
					<button
						className='product-search-box-clear'
						onClick={() => {
							clearCheked()
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
						{filteredProducts.map(
							({ id, isChecked, label, quantity, price, totalPrice }) => {
								return (
									<Form className='product-item' key={id}>
										<Form.Check
											className='product-name'
											label={label}
											key={id}
											checked={isChecked}
											onChange={(e) => {
												toggleIsCheck(e.target.checked, id)
											}}
										/>
										<div className='quantity-container'>
											<div className='quantity-control'>
												{quantity ? (
													<>
														<Button onClick={() => minusQuantity(id)}>-</Button>
														<span>{quantity}</span>
														<Button onClick={() => plusQuantity(id)}>+</Button>
													</>
												) : null}
											</div>
											<div className='product-price'>
												<span>{totalPrice !== 0 ? totalPrice : price}</span>
											</div>
										</div>
									</Form>
								)
							}
						)}
					</Form>
				</Dropdown.Menu>
			</Dropdown>
			{/* <pre>{checkedToString()}</pre> */}
		</>
	)
}
export type { Options }
export default ProductDropdown
