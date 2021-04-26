import React, { useState } from "react";
import { render } from "@testing-library/react";
import { Link, Redirect } from "react-router-dom";
import emailjs from "emailjs-com";
import * as crypto from "crypto";
import firebase from "../Firebase";
import Toaster from "./Toaster";
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
    const ref = firebase.firestore().collection("UserCreds");

    const showAlert = (alertHeader, alertBody, alertBgColor) => {
        render(
            <Toaster
                headerText={alertHeader}
                bodyText={alertBody}
                bgType={alertBgColor}
                textColor={"text-white"}
                vPosition={"10%"}
            />
        );
    };

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
        console.log("inside mail");
        emailjs
            .send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_EMAIL_VALIDATE_ID,
                {
                    token: encrpyt(handle + "34"),
                    email: email,
                    app_name: "Traid-V support",
                },
                process.env.REACT_APP_EMAILJS_USER_ID
            )
            .then(
                (result) => {
                    console.log("Send Successfully");
                    render(
                        <Toaster
                            headerText={"Verification"}
                            bodyText={"A Token has been sent to you via e-mail."}
                            bgType={"bg-success"}
                            textColor={"text-white"}
                        />
                    );

                    console.log(result.text);
                    setReset(true);
                },
                (error) => {
                    console.log("gotcha");
                    render(
                        <Toaster
                            headerText={"Error: Email"}
                            bodyText={"Your reset email could not be sent! Try again later!"}
                            bgType={"bg-danger"}
                            textColor={"text-white"}
                        />
                    );

                    console.log(error.text);
                }
            );
        setLoading(false);
    };

    const changePassword = () => {
        if (token === encrpyt(handle + "34")) {
            setAcceptPassword(true);
        } else {
            let alertHeader = "Error!";
            let alertBody = "Token doesn't match";
            let alertBgColor = "bg-danger";
            showAlert(alertHeader, alertBody, alertBgColor);
            setToken("");
        }
    };

    const isCredValid = () => {
        isHandlePresent(handle).then((result) => {
            const { flag, data } = result;
            if (flag === true && data.Email === email) {
                sendEmail();
            } else {
                let alertHeader, alertBody, alertBgColor;
                alertHeader = "Error!";
                alertBody =
                    "Handle or email not found / Doesn't belong to the same acoount.";
                alertBgColor = "bg-danger";
                setEmail("");
                setHandle("");
                showAlert(alertHeader, alertBody, alertBgColor);
            }
        });
    };

    const isPasswordCorrect = () => {
        return password === confirm_password;
    };

    const passwordValidator = () => {
        let exit = false;
        let alertHeader, alertBody, alertBgColor;

        if (!exit && password.length < 5) {
            setPassword("");
            setCPassword("");
            alertHeader = "Error: Password";
            alertBody = "Password must contain atleast 5 characters";
            alertBgColor = "bg-danger";
            exit = true;
        }

        if (!exit && password.length >= 5 && !isPasswordCorrect()) {
            setPassword("");
            setCPassword("");
            alertHeader = "Error: Password Match";
            alertBody = "Passwords do not match! Please enter the same password.";
            alertBgColor = "bg-danger";
            exit = true;
        }

        if (exit) {
            setLoading(false);
            showAlert(alertHeader, alertBody, alertBgColor);
            return false;
        }

        return true;
    };
    const updatePswrd = () => {
        setLoading(true);
        let alertHeader, alertBody, alertBgColor;
        console.log(passwordValidator());
        if (!passwordValidator()) return;

        ref.doc(handle).update({ Password: encrpyt(password) });
        alertHeader = "Success!";
        alertBody = "Your password has been updated. Try logging in after 20-30s.";
        alertBgColor = "bg-success";
        setLoading(false);
        showAlert(alertHeader, alertBody, alertBgColor);
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
                                }}
                            >
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
