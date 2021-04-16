import React from "react";
import { useState } from "react";
import firebase from "./firebase";

function Register() {
  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = firebase.firestore().collection("UserCreds");

  const resetForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setHandle("");
  };

  const isHandlePresent = async (handle) => {
    const docs = await ref.doc(handle).get();

    if (docs.exists) return true;
    return false;
  };

  const addUserCred = async () => {
    isHandlePresent(handle).then((result) => {
      if (result === true) {
        window.alert("Handle Exists !! try a diff one");
        document.getElementById("u_Hname").value = "";
        return;
      } else {
        const newUser = {
          Username: username,
          Password: password,
          Handle: handle,
          Email: email,
        };

        //.doc() use if for some reason you want that firestore generates the id

        ref
          .doc(handle)
          .set(newUser)
          .then(() => {
            window.alert("Registered Successfully !!");
            resetForm();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  return (
    <form
      name="register_form"
      id="register_form"
      onSubmit={(event) => {
        event.preventDefault();
        addUserCred();
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
            <b>REGISTER</b>
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
              value={username}
              placeholder="Eg.John"
              size="20"
              onChange={(event) => setUsername(event.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td align="center" width="41%">
            <strong>Handlename</strong>
          </td>
          <td width="70%">
            <input
              type="text"
              id="u_Hname"
              value={handle}
              placeholder="Eg.DarkLight "
              size="20"
              onChange={(event) => setHandle(event.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td align="center" width="41%">
            <strong>Email</strong>
          </td>
          <td width="70%">
            <input
              type="email"
              id="u_email"
              value={email}
              placeholder="Eg. Abc@gmail.com"
              size="20"
              onChange={(event) => setEmail(event.target.value)}
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
              <input
                type="submit"
                value="REGISTER"
                name="register"
              />
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
  );
}
export default Register;
