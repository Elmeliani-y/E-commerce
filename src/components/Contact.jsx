import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);


    return () => clearTimeout(timeout);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form data submitted:', formData);

  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <header className="bg-dark text-white text-center py-5">
            <h1>Contact us</h1>
            <p>Here's our contact form. You can contact our client service for assistance.</p>
          </header>

          <Container className="py-5">
            <Row>
              <Col md={6}>
                <p>If you have any problems or suggestions, please do not hesitate to contact us!</p>
              </Col>
              <Col md={6}>
                <h2>Contact Form</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default Contact;
