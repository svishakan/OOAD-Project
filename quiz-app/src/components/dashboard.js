import React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import "./dashboard.css";

function DashBoard() {
  const [handle, setHandle] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);

  let myStorage = window.localStorage;
  console.log(myStorage);
  useEffect(() => {
    if (myStorage.getItem("handle") === null) {
      setRedirectHome(true);
    } else {
      setHandle(myStorage.getItem("handle"));
    }
  }, [myStorage]);

  return (
    <div>
      {redirectHome === true ? (
        <Redirect to="/enter" />
      ) : (
        <div className="fixed top-0 left-0 justify-center w-screen h-screen">
          <div>{handle}</div>
          <table>
            <tr>
              <td>
                <button onClick="take_quiz();">Take up a Quiz</button>
              </td>
              <td>
                <button onClick="create_quiz();">Create a Quiz</button>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick="view_profile();">View Profie</button>
              </td>
              <td>
                <button onClick="();"></button>
              </td>
            </tr>
          </table>
        </div>
      )}
      ;
    </div>
  );
} 

export default DashBoard;
