import { nanoid } from 'nanoid'
import fetchSheet from '../api/fetchSheet'

type StoreType = { label: string; value: string }

const getStores = async (): Promise<StoreType[]> => {
	const res = await fetchSheet('sheetName', 'SELECT A, B, C, D, E')
	const stores: StoreType[] = res.table.rows
		.filter((row) => row.c[0]?.v) // filter out rows where store is undefined or null
		.map((row) => ({ label: row.c[0].v, value: nanoid() })) // create a new StoreType for each row with defined store name

	console.log(stores)
	return stores
}
export type { StoreType }
export default getStores
