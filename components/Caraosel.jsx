import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const imagearr = [
    { name: 1, img: '/images/slideShow1.jpeg' },
    { name: 2, img: '/images/slideshow5.jpeg' },
    { name: 3, img: '/images/slideshow4.jpeg' },
    { name: 4, img: '/images/slideshow3.jpeg' },
]

const ImageCarousel = () => {
    return (
        <div>
               <h3  style={{textAlign:"center"}}>Small Batch Big Flavour</h3>
        <Carousel style={{ backgroundColor: "fff2b2", height: '400px' }} >
            
            {imagearr.map((item, index) => (
               
                <Carousel.Item key={index}>
                  
                    
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                        <img
                            style={{ maxWidth: "50%", backgroundSize: 'cover' }}
                            src={item.img}
                            alt={`Slide ${item}`}
                            className="img-fluid"
                        />
                    </div>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
        </div>
    );
};

export default ImageCarousel;
