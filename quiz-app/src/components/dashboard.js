import React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";

import Toaster from "./toaster";
import UserPic from "../images/user.svg";

import "./dashboard.css";
import "./about.css";
import { render } from "@testing-library/react";

function DashBoard() {
  const [handle, setHandle] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectTake, setRedirectTake] = useState(false);
  const [redirectSet, setRedirectSet] = useState(false);
  const [redirectReport, setRedirectReport] = useState(false);
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
          <div className="justify-items-center rounded-lg shadow-lg py-6 px-6 m-auto  bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 align-middle">
            <div className="flex justify-end right absolute right-10">
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                  Wecome, {myStorage.getItem("handle")}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="navbar-nav ml-auto">
                    <img class="user" height="37" src={UserPic} />
                    <div class="">
                      {/* <div className="card-img">
                        <i
                          class="fa fa-user-circle-o fa-3x"
                          aria-hidden="true"
                        ></i>
                      </div> */}

                      <NavDropdown
                        title={myStorage.getItem("handle")}
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
                            <i class="fa fa-sign-out" aria-hidden="true" />
                            Logout
                          </div>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
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
                <div className="card about-box">
                  <h1 className="card-header2 ">Take Up a Quiz</h1>
                  <div className="card-body">
                    <p className="card-text text-white card-p-text">
                      Got your 'QuizID'? Ready to take a Quiz? Then hit that GO
                      button!!
                    </p>
                    <button
                      class="btn btn-primary"
                      className="btn btn-qf-neon-primary text-nowrap"
                      onClick={() => {
                        setRedirectTake(true);
                      }}
                    >
                      GO
                    </button>
                  </div>
                </div>

                <div className="card about-box">
                  <h1 className="card-header2">Create a Quiz</h1>
                  <div className="card-body">
                    <p className="card-text text-white card-p-text">
                      Create you own quiz, share the QuizID to let others take
                      the quiz.
                    </p>
                    <button
                      class="btn btn-warning"
                      className="btn btn-qf-neon-primary text-nowrap"
                      onClick={() => {
                        setRedirectSet(true);
                      }}
                    >
                      Create
                    </button>
                  </div>
                </div>

                <div className="card about-box">
                  <h1 className="card-header2">View Report</h1>
                  <div className="card-body">
                    <p className="card-text text-white card-p-text">
                      View the report(s) of the quizes you created.
                    </p>
                    <button
                      class="btn btn-success"
                      className="btn btn-qf-neon-primary text-nowrap"
                      onClick={() => {
                        setRedirectReport(true);
                      }}
                    >
                      View
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
