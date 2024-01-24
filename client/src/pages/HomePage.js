import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image1.jpg"  // Adjust the path based on your actual folder structure
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomePage;