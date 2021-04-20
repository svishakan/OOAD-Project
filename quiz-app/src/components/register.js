import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import Alert from "react-popup-alert";
import "../index.css";
import Loading from "./loading";

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import "./login.css"

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

  const [alert, setAlert] = React.useState({
    type: "",
    text: "-",
    color: "white",
    show: false,
  });

  const onCloseAlert = () => {
    setAlert({
      type: "",
      text: "",
      color: "",
      show: false,
    });
  };

  const onShowAlert = (type, text, color) => {
    setAlert({
      type: type,
      text: text,
      color: color,
      show: true,
    });
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

  const isFormValid = () => {
    let exit = false;
    let alertType = "",
      alertText = "",
      alertColor;

    if (username.match(/^[A-Za-z ]+$/) === false) {
      setUsername("");
      alertColor = "red";
      alertType = "Error";
      alertText += "First name can only contain Alphabets and spaces\n";
      exit = true;
    }

    if (handle.length < 5) {
      setHandle("");
      alertColor = "red";
      alertType = "Error";
      alertText += "Password must contain atleast 5 characters\n";
      exit = true;
    }

    if (handle.length >= 5 && handle.match(/^[A-Za-z0-9_]+$/) === false) {
      setHandle("");
      alertColor = "red";
      alertType = "Error";
      alertText +=
        "Handle can only contain Alphabets, digits and underscore(_)\n";
      exit = true;
    }

    if (password.length < 5) {
      setPassword("");
      setCPassword("");
      alertColor = "red";
      alertType = "Error";
      alertText += "Handle must contain atleast 5 characters\n";
      exit = true;
    }

    if (password.length >= 5 && !isPasswordCorrect) {
      alertColor = "red";
      alertType = "Password Mismatch";
      alertText = "Passwords do not match ..\n";
      setPassword("");
      setCPassword("");
      exit = true;
    }

    if (exit) {
      setLoading(false);
      onShowAlert(alertType, alertText, alertColor);
      return false;
    }

    return true;
  };

  const addUserCred = () => {
    setLoading(true);
    let alertType, alertText, alertColor;
    if (!isFormValid) return;
    isHandlePresent(handle).then((result) => {
      if (result === true) {
        alertColor = "yellow";
        alertType = "Sorry";
        alertText = "Handle already exists, please try a different one !";
        setHandle("");
      } else {
        const newUser = {
          Username: username,
          Password: password,
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

        alertColor = "green";
        alertType = "Success!!";
        alertText = `${handle} is created Successfully`;
      }
      setLoading(false);
      onShowAlert(alertType, alertText, alertColor);
      if (alertType === "Success!!") {
        setRedirectHome(true);
      }
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
          <div className="col-lg-12 login-title">
            CREATE AN ACCOUNT
            </div>
          <div className="col-lg-12 login-form">
            <div className="important-text">* Required Fields</div>
            <div className="important-text">
              ** Password and Handle must contain atleast 5 characters
          </div>
            <Alert
              header={alert.type}
              btnText={"Close"}
              text={alert.text}
              type={alert.type}
              show={alert.show}
              onClosePress={onCloseAlert}
              pressCloseOnOutsideClick={true}
              showBorderBottom={true}
              alertStyles={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#333132",
                borderColor: alert.color,
                textAlign: "center",
                padding: "5px 5px",
                borderBotton: `5px solid ${alert.color}`,
                borderRadius: "6px"
              }}
              headerStyles={{
                textAlign: "center",
                textDecoration: "bolder",
                fontSize: "40px",
                padding: "3px 0px",
                color: alert.color
              }}
              textStyles={{
                fontSize: "27px",
                color: alert.color,
              }}
              buttonStyles={{
                fontSize: "20px",
                backgroundColor: alert.color,
                borderRadius: "10px",
                color: "white",
                padding: "2px 6px"
              }}
            />
            <form
              name="reg_form"
              id="reg_form"
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                addUserCred();
              }}
            >
              <div className="form-group">
                <label className="form-control-label">
                  NAME*</label>
                <input
                  type="text"
                  id="u_name"
                  name="u_name"
                  value={username}
                  size="20"
                  onChange={(event) => setUsername(event.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">
                  HANDLE*</label>

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
                <label className="form-control-label">
                  EMAIL</label>
                <input
                  type="text"
                  id="u_email"
                  name="u_email"
                  value={email}
                  size="20"
                  onChange={(event) => setEmail(event.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">
                  INSTITUTION / WORKPLACE</label>
                <input
                  type="text"
                  id="u_wp"
                  name="u_wp"
                  value={work_place}
                  size="20"
                  onChange={(event) => setWorkPlace(event.target.value)}
                  className="form-control"
                />

              </div>
              <div className="form-group">
                <label className="form-control-label">
                  PASSWORD*</label>
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
                  CONFIRM PASSWORD*</label>
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
              <div className="col-lg-12 d-inline-flex login-btm login-button justify-content-between">
                <button
                  type="submit"
                  value="Create Account"
                  name="login"
                  className="btn btn-l-neon-primary text-nowrap">SIGN UP</button>
                  <Link to="/"><button
                  className="btn btn-l-neon-primary text-nowrap"
                  type="button"
                  value="BACK">GO BACK</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
