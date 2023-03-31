interface ceilTypes {
	id: string
	label: string
	type: 'string' | 'number'
}

interface SheetTypes {
	version: string | '0.6'
	reqId: string
	status: string | 'ok'
	sig: string
	table: {
		cols: ceilTypes[]
		rows: { c: { v: string }[] }[]
		parsedNumHeaders: number
	}
}

const fetchSheet = async (
	sheetName: string = 'Стопи',
	query: string = 'SELECT *'
): Promise<SheetTypes> => {
	const sheetId = process.env.REACT_APP_SHEET_ID
	const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`
	const url = `${base}sheet=${sheetName}&tq=${encodeURIComponent(query)}`
	return await fetch(url)
		.then((res) => res.text())
		.then((rep) => {
			console.log('fetched')
			return JSON.parse(rep.substring(47).slice(0, -2))
		})
		.catch((er) => alert(er))
}

// export type { SheetTypes }
export default fetchSheet
