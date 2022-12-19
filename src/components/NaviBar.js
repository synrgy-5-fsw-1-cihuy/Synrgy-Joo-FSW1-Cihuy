import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../assets/style.css";

function NaviBar() {
  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg navbg fixed-top">
        <Container>
          <Navbar.Brand href="#home">HOME</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link className="navtext" href="#our_services">
              Our Services
            </Nav.Link>
            <Nav.Link className="navtext" href="#why_us">
              Why Us
            </Nav.Link>
            <Nav.Link className="navtext" href="#testimonial">
              Testimonial
            </Nav.Link>
            <Nav.Link className="navtext" href="#testimonial">
              FAQ
            </Nav.Link>
            <Nav.Link className="navregister" href="#register">
              Register
            </Nav.Link>
          </Nav>
        </Container>
      </nav>
    </>
  );
}

export default NaviBar;
