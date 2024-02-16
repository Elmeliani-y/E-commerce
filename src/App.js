import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Panier from './components/Panier';
import Categorie from './components/Categorie';
import ProductDetails from './components/ProductDetails';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const reduceQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );

    setCartItems(updatedCart.filter((cartItem) => cartItem.quantity > 0));
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      if (typeof product.price === 'number') {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      } else {
        console.error(`Invalid price for product: ${JSON.stringify(product)}`);
      }
    }
  };

  const removeFromCart = (item, removeAll = false) => {
    if (removeAll) {
      const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
      setCartItems(updatedCart);
    } else {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
      setCartItems(updatedCart.filter((cartItem) => cartItem.quantity > 0));
    }
  };

  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} cartItems={cartItems} removeFromCart={removeFromCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/category/:categoryName"
          element={<Categorie addToCart={addToCart} cartItems={cartItems} removeFromCart={removeFromCart} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/panier"
          element={<Panier cartItems={cartItems} removeFromCart={removeFromCart} reduceQuantity={reduceQuantity} />}
        />
        <Route
      path="/product/:productId"
      element={<ProductDetails addToCart={addToCart} removeFromCart={removeFromCart} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
