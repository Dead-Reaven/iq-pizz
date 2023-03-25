import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BorderTypes } from '../../../features/orderSlice'

interface Props {
	options: Array<BorderTypes>
	value: BorderTypes
	onChange: (callbackfn: BorderTypes) => void
}

const RadioSelect = ({ options, value, onChange }: Props) => {
	const [showDropdown, setShowDropdown] = useState(false)

	const toggleIsCheck = (border: BorderTypes) => {
		setShowDropdown(false)
		onChange(border)
	}

	return (
		<div style={{ minWidth: '200px'}}>
			<Dropdown show={showDropdown}>
				<Dropdown.Toggle
					variant='success'
					id='dropdown-products'
					className='w-100'
					onClick={() => setShowDropdown((prev) => !prev)}
				>
					{'Бортик: ' + value.label}
				</Dropdown.Toggle>

				<Dropdown.Menu className='product-dropdown-menu w-100 '>
					{options.map((item) => {
						return (
							<div className='product-item' key={item.id}>
								<label className='checkbox-container' tabIndex={1}>
									<span tabIndex={1}>{item.label}</span>
									<input
										type='radio'
										name='border'
										value={item.label}
										checked={item.id === value.id}
										tabIndex={1}
										onChange={() => {
											toggleIsCheck(item)
										}}
										key={item.id}
										id={item.id}
									/>
									<button
										onClick={(e) => {
											e.preventDefault()
											document.getElementById(item.id)?.click()
										}}
										className='checkmark'
										style={{ borderRadius: '50%' }}
										tabIndex={0}
									></button>
								</label>
								<div> {item.price} </div>
							</div>
						)
					})}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	)
}
export default RadioSelect
