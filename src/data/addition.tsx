import { nanoid } from 'nanoid'
import { AdditionTypes, BorderTypes } from '../features/orderSlice'

const additionFood: AdditionTypes[] = [
	{ label: 'ананас', price: 14 },
	{ label: 'бекон', price: 25 },
	{ label: 'гриби', price: 9 },
	{ label: 'жовток', price: 15 },
	{ label: 'кукурудза', price: 5 },
	{ label: 'курка', price: 20 },
	{ label: 'цибуля маринована', price: 5 },
	{ label: 'маслини', price: 10 },
	{ label: 'перець болгарський', price: 10 },
	{ label: 'пепероні', price: 35 },
	{ label: 'огірок маринований', price: 7 },
	{ label: 'перець Халапеньйо', price: 10 },
	{ label: 'помідор', price: 10 },
	{ label: 'салямі баликова', price: 20 },
	{ label: 'сосиски баварські', price: 20 },
	{ label: 'сир дор блю', price: 25 },
	{ label: 'сир Чеддер', price: 30 },
	{ label: 'пармезан', price: 25 },
	{ label: 'свинина', price: 29 },
	{ label: 'Подвійний сир', price: 19 },
	{ label: 'чорне тісто 30', price: 10 },
	{ label: 'чорне тісто 45', price: 20 },
	{ label: 'петрушка', price: 3 },
].map((el) => {
	return {
		...el,
		quantity: 0,
		totalPrice: el.price,
		isChecked: false,
		id: nanoid(),
	}
})

const additionBorders: BorderTypes[] = [
	{ label: 'базовий', price: 0 },
	{ label: 'сулугуні 30', price: 45 },
	{ label: 'сулугуні 45', price: 90 },
	{ label: 'крем-сиром 30', price: 39 },
	{ label: 'крем-сиром 45', price: 78 },
].map((el) => {
	return { ...el, id: nanoid() }
})

export { additionBorders, additionFood }
