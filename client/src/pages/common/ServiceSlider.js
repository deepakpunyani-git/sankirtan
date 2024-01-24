// ServiceSlider.js
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const services = [
  { id: 1, title: 'Service 1', imageUrl: 'https://placekitten.com/800/400', link: '/service1' },
  { id: 2, title: 'Service 2', imageUrl: 'https://placekitten.com/800/401', link: '/service2' },
  { id: 3, title: 'Service 3', imageUrl: 'https://placekitten.com/800/402', link: '/service3' },
  { id: 4, title: 'Service 4', imageUrl: 'https://placekitten.com/800/403', link: '/service4' },
  { id: 5, title: 'Service 5', imageUrl: 'https://placekitten.com/800/404', link: '/service5' },
  { id: 6, title: 'Service 6', imageUrl: 'https://placekitten.com/800/405', link: '/service6' },
];

const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
    Next
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
    Prev
  </div>
);

const ServiceSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...sliderSettings}>
      {services.map((service) => (
        <div key={service.id}>
          <Link to={service.link}>
            <img src={service.imageUrl} alt={service.title} />
            <h3>{service.title}</h3>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default ServiceSlider;
