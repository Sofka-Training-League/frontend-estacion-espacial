
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import logo from '../assets/image/logoObjeto.png'
import user from '../assets/image/user.PNG'
import '../styles/navbar.css'

const NavbarNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="px-4">
        <NavbarBrand className="navbarBrand" href="/admin/users">
        ADMINISTRADOR</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
          <img width="55" className="px-1" src={user} alt=""/>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Duhan Renteria
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Mi Perfil
                </DropdownItem>
                <DropdownItem>
                  Configuraciones
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => {window.location.href= "/"}}>
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarNav;