import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import "./quizforms.css";

const { nanoid } = require("nanoid");
const quizID = nanoid(8);

function QuizCreator() {
  const quizDB = firebase.firestore().collection("QuizDB");
  const Users = firebase.firestore().collection("UserCreds");
  const [redirect, setRedirect] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);
  const [handle, setHandle] = useState("");

  let myStorage = window.localStorage;

  useEffect(() => {
    if (myStorage.getItem("handle") === null) {
      setRedirectHome(true);
    } else {
      setHandle(myStorage.getItem("handle"));
    }
  }, []);

  const createQuiz = () => {
    //create the quiz in a new FireStore collection

    const qName = document.getElementById("qtitle").value;
    const qDuration = document.getElementById("qduration").value;

    let myStorage = window.localStorage;

    quizDB
      .doc(quizID)
      .set({
        quizName: qName,
        quizDuration: qDuration,
        Scores: [],
      })
      .then(() => {
        console.log("Successfully written!");
        document.getElementById("creatorform").reset();
        myStorage.setItem("qID", quizID);

        Users.doc(handle).update({
          CreatedQuizes: firebase.firestore.FieldValue.arrayUnion(quizID),
        });

        setRedirect(true);
      })
      .catch((err) => {
        console.error("Document writing error: ", err);
      });
  };

  if (redirectHome) return <Redirect to="/" />;
  return (
    <div className="">
      {redirect === true ? (
        <Redirect to="/quizbuilder" />
      ) : (
        <div className="container card col-lg-4 col-md-8 text-center quiz-box">
          <div className="card-img">
            <i className="fas fa-pencil-ruler quiz-img" aria-hidden="true"></i>
          </div>
          <div className="card-body">
            <h1 className="col-lg-12 quiz-title text-center">
              QUIZ CREATOR
          </h1>
            <h3 className="col-lg-12 quiz-sub-title text-center">
              QUIZ ID: {quizID}
            </h3>
            <form
              id="creatorform"
              className="">
                
              <div className="col-lg-12 form-group">
                <label className="form-control-label" style={{width: "30%", "margin-right": "5px"}}>
                  QUIZ TITLE
                </label>
                <input
                  type="text"
                  id="qtitle"
                  className=""
                  placeholder="Quiz Title"
                  required
                />
              </div>

              <div className="col-lg-12 form-group">
                <label className="form-control-label" style={{width: "30%", "margin-right": "5px"}}>
                  QUIZ DURATION
                </label>
                <input
                  id="qduration"
                  className=""
                  min="0"
                  placeholder="Quiz Duration (in minutes)"
                  type="number"
                  required
                />
              </div>

              <div className="d-flex justify-content-center pb-5">
                <Link to="/dashboard"><button
                  className="btn btn-qf-neon-primary text-nowrap"
                  type="button"
                  value="BACK" >GO BACK</button></Link>
                <input
                  className="btn btn-qf-neon-primary text-nowrap"
                  type="button"
                  value="Set Quiz"
                  onClick={createQuiz}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizCreator;
