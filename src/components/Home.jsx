// Home.js
import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SidePanier from "./SidePanier";
import LoadingSpinner from "./LoadingSpinner";
import ProductDetails from "./ProductDetails";

const Home = ({ addToCart, cartItems, removeFromCart }) => {
  const [lastAddedProducts, setLastAddedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchLastAddedProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=6&sort=id&order=desc"
        );
        const data = await response.json();
        setLastAddedProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching last added products:", error);
        setLoading(false);
      }
    };

    fetchLastAddedProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container className="mt-4">
            <h2>Welcome to Our E-Shop!</h2>
            <p>You can find here a lot of products that you might like.</p>

            <Row className="mt-4">
              {lastAddedProducts.map((product) => (
                <Col key={product.id} md={4} className="mb-4">
                  <Card
                    className="h-100"
                    onClick={() => handleProductClick(product)}
                  >
                    <Link to={`/product/${product.id}`}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>

          <SidePanier cartItems={cartItems} removeFromCart={removeFromCart} />

          {selectedProduct && (
            <ProductDetails product={selectedProduct} addToCart={addToCart} />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
