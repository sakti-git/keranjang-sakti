import React from 'react'
import { Nav, Navbar, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap'

const NavbarComponent = () => {
    return (
        <div>
            <Navbar variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand><strong>KeranjangSakti.com</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="home">Home</Nav.Link>
                            <NavDropdown title="Product" id="basic-nav-dropdown">
                                <NavDropdown.Item href="fashion-anak">Fashion Anak</NavDropdown.Item>
                                <NavDropdown.Item href="masker-kain">Masker Kain</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="kontak">Contact Us</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent
