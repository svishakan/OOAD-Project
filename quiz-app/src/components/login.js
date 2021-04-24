import React from "react";
import { useState, useEffect } from "react";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";
import * as crypto from "crypto";
import "../index.css";
import Loading from "./loading";

import { BrowserRouter as Router, Link } from "react-router-dom";

import "./login.css";

function Login() {
  const [loading, setLoading] = useState(false);
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrText] = useState("");
  const [redirect, setRedirect] = useState(false);
  const ref = firebase.firestore().collection("UserCreds");
  let myStorage = window.localStorage;

  useEffect(() => {
    myStorage.clear();
  }, [myStorage]);

  const resetForm = () => {
    setPassword("");
    setHandle("");
  };

  const isHandlePresent = async (handle) => {
    const docs = await ref.doc(handle).get();
    if (docs.exists) return { flag: true, data: docs.data() };
    return { flag: false, data: undefined };
  };

  const checkCred = () => {
    if (handle === "") return;
    setLoading(true);

    isHandlePresent(handle).then((result) => {
      const { flag, data } = result;
      if (flag === true) {
        const hmac = crypto.createHmac("sha256", process.env.REACT_APP_HMAC_ID);
        //passing the data to be hashed
        const data1 = hmac.update(password);
        //Creating the hmac in the required format
        const gen_hmac = data1.digest("hex");
        //Printing the output on the console
        //console.log(" hmac : " + gen_hmac);
        //console.log(" paswerd : " + data.Password)
        if (data["Password"] === gen_hmac) {
          setLoading(false);
          myStorage.setItem("handle", handle);
          myStorage.setItem("Username", data.Username);
          setRedirect(true);
          console.log("not redirected");
        } else {
          setErrText("** Invalid Handle or Password");
          resetForm();
        }
      } else {
        setErrText("** Invalid Handle or Password");
        resetForm();
      }
      setLoading(false);
    });
  };

  if (loading) return <Loading />;
  else
    return (
      <div className="container">
        {redirect === true ? (
          <Redirect to="/dashboard" />
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 login-box">
              <div className="col-lg-12 login-img">
                <i className="fa fa-key" aria-hidden="true"></i>
              </div>
              <div className="col-lg-12 login-title">LOGIN TO YOUR ACCOUNT</div>
              <div className="col-lg-12 login-form">
                <form
                  name="login_form"
                  id="login_form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    checkCred();
                  }}
                >
                  <div className="form-group">
                    <label className="form-control-label">HANDLE</label>
                    <input
                      type="text"
                      id="u_name"
                      name="u_name"
                      value={handle}
                      size="20"
                      autoComplete="off"
                      onChange={(event) => setHandle(event.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
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
                  <div className="col-lg-12 loginbttm">
                    <div className="col-lg-12 login-btm login-text">
                      {errorText}
                    </div>

                    <div className="col-lg-12 d-flex justify-content-between login-btm login-button">
                      <button
                        type="submit"
                        value="Login"
                        name="login"
                        className="btn btn-l-neon-primary text-nowrap"
                      >
                        LOGIN
                      </button>
                      <Link to="/signup">
                        <button
                          type="button"
                          value="Sign Up"
                          name="signup"
                          onClick=""
                          className="btn btn-l-neon-primary text-nowrap"
                        >
                          SIGN UP
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
export default Login;
