import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import emailjs from "emailjs-com";
import * as crypto from "crypto";
import firebase from "../Firebase";
import Loading from "./Loading";


const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [handle, setHandle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setCPassword] = useState("");
    const [token, setToken] = useState("");
    const [reset, setReset] = useState(false);
    const [acceptPassword, setAcceptPassword] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const { addToast } = useToasts();
    const ref = firebase.firestore().collection("UserCreds");

    const encrpyt = (word) => {
        const hmac = crypto.createHmac("sha256", process.env.REACT_APP_HMAC_ID);
        //passing the data to be hashed
        const data = hmac.update(word);
        //Creating the hmac in the required format
        const gen_hmac = data.digest("hex");

        return gen_hmac;
    };

    const isHandlePresent = async (handle) => {
        const docs = await ref.doc(handle).get();
        if (docs.exists) return { flag: true, data: docs.data() };
        return { flag: false, data: undefined };
    };

    const sendEmail = async () => {
        setLoading(true);
        emailjs
            .send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_EMAIL_VALIDATE_ID,
                {
                    token: encrpyt(handle + "34"),
                    email: email,
                    app_name: "QuizHut",
                },
                process.env.REACT_APP_EMAILJS_USER_ID
            )
            .then(
                (result) => {
                    addToast("A Token has been sent to you via e-mail.", { appearance: "success" });

                    console.log(result.text);
                    setReset(true);
                },
                (error) => {
                    addToast("Your reset email could not be sent! Try again later!", { appearance: "error" });

                    console.log(error.text);
                }
            );
        setLoading(false);
    };

    const changePassword = () => {
        if (token === encrpyt(handle + "34")) {
            setAcceptPassword(true);
        } else {
            let alertBody = "Token doesn't match";
            let alertBgColor = "error";

            addToast(alertBody, { appearance: alertBgColor });
            setToken("");
        }
    };

    const isCredValid = () => {
        isHandlePresent(handle).then((result) => {
            const { flag, data } = result;
            if (flag === true && data.Email === email) {
                sendEmail();
            } else {
                let alertBody, alertBgColor;
                alertBody = "Handle or email not found/doesn't belong to the same acoount.";
                alertBgColor = "error";

                addToast(alertBody, { appearance: alertBgColor });
                setEmail("");
                setHandle("");
            }
        });
    };

    const isPasswordCorrect = () => {
        return password === confirm_password;
    };

    const passwordValidator = () => {
        let exit = false;
        let alertBody, alertBgColor;

        if (!exit && password.length < 5) {
            setPassword("");
            setCPassword("");
            alertBody = "Password must contain atleast 5 characters";
            alertBgColor = "error";
            exit = true;
        }

        if (!exit && password.length >= 5 && !isPasswordCorrect()) {
            setPassword("");
            setCPassword("");
            alertBody = "Passwords do not match! Please enter the same password.";
            alertBgColor = "error";
            exit = true;
        }

        if (exit) {
            setLoading(false);
            addToast(alertBody, { appearance: alertBgColor });
            return false;
        }

        return true;
    };
    const updatePswrd = () => {
        setLoading(true);
        let alertBody, alertBgColor;
        if (!passwordValidator()) return;

        ref.doc(handle).update({ Password: encrpyt(password) });
        alertBody = "Your password has been updated. Try logging in after 20-30s.";
        alertBgColor = "success";
        setLoading(false);
        addToast(alertBody, { appearance: alertBgColor });
        setRedirectHome(true);
    };

    if (redirectHome) return <Redirect to="/" />;
    if (loading) return <Loading />;
    if (acceptPassword) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-img">
                            <i className="fas fa-lock-open" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-12 login-title">CREATE AN ACCOUNT</div>
                        <div className="col-lg-12 login-form">
                            <div className="important-text">* Required Fields</div>
                            <div className="important-text">
                                ** Password and Handle must contain atleast 5 characters
                            </div>
                            <form
                                name="reg_form"
                                id="reg_form"
                                autoComplete="off"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    updatePswrd();
                                }}>
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD*</label>
                                    <input
                                        type="password"
                                        id="u_pass"
                                        name="u_pass"
                                        value={password}
                                        size="20"
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">
                                        CONFIRM PASSWORD*
                                    </label>
                                    <input
                                        type="password"
                                        id="u_cpass"
                                        name="u_cpass"
                                        value={confirm_password}
                                        size="20"
                                        onChange={(event) => setCPassword(event.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-lg-12 d-flex loginbttm login-button justify-content-between">
                                    <input
                                        type="submit"
                                        value="Update Password"
                                        name="login"
                                        className="btn btn-l-neon-primary text-nowrap"
                                    />

                                    <Link to="/">
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            type="button"
                                            value="BACK">
                                            GO BACK
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (reset) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-img">
                            <i className="fas fa-unlock" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-12 login-title">VERIFY YOUR ACCOUNT</div>
                        <div className="col-lg-12 login-title">
                            Token has been sent to your specified email, Paste the token to
                            complete your Registration process
                        </div>
                        <div className="col-lg-12 login-form">
                            <form
                                name="validate_form"
                                id="validate_form"
                                autoComplete="off"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    changePassword();
                                }}
                            >
                                <div className="form-group">
                                    <label className="form-control-label">TOKEN*</label>
                                    <input
                                        type="text"
                                        id="token"
                                        name="token"
                                        value={token}
                                        size="20"
                                        onChange={(event) => setToken(event.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-lg-12 d-flex loginbttm login-button justify-content-between">
                                    <button
                                        type="submit"
                                        value="Create Account"
                                        name="login"
                                        className="btn btn-l-neon-primary text-nowrap"
                                    >
                                        Proceed
                                    </button>
                                    <Link to="/">
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            type="button"
                                            value="BACK"
                                        >
                                            GO BACK
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-img">
                        <i className="fas fa-lock" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 login-title">VERIFY YOUR ACCOUNT</div>
                    <div className="col-lg-12 login-form">
                        <div className="important-text">* Required Fields</div>

                        <form
                            name="reg_form"
                            id="reg_form"
                            autoComplete="off"
                            onSubmit={(event) => {
                                event.preventDefault();
                                isCredValid();
                            }}
                        >
                            <div className="form-group">
                                <label className="form-control-label">HANDLE*</label>

                                <input
                                    type="text"
                                    id="u_Hname"
                                    name="u_Hname"
                                    value={handle}
                                    size="20"
                                    onChange={(event) => setHandle(event.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">EMAIL*</label>
                                <input
                                    type="text"
                                    id="u_email"
                                    name="u_email"
                                    value={email}
                                    size="20"
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-lg-12 d-flex loginbttm login-button justify-content-between">
                                <input
                                    type="submit"
                                    value="Proceed"
                                    name="login"
                                    className="btn btn-l-neon-primary text-nowrap"
                                />

                                <Link to="/">
                                    <button
                                        className="btn btn-l-neon-primary text-nowrap"
                                        type="button"
                                        value="BACK"
                                    >
                                        GO BACK
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
