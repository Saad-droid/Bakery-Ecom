import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const imagearr = [
    { name: 1, img: '/images/slideShow1.jpeg' },
    { name: 2, img: '/images/slideshow5.jpeg' },
    { name: 3, img: '/images/slideshow4.jpeg' },
    { name: 4, img: '/images/slideshow2.jpeg' },
]

const ImageCarousel = () => {
    return (
        <div style={{ padding: '0 16px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Small Batch Big Flavour</h3>
            <Carousel
                style={{
                    backgroundColor: '#fff2b2',
                    maxWidth: '1100px',
                    margin: '0 auto',
                    height: '420px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
                }}
            >
                {imagearr.map((item, index) => (
                    <Carousel.Item key={index}>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: '420px', backgroundColor: '#fff7db' }}
                        >
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                                src={item.img}
                                alt={`Slide ${index + 1}`}
                                className="img-fluid"
                            />
                        </div>
                        <Carousel.Caption />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
