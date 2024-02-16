// Categorie.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import SidePanier from './SidePanier';
import LoadingSpinner from './LoadingSpinner';
import ProductDetails from './ProductDetails';

const Categorie = ({ addToCart, cartItems, removeFromCart }) => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
        const data = await response.json();
        setCategoryProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

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
            <h2>Category: {categoryName}</h2>
            <Row>
              {categoryProducts.map((product) => (
                <Col key={product.id} md={4}>

                    <Card className="mb-4" onClick={() => handleProductClick(product)}>
                      <Link to={`/product/${product.id}`}>
                      <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
                       </Link>
                      <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>${product.price}</Card.Text>
                        <Button variant="primary" onClick={() => addToCart(product)}>
                          Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                 
                </Col>
              ))}
            </Row>
          </Container>

          {selectedProduct && <ProductDetails product={selectedProduct} addToCart={addToCart} />}
        </>
      )}
      <SidePanier cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default Categorie;
