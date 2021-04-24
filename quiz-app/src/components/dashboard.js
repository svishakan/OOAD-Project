import React from "react";
import { useState, useEffect } from "react";
//import Loading from "./loading";
import { Redirect } from "react-router-dom";
//import Navbar from 'react-bootstrap/Navbar'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  DropdownButton,
  MenuItem,
  CollapsibleNav,
} from "react-bootstrap";

//import CreateQuiz from "/components/crearequiz";
//import TakeUpQuiz from "/components/takeupquiz";
//import ViewProfile from "/components/viewprofile";

import "./dashboard.css";

function DashBoard() {
  const [handle, setHandle] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectTake, setRedirectTake] = useState(false);
  const [redirectSet, setRedirectSet] = useState(false);
  const [redirectReport, setRedirectReport] = useState(false);
  //const [redirectHome, setRedirectHome] = useState(false);
  const [loading, setLoading] = useState(false);

  let myStorage = window.localStorage;

  // useEffect(() => {
  //   if (myStorage.getItem("handle") === handle) {
  //     setRedirectHome(true);
  //   } else {
  //     setHandle(myStorage.getItem("handle"));
  //   }
  // }, []);

  if (redirectSet) return <Redirect to="/quizcreator" />;
  if (redirectTake) return <Redirect to="/quizfinder" />;
  if (redirectReport) return <Redirect to="/YourQuizes" />;
  return (
    <div>
      {redirectHome === true ? (
        <Redirect to="/enter" />
      ) : (
        <div>
          <div className="text-center ">
            <div className="">
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Hi, {myStorage.getItem("handle")}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <NavDropdown title="Settings" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/enter">
                        <div className="card-img">
                          <i class="fa fa-sign-out" aria-hidden="true" />
                          Logout
                        </div>
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown>
                    <div className="flex justify-right-10">
                      <Navbar.Brand>
                        <picture
                          src="/src/images/loading.svg"
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
            <div className="fixed pt-20">
              <div className="flex absolute justify-around w-screen ">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => {
                    setRedirectTake(true);
                  }}
                >
                  Take Up Quiz
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => {
                    setRedirectSet(true);
                  }}
                >
                  Create a Quiz
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => {}}
                >
                  View Profie
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => {
                    setRedirectReport(true);
                  }}
                >
                  Reportcard
                </button>
              </div>
            </div>

            {/* <table>
          <div className="flex items-center">
            <tr>
              <td>
              
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded transform motion-safe:hover:scale-110">
                Take Up Quiz</button>
              </td>
              <td>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Create a Quiz</button>
              </td>
            </tr>
            <tr>
              <td>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              View Profie</button>
              </td>
              <td>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
               </button>
              </td>
            </tr>
            </div>
          </table> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
