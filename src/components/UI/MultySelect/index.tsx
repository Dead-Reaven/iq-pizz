import { MultiSelect } from 'react-multi-select-component'
import './MultySelect.css'
// to show more documentation https://www.npmjs.com/package/react-multi-select-component

// const customValueRenderer = (
// 	selected: Array<{ label: string; value: string }>,
// 	_options: any
// ) => {
// 	const labels = selected.map((selected) => '✔️' + selected.label)
// 	return labels.length ? labels : 'Додати'
// }

const localisation = {
	allItemsAreSelected: 'Усі добавки прийняті ✔️',
	clearSearch: 'Очисти пошук',
	clearSelected: 'Очистити вибране',
	noOptions: 'Немає опцій',
	search: 'Пошук... 🔎',
	selectAll: 'Всі ✔️',
	selectAllFiltered: 'Вибрати всі (по фільтру)',
	selectSomeItems: 'Додати',
	create: 'Створити',
}

function MultiSelectDropDown(props: any) {
	return (
		<MultiSelect
			{...props}
			// valueRenderer={customValueRenderer}
			overrideStrings={localisation}
		/>
	)
}
export default MultiSelectDropDown
