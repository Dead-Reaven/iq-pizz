import React, { useState } from 'react'
import { Form, Dropdown, Button, ButtonGroup } from 'react-bootstrap'
import './SearchAddition.css'
import { RiDeleteBack2Fill, RiDeleteBin2Line } from 'react-icons/ri'

// interface Options {
// 	label: string
// 	price: number

// }

// interface Props {
// 	options: Array<Options>
// 	value: Array<Options>
// 	onChange: (value: Array<Options>) => void
// }

// const ProductDropdown = ({ options, value, onChange }: Props) => {
const ProductDropdown = () => {
	const [showDropdown, setShowDropdown] = useState(false)
	const options = [
		{
			label: 'Milk',
			price: 9,
		},
		{
			label: 'Pizza',
			price: 40,
		},
		{
			label: 'Cacao',
			price: 39,
		},
		{
			label: 'Moccachino',
			price: 1119,
		},
	]

	const [checked, setChecked] = useState(
		options.map(({ label, price }, idx) => {
			return {
				label,
				id: idx,
				isChecked: false,
				quantity: 0,
				price,
				totalPrice: price,
			}
		})
	)

	const [searchTerm, setSearchTerm] = useState('')
	const filteredProducts = checked.filter(({ label }) =>
		label.toLowerCase().includes(searchTerm.toLowerCase())
	)
	const plusQuantity = (id: number) => {
		setChecked(
			checked.map((el) => {
				if (el.id === id) {
					el.quantity += 1
					el.totalPrice = el.quantity * el.price
				}
				return el
			})
		)
	}
	const minusQuantity = (id: number) => {
		setChecked(
			checked.map((el) => {
				if (el.id === id && el.quantity > 0) {
					el.quantity -= 1
					el.isChecked = el.quantity > 0 ? true : false
					el.totalPrice = el.quantity * el.price
				}
				return el
			})
		)
	}
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(event.target.value)

	const toggleIsCheck = (isChecked: boolean, id: number) => {
		setChecked(
			checked.map((el) => {
				if (el.id === id) {
					el.isChecked = isChecked
					el.quantity = isChecked ? 1 : 0
				}
				return el
			})
		)
	}
	const checkedToString = () => {
		return checked
			.filter((el) => el.isChecked)
			.map((el) => el.label + (el.quantity > 1 ? el.quantity : ''))
			.toLocaleString()
	}

	const clearCheked = () => {
		setChecked(
			checked.map((el) => {
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
					{checkedToString() || 'Select'}
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
					{/* <Dropdown.Divider /> */}
					<Form>
						{filteredProducts.map(
							({ id, isChecked, label, quantity, price, totalPrice }) => {
								return (
									<Form className='product-item'>
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
												{quantity > 0 ? (
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
			<pre>{checkedToString()}</pre>
		</>
	)
}

export default ProductDropdown
