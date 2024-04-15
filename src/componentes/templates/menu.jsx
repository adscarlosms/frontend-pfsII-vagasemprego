import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { useContext } from 'react';
//import { ContextoUsuario } from '../contexto/Contexto';
import {Link} from 'react-router-dom';

export default function Menu(props) {
  
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to="/">Menu</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                       
                        <NavDropdown title="Inscricoes" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Link to="/inscricao">Realizar Nova Inscrição</Link></NavDropdown.Item>
                            <NavDropdown.Divider />                            
                        </NavDropdown>
                      
                    </Nav>
                </Navbar.Collapse>
              

            </Container>
        </Navbar>    
    );
}