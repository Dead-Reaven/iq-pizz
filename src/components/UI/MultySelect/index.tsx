import { MultiSelect, SelectProps } from 'react-multi-select-component'
import './MultySelect.css'
// to show more documentation https://www.npmjs.com/package/react-multi-select-component

// const customValueRenderer = (
// 	selected: Array<{ label: string; value: string }>,
// 	_options: any
// ) => {
// 	const labels = selected.map((selected) => '✔️' + selected.label)
// 	return labels.length ? labels : 'Додати'
// }

function MultiSelectDropDown(props: SelectProps) {
	const localisation = {
		allItemsAreSelected: 'Усі добавки прийняті ✔️',
		clearSearch: 'Очисти пошук',
		clearSelected: 'Очистити вибране',
		noOptions: 'Немає опцій',
		search: 'Пошук... 🔎',
		selectAll: 'Всі ✔️',
		selectAllFiltered: 'Вибрати всі (по фільтру)',
		selectSomeItems: props.labelledBy,
		create: 'Створити',
	}
	return (
		<MultiSelect
			{...props}
			// valueRenderer={customValueRenderer}
			debounceDuration={0}
			overrideStrings={localisation}
		/>
	)
}
export default MultiSelectDropDown
