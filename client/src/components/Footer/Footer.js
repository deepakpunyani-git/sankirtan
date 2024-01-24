import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#ffede7" }}>
      <Container className="my-5">
        <Row>
          <Col lg={3} md={6} mb={4}>
            <h5 className="mb-3" style={{ letterSpacing: "2px", color: "#7f4722" }}>Site Links</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-1">
                <a href="/terms-and-conditions" style={{ color: "#4f4f4f" }}>Terms and Conditions</a>
              </li>
              <li className="mb-1">
                <a href="/privacy-policy" style={{ color: "#4f4f4f" }}>Privacy Policy</a>
              </li>
              <li className="mb-1">
                <a href="#!" style={{ color: "#4f4f4f" }}>Pricing</a>
              </li>
              <li>
                <a href="#!" style={{ color: "#4f4f4f" }}>Where We Deliver?</a>
              </li>
            </ul>
          </Col>
          {/* Add more Col components for additional columns */}
        </Row>
      </Container>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2024 SanKirtan
      </div>
    </footer>
  );
};

export default Footer;