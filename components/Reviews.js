import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'

const Reviews = ({ productId = null }) => {
  const [reviews, setReviews] = useState([])
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const onResize = () => setItemsPerView(window.innerWidth < 768 ? 1 : 3)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const url = productId ? `/api/reviews?productId=${productId}` : '/api/reviews'
    let mounted = true
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        setReviews(data.reviews || [])
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [productId])

  const slides = []
  for (let i = 0; i < reviews.length; i += itemsPerView) {
    slides.push(reviews.slice(i, i + itemsPerView))
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">Customer Reviews</h2>
        <p className="text-center text-muted">No reviews yet</p>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Customer Reviews</h2>

      <Carousel
        indicators={slides.length > 1}
        controls={slides.length > 1}
        interval={2000}
        pause="hover"
       
        className="w-100"
      >
        {slides.map((group, si) => (
          <Carousel.Item key={si} className="w-100">
            <div className="row gx-3 w-100">
              {group.map((r) => (
                <div key={r.id} className={`col-12 ${itemsPerView === 3 ? 'col-md-4' : ''}`}>
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title mb-1">{r.name}</h6>
                      <div className="mb-2 text-warning">
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </div>
                      <p className="card-text text-muted">{r.comment}</p>
                      <div className="mt-auto">
                        <small className="text-muted">Verified purchase</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Reviews