import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function PaymentResultPage() {
  const router = useRouter()
  const { status, payment_id, order_id, method, error } = router.query

  if (!router.isReady) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <p>Loading payment result...</p>
        </div>
      </Layout>
    )
  }

  const isSuccess = status === 'success'
  const title = isSuccess ? 'Payment Successful' : 'Payment Failed'
  const heading = isSuccess ? 'Thank you for your order!' : 'Payment could not be completed'
  const message = isSuccess
    ? 'Your payment was processed successfully. We are preparing your order now.'
    : 'There was a problem with your payment. Please try again or continue shopping.'
  const detail = isSuccess
    ? payment_id
      ? `Payment ID: ${payment_id}`
      : null
    : error
      ? `Reason: ${error}`
      : null

  return (
    <Layout>
      <div className="container py-5">
        <div className="p-4 rounded-4 shadow-sm bg-white" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className={`border-start border-5 ${isSuccess ? 'border-success' : 'border-danger'} ps-4`}>
            <h1 className={`${isSuccess ? 'text-success' : 'text-danger'} mb-3`}>{title}</h1>
            <p className="lead mb-4">{heading}</p>
            <p>{message}</p>
            {detail && <p className="small text-muted mb-3">{detail}</p>}
            {method && <p className="small text-muted mb-3">Payment method: {method}</p>}
            {order_id && <p className="small text-muted mb-3">Order ID: {order_id}</p>}

            <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
              <Link href="/" className="btn btn-primary btn-lg">
                Back to Home
              </Link>
              <Link href="/" className="btn btn-outline-secondary btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
