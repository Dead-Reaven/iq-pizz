import { MultiSelect, SelectProps } from 'react-multi-select-component'
import './MultySelect.css'
// to show more documentation https://www.npmjs.com/package/react-multi-select-component

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
			debounceDuration={0}
			overrideStrings={localisation}
		/>
	)
}
export default MultiSelectDropDown
