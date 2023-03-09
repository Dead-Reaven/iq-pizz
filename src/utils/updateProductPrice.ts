import { ProductTypes } from '../features/orderSlice'

const getTotalProductPrice = (products: Array<ProductTypes>, id: string) => {
	const product = products.find((product) => product.id === id)
	if (product) {
		product.totalPrice = product.quantity * product.price
		if (product.addition?.length) {
			product.totalPrice +=
				product.quantity *
				product.addition.reduce((sum, product) => sum + product.price, 0)
		}
		return product.totalPrice
	}
	return 0
}

export default getTotalProductPrice
