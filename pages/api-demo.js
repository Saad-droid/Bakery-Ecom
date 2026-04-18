import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'

export default function ApiDemo() {
  const [products, setProducts] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [pRes, rRes] = await Promise.all([fetch('/api/products'), fetch('/api/reviews')])
      const pJson = await pRes.json()
      const rJson = await rRes.json()
      setProducts(pJson)
      setReviews(rJson)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <Layout>
      <div className="container py-5">
        <h1 className="mb-4">API Demo</h1>
        {loading && <p>Loading API responses…</p>}

        {!loading && (
          <div>
            <section className="mb-4">
              <h3>Products</h3>
              <pre style={{ maxHeight: 300, overflow: 'auto', background: '#f8f9fa', padding: 12 }}>{JSON.stringify(products, null, 2)}</pre>
            </section>

            <section>
              <h3>Reviews</h3>
              <pre style={{ maxHeight: 300, overflow: 'auto', background: '#f8f9fa', padding: 12 }}>{JSON.stringify(reviews, null, 2)}</pre>
            </section>
          </div>
        )}
      </div>
    </Layout>
  )
}
