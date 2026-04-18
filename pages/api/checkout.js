// Razorpay order creation endpoint
import Razorpay from 'razorpay'

const KEY_ID = process.env.RAZORPAY_KEY_ID || ''
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || ''

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  if (!KEY_ID || !KEY_SECRET) {
    console.error('Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET')
    return res.status(500).json({ error: 'Razorpay keys not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' })
  }

  try {
    const { cart } = req.body
    if (!cart || !Array.isArray(cart)) return res.status(400).json({ error: 'Invalid cart' })

    // calculate total in rupees
    const totalRupees = cart.reduce((sum, item) => {
      const rupees = parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0
      return sum + rupees * (item.quantity || 1)
    }, 0)

    const amountPaise = totalRupees * 100

    const instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })
    const order = await instance.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    })

    // Return order details and public key for client checkout
    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || KEY_ID,
    })
  } catch (err) {
    console.error('Razorpay order error:', err && err.message ? err.message : err)
    res.status(500).json({ error: err && err.message ? err.message : 'Server error' })
  }
}
