import React from "react";
import { useState } from "react";
import firebase from "../firebase";
import "../index.css";
import Loading from "./loading";

function Login() {
  const [loading, setLoading] = useState(false);
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrText] = useState("");
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

  const checkCred = () => {
    if (handle === "") return;
    setLoading(true);
    
    isHandlePresent(handle).then((result) => {
      const { flag, data } = result;
      console.log("here i guess");
      if (flag === true) {
        if (data["Password"] === password) {
          //  window.alert("in bro");
        } else {
          //  window.alert("Password Incorrectt");
          setErrText("** Invalid Handle or Password");
          resetForm();
        }
      } else {
        //window.alert("Handle doesn't exist");
        setErrText("** Invalid Handle or Password");
        resetForm();
      }
      setLoading(false);
    });
  };

  if (loading) return <Loading />;
  else
    return (
      <div className="py-14 px-14">
          <span className="text-left text-yellow-100 font-Lato text-base">
            Login into your account ...
          </span>
          <div className="text-red-600">{errorText}</div>
          <form
            name="login_form"
            id="login_form"
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              checkCred();
            }}
            className="font-Lato text-xl"
          >
            <label className="block px-5 py-5">
              <span className="text-gray-300">Handle </span>
              <input
                type="text"
                id="u_name"
                name="u_name"
                value={handle}
                size="20"
                onChange={(event) => setHandle(event.target.value)}
                className="shadow-xl form-input mt-0 block w-full px-0.5 bg-transparent text-white border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-b-4 focus:border-yellow-600"
                required
              />
            </label>
            <label className="block px-5 py-5">
              <span className="text-gray-300">Password </span>
              <input
                type="password"
                id="u_pass"
                name="u_pass"
                value={password}
                size="20"
                onChange={(event) => setPassword(event.target.value)}
                className="shadow-xl form-input mt-0 block w-full px-0.5 bg-transparent text-white border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-b-4 focus:border-yellow-600"
                required
              />
            </label>
            <div className="block px-20 py-2">
              <input
                type="submit"
                value="OK"
                name="login"
                className="rounded-full py-1 px-6 bg-green-800 text-white hover:bg-green-900"
              />
            </div>
          </form>
          </div>
        
    );
}
export default Login;
