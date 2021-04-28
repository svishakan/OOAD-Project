import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";

//Image imports
import UserPic from "../images/user.svg";
import HutLogo from "../images/hut_logo.svg";


function Navigation() {
    const [handle, setHandle] = useState("");

    let myStorage = window.localStorage;

    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
        } else {
            setHandle(myStorage.getItem("handle"));
        }
    }, [myStorage]);

    return (
        <div className="flex justify-end right absolute right-10">
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand>
                    <Link to="/dashboard" style={{ textDecoration: "none", color: "#fff" }}>
                        <span className="brand-font" style={{ fontSize: "30px" }}>
                            <img className="user" height="50" width="50" src={HutLogo} />
                            <span>Qu
                                <span className="brand-u-style">i</span>zH
                                <span className="brand-u-style">u</span>t
                            </span>
                        </span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-nav ml-auto">
                        <NavDropdown
                            title={<span><img className="user" height="35" src={UserPic} alt="" />{handle}</span>}
                            id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/profile">
                                View Profile
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/Feedback">
                                Got a feedback?
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item href="/About">
                                About Us
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/enter">
                                <div className="card-img">
                                    <i className="fa fa-sign-out" aria-hidden="true" />
                                        Logout
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <div className="flex justify-right-10">
                            <Navbar.Brand>
                                <picture
                                    src="/src/images/.svg"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="logo"
                                />
                            </Navbar.Brand>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

export default Navigation;