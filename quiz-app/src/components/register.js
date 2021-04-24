import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import * as EmailValidator from "email-validator";
import * as crypto from "crypto";
import "../index.css";
import Loading from "./loading";
import Toaster from "./toaster";

import { render } from "@testing-library/react";

import { BrowserRouter as Router, Link } from "react-router-dom";

import "./login.css";

function Register() {
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [handle, setHandle] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm_password, setCPassword] = useState("");
	const [work_place, setWorkPlace] = useState("");

	const [redirectHome, setRedirectHome] = useState(false);

	const ref = firebase.firestore().collection("UserCreds");

	const showAlert = (alertHeader, alertBody, alertBgColor) => {
		render(
			<Toaster
				headerText={alertHeader}
				bodyText={alertBody}
				bgType={alertBgColor}
				textColor={"text-white"}
				vPosition={"10%"} />
		);
	};

	const resetForm = () => {
		setEmail("");
		setUsername("");
		setPassword("");
		setHandle("");
		setCPassword("");
		setWorkPlace("");
	};

	const isHandlePresent = async (handle) => {
		const docs = await ref.doc(handle).get();

		if (docs.exists) return true;
		return false;
	};

	const isPasswordCorrect = () => {
		return password === confirm_password;
	};

	const isFormValid = async () => {
		let exit = false;
		let alertHeader = "",
			alertBody = "",
			alertBgColor = "";

		if (!username.match(/^[A-Za-z][A-Za-z ]+$/)) {
			setUsername("");
			alertHeader = "Error: Name";
			alertBody = "Name can only contain alphabets and spaces!";
			alertBgColor = "bg-danger";
			exit = true;
		}

		if (!exit && handle.length < 5) {
			setHandle("");
			alertHeader = "Error: Handle";
			alertBody = "Handle must contain atleast 5 characters.";
			alertBgColor = "bg-danger";
			exit = true;
		}

		if (!exit && handle.length >= 5 && !handle.match(/^[A-Za-z0-9_]+$/)) {
			setHandle("");
			alertHeader = "Error: Handle";
			alertBody = "Handle can only contain alphabets, digits and underscore!";
			alertBgColor = "bg-danger";
			exit = true;
		}

		const valid = EmailValidator.validate(email)

		if (!exit && !valid) {
			setEmail("");
			alertHeader = "Error: Email  ";
			alertBody = "Invalid Email ID entered! Re-enter your email ID.";
			alertBgColor = "bg-danger";
			exit = true;
		}

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
			alertHeader = "Error: Password Match  ";
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

	const addUserCred = () => {
		setLoading(true);
		let alertHeader, alertBody, alertBgColor;
		isFormValid().then((flag) => {
			if (flag)
				isHandlePresent(handle).then((result) => {
					if (result === true) {
						alertHeader = "Sorry, Handle Exists";
						alertBody = "Handle already exists, please try another one!";
						alertBgColor = "bg-warning";
						setHandle("");
					} else {
						const hmac = crypto.createHmac("sha256", process.env.REACT_APP_HMAC_ID);
						//passing the data to be hashed
						const data = hmac.update(password);
						//Creating the hmac in the required format
						const gen_hmac = data.digest("hex");
						//Printing the output on the console
						//console.log(" hmac : " + gen_hmac);

						const newUser = {
							Username: username,
							Password: gen_hmac,
							Handle: handle,
							Email: email,
							Workplace: work_place,
							Role: "member",
							CreatedQuizes: [],
							TakenQuizes: [],
						};

						//.doc() use if for some reason you want that firestore generates the id

						ref
							.doc(handle)
							.set(newUser)
							.then(() => {
								//window.alert("Registered Successfully !!");
								resetForm();
							})
							.catch((err) => {
								console.error(err);
							});

						alertHeader = "Registration Success!";
						alertBody = `Your Profile: ${handle} was created successfully!`;
						alertBgColor = "bg-success";
					}
					setLoading(false);
					showAlert(alertHeader, alertBody, alertBgColor);
					if (alertHeader === "Registration Success!") {
						setRedirectHome(true);
					}
				})
		});
	};

	if (redirectHome) return <Redirect to="/" />;
	if (loading) return <Loading />;

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-6 col-md-8 login-box">
					<div className="col-lg-12 login-img">
						<i className="fa fa-address-card" aria-hidden="true"></i>
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
								addUserCred();
							}}>
							<div className="form-group">
								<label className="form-control-label">NAME*</label>
								<input
									type="text"
									id="u_name"
									name="u_name"
									value={username}
									size="20"
									onChange={(event) => setUsername(event.target.value)}
									className="form-control"
									required/>
							</div>
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
									required/>
							</div>
							<div className="form-group">
								<label className="form-control-label">EMAIL</label>
								<input
									type="text"
									id="u_email"
									name="u_email"
									value={email}
									size="20"
									onChange={(event) => setEmail(event.target.value)}
									className="form-control"/>
							</div>
							<div className="form-group">
								<label className="form-control-label">
									INSTITUTION / WORKPLACE
                				</label>
								<input
									type="text"
									id="u_wp"
									name="u_wp"
									value={work_place}
									size="20"
									onChange={(event) => setWorkPlace(event.target.value)}
									className="form-control"/>
							</div>
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
									required/>
							</div>
							<div className="form-group">
								<label className="form-control-label">CONFIRM PASSWORD*</label>
								<input
									type="password"
									id="u_cpass"
									name="u_cpass"
									value={confirm_password}
									size="20"
									onChange={(event) => setCPassword(event.target.value)}
									className="form-control"
									required/>
							</div>
							<div className="col-lg-12 d-inline-flex login-btm login-button justify-content-between">
								<button
									type="submit"
									value="Create Account"
									name="login"
									className="btn btn-l-neon-primary text-nowrap">
									SIGN UP
                				</button>
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
export default Register;
