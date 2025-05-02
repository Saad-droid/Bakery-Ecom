import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../images/logo.png";
import slideShow1 from "../images/slideShow1.jpeg";
import slideShow2 from "../images/slideshow2.jpeg";
import slideShow3 from "../images/slideShow3.jpeg";
import slideShow5 from "../images/slideshow5.jpeg";
import slideShow4 from "../images/slideshow4.jpeg";

const imagearr = [
    {
        name: 1,
        img: slideShow1
    },
    {
        name: 2,
        img: slideShow5
    },
    {
        name: 3,
        img: slideShow4
    },
    {
        name: 4,
        img: slideShow5
    }
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
