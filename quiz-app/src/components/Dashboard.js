import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import UserPic from "../images/user.svg";
import {
    Button,
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
} from "react-bootstrap";


function DashBoard() {
    const [handle, setHandle] = useState("");
    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectTake, setRedirectTake] = useState(false);
    const [redirectSet, setRedirectSet] = useState(false);
    const [redirectReport, setRedirectReport] = useState(false);
    const { addToast } = useToasts();
    // const [redirectFeedback, setredirectFeedback] = useState(false);

    const [loading, setLoading] = useState(false);

    let myStorage = window.localStorage;

    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else {
            setHandle(myStorage.getItem("handle"));
        }
    }, []);

    if (redirectSet) return <Redirect to="/quizcreator" />;
    if (redirectTake) return <Redirect to="/quizfinder" />;
    if (redirectReport) return <Redirect to="/YourQuizes" />;
    //if (redirectFeedback) return <Redirect to="/Feedback" />;

    return (
        <div>
            {redirectHome === true ? (
                <Redirect to="/enter" />
            ) : (
                <div>
                    <div className="justify-items-center">
                        <div className="flex justify-end right absolute right-10">
                            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                                <Navbar.Brand>
                                    Wecome to QuizHut!
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="navbar-nav ml-auto">
                                            <NavDropdown
                                                title={<span><img className="user" height="37" src={UserPic}/>{handle}</span>}
                                                id="collasible-nav-dropdown"
                                            >
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
                        <div className="">
                            <div className="card-deck card-custom-margin">
                                <div className="card about-box ice-hover">
                                    <h1 className="card-header2">Take Up a Quiz</h1>
                                    <i className="card-img-top card-custom-img fas fa-clipboard"></i>
                                    <div className="card-body">
                                        <p className="card-text text-white card-p-text">
                                            Attempt an existing quiz with its unique quiz ID.
                                        </p>
                                    </div>
                                    <div className="card-footer text-muted">
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            onClick={() => {
                                                setRedirectTake(true);
                                            }}>
                                            TAKE A QUIZ
                                        </button>
                                    </div>
                                </div>

                                <div className="card about-box ice-hover">
                                    <h1 className="card-header2">Create a Quiz</h1>
                                    <i className="card-img-top card-custom-img fas fa-feather"></i>
                                    <div className="card-body">
                                        <p className="card-text text-white card-p-text">
                                            Build your own quiz and share it to others with its quiz ID.
                                        </p>
                                    </div>
                                    <div className="card-footer text-muted">
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            onClick={() => {
                                                setRedirectSet(true);
                                            }}>
                                            CREATE A QUIZ
                                        </button>
                                    </div>
                                </div>

                                <div className="card about-box ice-hover">
                                    <h1 className="card-header2">View Report</h1>
                                    <i className="card-img-top card-custom-img fas fa-poll-h"></i>
                                    <div className="card-body">
                                        <p className="card-text text-white card-p-text">
                                            Check the reports for the quizzes that you have set.
                                        </p>
                                    </div>
                                    <div className="card-footer text-muted">
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            onClick={() => {
                                                setRedirectReport(true);
                                            }}>
                                            VIEW REPORTS
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashBoard;
