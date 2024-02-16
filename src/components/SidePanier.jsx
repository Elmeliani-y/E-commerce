import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../style.css';

const SidePanier = ({ cartItems, removeFromCart }) => {
  const [showPanier, setShowPanier] = useState(false);

  const handleTogglePanier = () => {
    setShowPanier(!showPanier);
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return acc + itemTotal;
    }, 0);

    return total.toFixed(2);
  };

  return (
    <div className={`side-panier${showPanier ? ' show' : ''}`}>
      <>
        <Button variant="dark" className="toggle-btn" onClick={handleTogglePanier}>
          {showPanier ? 'Hide Panier' : 'Show Panier'}
        </Button>
        <Container className="panier-container">
          <h2>Panier</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="panier-item">
              <p>
                {item.title} x{item.quantity} - ${item.price * item.quantity || 0}
              </p>
              <Button variant="danger" onClick={() => removeFromCart(item)}>
                Remove
              </Button>
            </div>
          ))}
          {cartItems.length === 0 && <p>Your panier is empty.</p>}
          <p>Total Price: ${calculateTotalPrice()}</p>
        </Container>
        <Link to="/panier"  className="d-flex justify-content-center">
          <Button variant="dark" className="panier-btn" style={{ width: '200px' }}>
            Go to Panier
          </Button>
        </Link>
      </>
    </div>
  );
};

export default SidePanier;
