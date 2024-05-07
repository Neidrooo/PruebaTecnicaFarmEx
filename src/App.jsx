import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { Navbar, Nav, Container, Image } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={30}
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
