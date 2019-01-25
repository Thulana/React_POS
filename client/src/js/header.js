import React from 'react';
import { Navbar } from 'react-bootstrap';
import { userService } from '../util/userService';

function handleClick(e) {
    userService.logout()
};
const Header = () => (

    <header>
        <div className="text-center">
            <h1>
                <a href="/">Point of Sale System</a>
            </h1>
        </div>
        {/* Component taken from React Bootstrap */}
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">POS</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Navbar.Text>
                    <Navbar.Link href="/orders">Orders</Navbar.Link>
                </Navbar.Text>
                <Navbar.Text pullRight>
                <Navbar.Link href = "" onClick={handleClick}>Logout</Navbar.Link>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    </header>
)

export default Header
