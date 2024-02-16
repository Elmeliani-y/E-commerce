import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import SidePanier from "./SidePanier";
import LoadingSpinner from "./LoadingSpinner";
import "../style.css";

const ProductDetails = ({ addToCart, removeFromCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await response.json();
        setProduct({ ...data, quantity: 0 });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 0 });
    setProduct((prevProduct) => ({
      ...prevProduct,
      quantity: prevProduct.quantity + 1,
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <p className="loader">Error 404! The product is not found.</p>;
  }

  return (
    <div>
      <Container className="mt-4">
        <h2>{product.title}</h2>
        <Row>
          <Col md={4}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
          <Col md={8}>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className="rating">
              <p>
                <FaStar color="#FFD700" /> {product.rating.rate} / 5
              </p>
            </div>
            <Button variant="dark" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>

      <SidePanier cartItems={[product]} removeFromCart={removeFromCart} />
    </div>
  );
};

export default ProductDetails;
