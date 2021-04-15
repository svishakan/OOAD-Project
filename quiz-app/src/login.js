import React from "react";
import { useState, useEffect } from "react";
import firebase from "./firebase";

function Login() {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  const ref = firebase.firestore().collection("UserCreds");

  const resetForm = () => {
    setPassword("");
    setHandle("");
  };

  const isHandlePresent = async (handle) => {
    const docs = await ref.doc(handle).get();

    if (docs.exists) return true;
    return false;
  };

  return (
    <div>
      <form name="login_form" id="login_form">
        <table
          align="center"
          height="50%"
          width="100%"
          cellspacing="2"
          cellpadding="2"
          border="5"
        >
          <tr colspan="2" align="center">
            <td>
              <b>LOGIN</b>
            </td>
          </tr>
          <tr>
            <td align="center" width="41%">
              <strong>Username</strong>
            </td>
            <td width="70%">
              <input
                type="text"
                id="u_name"
                value=""
                placeholder="Eg.John"
                size="20"
              />
            </td>
          </tr>
          <tr>
            <td align="center" width="41%">
              <strong>Password</strong>
            </td>
            <td width="70%">
              <input
                type="password"
                id="u_pass"
                value=""
                placeholder="Your password"
                size="20"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p align="center">
                <input type="button" value="LOGIN" name="login" onClick="" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="reset"
                  value="RESET"
                  name="reset"
                  onClick="document.getElementByID('login_form').reset();"
                />
              </p>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
export default Login;
