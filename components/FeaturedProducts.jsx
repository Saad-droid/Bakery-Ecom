// src/components/FeaturedProducts.jsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const FeaturedProducts = () => {
  const { addToCart, cart, decrement } = useCart();

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch('/api/products').then(r => r.json()).then(data => {
      if (!mounted) return
      setProducts(data.products || [])
      setLoading(false)
    }).catch(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  const getQuantity = (name) => {
    const item = cart.find((p) => p.name === name);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container py-5" id="shop">
      <h2 className="text-center mb-4">Our Bestsellers</h2>
      <div className="row ">
        {(loading ? [] : products).map((product, idx) => {
          const quantity = getQuantity(product.name);
          return (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm" style={{ color: "brown" }}>
                <Link href={`/products/${product.id}`}>
                  <div style={{ position: 'relative', width: '100%', height: 320 }}>
                    <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text text-muted">{product.price}</p>

                  {quantity > 0 ? (
                    <div>
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => decrement(product.name)}
                      >
                        -
                      </button>
                      <span style={{ padding: "5px" }}>{quantity}</span>
                      
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => addToCart(product)}
                        disabled={quantity >= product.stock}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-dark"
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      Add to cart
                    </button>
                  )}
                  <div>only {product.stock} left!!</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
