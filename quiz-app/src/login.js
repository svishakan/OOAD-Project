import React from "react";
import { useState } from "react";
import firebase from "./firebase";
import "./index.css"

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

    if (docs.exists) return { flag: true, data: docs.data() };
    return { flag: false, data: undefined };
  };

  const checkCred = async () => {
    isHandlePresent(handle).then((result) => {
      const { flag, data } = result;
      if (flag === true) {
        if (data["Password"] === password) {
          window.alert("in bro");
        } else {
          window.alert("Password Incorrectt");
          document.getElementById("u_pass").value = "";
        }
      } else {
        window.alert("Handle doesn't exist");
        resetForm();
      }
    });
  };

  return (
    <div classNamw="grid grid-cols-3 gap-2 place-items-center h-48 ... inline-block align-middle ..."
    >
      <form
        name="login_form"
        id="login_form"
        onSubmit={(event) => {
          event.preventDefault();
          checkCred();
        }}
      >
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
              <strong>Handle</strong>
            </td>
            <td width="70%">
              <input
                type="text"
                id="u_name"
                value={handle}
                placeholder="Eg.John"
                size="20"
                onChange={(event) => setHandle(event.target.value)}
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
                value={password}
                placeholder="Your password"
                size="20"
                onChange={(event) => setPassword(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p align="center">
                <input type="submit" value="LOGIN" name="login" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="reset"
                  value="RESET"
                  name="reset"
                  onClick={() => {
                    resetForm();
                  }}
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
