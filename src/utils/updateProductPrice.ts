import { ProductTypes } from '../features/orderSlice'

const getTotalProductPrice = (products: Array<ProductTypes>, id: string) => {
	const product = products.find((product) => product.id === id)
	if (product) {
		product.totalPrice = product.quantity * product.price
		if (product.addition?.length) {
			product.totalPrice +=
				product.quantity *
				product.addition.reduce((sum, addition) => sum + addition.totalPrice, 0)
		}
		if (product.border) {
			product.totalPrice += product.border.price * product.quantity
		}
		return product.totalPrice
	}
	return 0
}

export default getTotalProductPrice
