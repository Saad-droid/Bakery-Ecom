import products from '../../components/productsData'

export default function handler(req, res) {
  // Return the product list as JSON
  res.status(200).json({ count: products.length, products })
}
