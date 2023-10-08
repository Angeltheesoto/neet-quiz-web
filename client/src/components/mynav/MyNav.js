import React from "react";
import "./mynav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTheme } from "../../context/ThemeContext";

const MyNav = () => {
  const { theme } = useTheme();
  const myPaths = [
    { name: "Home", url: "/" },
    { name: "Saved", url: "/saved" },
    { name: "Settings", url: "/settings" },
  ];

  const navBarLinks = () => {
    return (
      <Nav>
        {myPaths.map((path) => (
          <Nav.Link href={path.url} style={theme ? null : { color: "white" }}>
            {path.name}
          </Nav.Link>
        ))}
      </Nav>
    );
  };

  return (
    <Navbar expand="sm">
      <Container data-theme={theme ? "light" : "dark"}>
        <Navbar.Brand
          href="/"
          data-theme={theme ? "light" : "dark"}
          style={theme ? null : { color: "white" }}
        >
          Neetquiz
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={theme ? null : "toggle"}
        />
        <Navbar.Collapse id="basic-navbar-nav">{navBarLinks()}</Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
