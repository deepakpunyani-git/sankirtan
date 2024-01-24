// AboutUs.js
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const AboutUs = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <Breadcrumbs />
          <h2>About Us</h2>
          <p>
            Welcome to Sankirtan, your spiritual hub for books, events, kirtan, motivational speeches, katha, and devotional singing.
            At Sankirtan, we are passionate about providing a platform that fosters spiritual growth, inspiration, and a sense of community.
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to connect individuals with enriching spiritual experiences, whether through literature, events, soulful kirtans,
            motivating speeches, captivating kathas, or the devotional melodies of talented singers.
          </p>

          <h3>Our Vision</h3>
          <p>
            We envision a world where people find solace, inspiration, and joy in the diverse expressions of spirituality. Through our platform,
            we aim to create a harmonious community that shares and celebrates the beauty of spiritual practices.
          </p>

          <h3>Why Choose Sankirtan?</h3>
          <p>
            Sankirtan stands out as a unique platform that brings together a curated collection of spiritual literature, meaningful events,
            soul-stirring kirtans, powerful motivational speeches, enlightening kathas, and the melodious tunes of devotional singers.
            Our commitment is to provide a holistic and uplifting experience for individuals on their spiritual journey.
          </p>

          <div className="additional-content">
            <p>
              Thank you for being a part of the Sankirtan community. Together, let's explore the depths of spirituality and inspire each other
              on the path to inner fulfillment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
