const reviews = [
  { id: 1, productId: 1, name: 'Amit Sharma', rating: 5, comment: 'Amazing cakes! Highly recommend.' },
  { id: 2, productId: 2, name: 'Priya Patel', rating: 4, comment: 'Delicious pastries, will order again.' },
  { id: 3, productId: 1, name: 'Rohit Verma', rating: 5, comment: 'Best bakery in town!' },
  { id: 4, productId: 3, name: 'Sneha Gupta', rating: 5, comment: 'Fresh and absolutely yummy.' },
  { id: 5, productId: 2, name: 'Karan Mehta', rating: 4, comment: 'Great flavours and fast delivery.' },
  { id: 6, productId: 1, name: 'Aisha Khan', rating: 5, comment: 'Perfect for birthdays — beautiful presentation.' },
  { id: 7, productId: 4, name: 'Vikram Rao', rating: 5, comment: 'Loved the cupcakes, moist and tasty.' },
  { id: 8, productId: 1, name: 'Snehal Joshi', rating: 5, comment: 'Beautiful packaging and prompt service.' },
  { id: 9, productId: 5, name: 'Ravi Kumar', rating: 4, comment: 'Good value for the price.' },
  { id: 10, productId: 1, name: 'Meera Nair', rating: 5, comment: 'Cake was soft and delicious.' },
  { id: 11, productId: 2, name: 'Ankit Singh', rating: 5, comment: 'Highly professional and tasty.' },
  { id: 12, productId: 3, name: 'Deepa Iyer', rating: 4, comment: 'Nice presentation and timely delivery.' },
]

export default function handler(req, res) {
  // Optionally accept query ?productId= to filter reviews
  const { productId } = req.query
  if (productId) {
    const filtered = reviews.filter(r => String(r.productId) === String(productId))
    return res.status(200).json({ count: filtered.length, reviews: filtered })
  }
  res.status(200).json({ count: reviews.length, reviews })
}
