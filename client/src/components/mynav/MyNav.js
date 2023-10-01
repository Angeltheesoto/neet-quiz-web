import React from "react";
import "./mynav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const MyNav = () => {
  const myPaths = [
    { name: "Home", url: "/" },
    { name: "Saved", url: "/saved" },
    { name: "Settings", url: "/settings" },
  ];

  const navBarLinks = () => {
    return (
      <Nav>
        {myPaths.map((path) => (
          <Nav.Link href={path.url}>{path.name}</Nav.Link>
        ))}
      </Nav>
    );
  };

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand href="/">Neetquiz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">{navBarLinks()}</Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
