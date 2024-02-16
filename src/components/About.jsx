import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <header className="bg-dark text-white text-center py-5">
            <h1>About dev corp </h1>
            <p>Get to know the dev team.</p>
          </header>

          <Container className="py-5">
            <Row>
              <Col md={6}>
                <h2>the head dev </h2>
                <p>
                  hi, my name is youssef el meliani, I'm an 18 years old boy from marrakech, I started my journey in web development with a passion for
                  creating amazing websites. it first started when my brother joined ista ntic syba and I was seeing him working on projects, now I think the passion has traveled to me so I can create my journey in here, zvzn that web development made it for me a bit difficult but you have to be brave if you wanna achieve your goals!
                </p>
                <p>
                  My goal is to create websites and maintain myself to become a better developer and hopefully make my own company
                </p>
              </Col>
              <Col md={6}>
                <h2>our Skills</h2>
                <Card>
                  <Card.Body>
                    <Card.Title>Front-end Development</Card.Title>
                    <Card.Text>
                      HTML, CSS, JavaScript, React, Bootstrap
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Back-end Development</Card.Title>
                    <Card.Text>
                      Node.js, SQL, PHP, Python
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Programming Languages</Card.Title>
                    <Card.Text>
                      Python, JavaScript, PHP, C, C++, Dart
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default About;
