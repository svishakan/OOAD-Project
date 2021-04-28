import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import emailjs from "emailjs-com";


const Feedback = () => {
    const [handle, setHandle] = useState("");
    const [redirectHome, setRedirectHome] = useState(false);
    const { addToast } = useToasts();
    let myStorage = window.localStorage;

    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else {
            setHandle(myStorage.getItem("handle"));
        }
    }, [handle, myStorage]);

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
                    addToast("Thank you for your valuable feedback. We appreciate it!", { appearance: "success" });

                    console.log(result.text);
                },
                (error) => {
                    addToast("Your feedback could not be sent! Try again later!", { appearance: "error" });

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
                                    style={{ resize: "none" }}
                                    className="form-control form-control-textarea"
                                    name="message"
                                    rows="5"
                                    placeholder="Kindly enter your feedback here">
                                </textarea>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="d-flex justify-content-between pb-2 feedback-button">
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
