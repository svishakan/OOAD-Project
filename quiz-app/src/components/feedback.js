import React from "react";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Toaster from "./toaster";

import { render } from "@testing-library/react";

const Feedback = () => {
    const [handle, setHandle] = useState("");
    const [redirectHome, setRedirectHome] = useState(false);
    let myStorage = window.localStorage;

    useEffect(() => {
        if (myStorage.getItem("handle") === handle) {
            setRedirectHome(true);
        } else {
            setHandle(myStorage.getItem("handle"));
        }
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                e.target,
                process.env.REACT_APP_EMAILJS_USER_ID
            )
            .then(
                (result) => {
                    render(
                        <Toaster
                            headerText={"Feedback Sent"}
                            bodyText={"Thank you for your valuable feedback. We appreciate it!"}
                            bgType={"bg-success"}
                            textColor={"text-white"}
                        />
                    );

                    console.log(result.text);
                },
                (error) => {
                    render(
                        <Toaster
                            headerText={"Error: Feedback"}
                            bodyText={"Your feedback could not be sent! Try again later!"}
                            bgType={"bg-danger"}
                            textColor={"text-white"}
                        />
                    );

                    console.log(error.text);
                }
            );
        e.target.reset();
    };

    if (redirectHome) return <Redirect to="/" />;
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-img">
                        <i class="fas fa-comment-dots" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 login-title">WRITE TO US</div>
                    <div className="col-lg-12 login-form">
                        <form
                            onSubmit={(event) => {
                                sendEmail(event);
                            }}>
                            <div className="form-group">
                                <label className="form-control-label">HANDLE</label>

                                <input
                                    type="text"
                                    name="handle"
                                    size="20"
                                    value={handle}
                                    onChange={() => {
                                        setHandle(handle);
                                    }}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">FEEDBACK</label>
                                <textarea
                                    style={{resize: "none"}}
                                    className="form-control form-control-textarea"
                                    name="message"
                                    rows="5"
                                    placeholder="Kindly enter your feedback here">
                                </textarea>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="d-flex justify-content-between pb-5 feedback-button">
                                    <Link to="/dashboard">
                                        <button
                                            className="btn btn-qf-neon-primary text-nowrap"
                                            type="button"
                                            value="BACK">
                                            BACK</button>
                                    </Link>
                                    <button
                                        type="submit"
                                        value="Mail us"
                                        name="Mail"
                                        className="btn btn-l-neon-primary text-nowrap">
                                        SEND
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
