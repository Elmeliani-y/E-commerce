import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import '../index.css'

const NavbarComponent = ({ toggleCart }) => {
  const navbarStyle = {
    backgroundColor: "black",
    minHeight: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Navbar style={navbarStyle} variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          src = {require("../assets/logo.jpg")}
          alt=""
          style={{ width: "60px", height: "60px", marginRight: "10px" }}
        />
        <span className="title">OnlineShop</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          {categories.length > 0 && (
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {categories.map((category, index) => (
                <NavDropdown.Item
                  key={index}
                  as={Link}
                  to={`/category/${category}`}
                >
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          )}
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
          <Nav.Link as={Link} to="/panier">
            View Cart
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
