import React from "react";
import { useState, useEffect } from "react";
//import Loading from "./loading";
import { Redirect } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';

import Toaster from "./toaster";

//import CreateQuiz from "/components/crearequiz";
//import TakeUpQuiz from "/components/takeupquiz";
//import ViewProfile from "/components/viewprofile";

import "./dashboard.css";
import { render } from "@testing-library/react";

function DashBoard() {
    const [handle, setHandle] = useState("");
    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectTake, setRedirectTake] = useState(false);
    const [redirectSet, setRedirectSet] = useState(false);
    const [redirectReport, setRedirectReport] = useState(false);
    //const [redirectHome, setRedirectHome] = useState(false);
    const [loading, setLoading] = useState(false);

    let myStorage = window.localStorage;

    useEffect(() => {
        if (myStorage.getItem("handle") === handle) {
            setRedirectHome(true);
        } else {
            setHandle(myStorage.getItem("handle"));
        }
    }, []);

    if (redirectSet) return <Redirect to="/quizcreator" />;
    if (redirectTake) return <Redirect to="/quizfinder" />;
    if (redirectReport) return <Redirect to="/YourQuizes" />;
    return (
        <div>
            {redirectHome === true ? (
                <Redirect to="/enter" />
            ) : (
                <div className="justify-items-center rounded-lg shadow-lg py-6 px-6 m-auto  bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 align-middle">
                    <div className="flex justify-end right absolute right-10">


                        <nav
                            className="navbar navbar-expand-lg navbar-light bg-light"
                            style={{ backgroundColor: "#e3f2fd" }}>
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">
                                    Hi, {myStorage.getItem("handle")}
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarNavAltMarkup"
                                    aria-controls="navbarNavAltMarkup"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                        <a className="nav-item nav-link active" href="#">
                                            Profile <span className="sr-only">(current)</span>
                                        </a>
                                        <a className="nav-item nav-link" href="#">
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <button
                            className="logout"
                            onClick={() => {
                                console.log("of to login");
                                render(
                                    <Toaster 
                                        headerText={"Logged Out"} 
                                        bodyText={`${handle} successfully logged out!`}
                                        bgType={"bg-info"}
                                        textColor={"text-white"} />
                                );
                                setRedirectHome(true);
                            }}>
                            Logout</button>
                    </div>
                    <div className="fixed pt-20">
                        <div className="flex absolute justify-around w-screen ">
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                onClick={() => {
                                    setRedirectTake(true);
                                }}>
                                Take Up Quiz</button>

                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                onClick={() => {
                                    setRedirectSet(true);
                                }}>Create a Quiz</button>

                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                onClick={() => { }}>
                                View Profile</button>

                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                onClick={() => {
                                    setRedirectReport(true);
                                }}>
                                Quiz Reports</button>
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
            )}
        </div>
    );
}

export default DashBoard;
