import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner'; 
const Panier = ({ cartItems, removeFromCart, reduceQuantity }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const renderProductInfo = (item) => {
    return (
      <>
        <p>
          {item.title} x{item.quantity}
        </p>
        <Button
          variant="dark"
          onClick={() => (item.quantity > 1 ? reduceQuantity(item) : removeFromCart(item))}
        >
          {item.quantity > 1 ? 'Reduce Quantity' : 'Remove Product'}
        </Button>
      </>
    );
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <Card key={item.id} className="mb-3">
                  <Card.Body>
                    <img src={item.image} alt={item.title} style={{ maxWidth: '50px', marginRight: '10px' }} />
                    {renderProductInfo(item)}
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </Card.Body>
                </Card>
              ))}
              <div className="mt-3">
                <h4>Total Price: ${calculateTotalPrice()}</h4>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Panier;
