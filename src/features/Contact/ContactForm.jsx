import './ContactForm.css'

function ContactForm() {
	return (
		<div className='contact '>
			<form className='contact_container'>
				<input list='categories' />
				<datalist id='categories'>
					<option value='Новокузнецк' />
					<option value='ПодМостом' />
					<option value='Рандом' />
					<option value='Ластплейс' />
				</datalist>

				<div className='contact_container_personal-data'>
					<input type='tel' defaultValue='+380' />
					<input type='text' placeholder="Ім'я" />
				</div>
			</form>
		</div>
	)
}

export default ContactForm
