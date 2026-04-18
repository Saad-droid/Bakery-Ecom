import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import products from '../../components/productsData'
import { useCart } from '../../context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import Reviews from '../../components/Reviews'

const sectionStyle = {
  background: '#fff',
  padding: '1.5rem',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
}

export async function getStaticPaths() {
  const paths = products.map((p) => ({ params: { id: String(p.id) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => String(p.id) === params.id) || null;
  return { props: { product } };
}

const ProductPage = ({ product }) => {
  const { addToCart } = useCart();
  if (!product) return <Layout><p>Product not found</p></Layout>;

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <div style={{ position: 'relative', width: '100%', height: 420 }}>
              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="col-md-6">
            <div style={sectionStyle}>
              <h2 className="mb-1">{product.name}</h2>
              <p className="text-muted mb-2" style={{ fontSize: '1.25rem' }}>{product.price}</p>
              <p className="mb-3">{product.description}</p>
              <p><strong>Stock:</strong> {product.stock} available</p>
              <p><strong>Weight:</strong> 200g (approx)</p>
              <p><strong>Ingredients:</strong> Flour, sugar, eggs, butter, fresh fruits, nuts (where applicable)</p>
              <p><strong>Delivery:</strong> Next-day delivery available within the city. Select delivery date at checkout.</p>

              <div className="d-flex gap-2">
                <button className="btn btn-dark" onClick={() => addToCart(product)} disabled={product.stock<=0}>
                  Add to cart
                </button>
                <Link href="/" className="btn btn-outline-secondary">Back to shop</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <Reviews productId={product.id} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductPage
