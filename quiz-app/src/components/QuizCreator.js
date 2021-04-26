import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";

import { BrowserRouter as Router, Link } from "react-router-dom";

import "./quizforms.css";
import { render } from "@testing-library/react";
import Toaster from "./toaster";

const { nanoid } = require("nanoid");

function QuizCreator() {
  const quizID = nanoid(8);
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
    const qLength = document.getElementById("qlength").value;

    let myStorage = window.localStorage;

    quizDB
      .doc(quizID)
      .set({
        quizName: qName,
        quizDuration: qDuration,
        quizLength: qLength,
        Scores: [],
      })
      .then(() => {
        console.log("Successfully written!");
        document.getElementById("creatorform").reset();
        myStorage.setItem("qID", quizID);
        myStorage.setItem("qLength", qLength);

        Users.doc(handle).update({
          CreatedQuizes: firebase.firestore.FieldValue.arrayUnion({
            quizID: quizID,
            quizTitle: qName,
          }),
        });

        setRedirect(true);

        render(
          <Toaster
            headerText={"Quiz Initiated"}
            bodyText={`${quizID} is your new quiz ID. Kindly make note of it.`}
            bgType={"bg-info"}
            delayTime={5000}
            textColor={"text-white"}
          />
        );
      })
      .catch((err) => {
        console.error("Document writing error: ", err);

        render(
          <Toaster
            headerText={"Quiz Initiated"}
            bodyText={`An error occurred! Your quiz could not be set.`}
            bgType={"bg-danger"}
            delayTime={5000}
            textColor={"text-white"}
          />
        );
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
            <h1 className="col-lg-12 quiz-title text-center">QUIZ CREATOR</h1>
            <h3 className="col-lg-12 quiz-sub-title text-center">
              QUIZ ID: {quizID}
            </h3>
            <form
              id="creatorform"
              className=""
              onSubmit={(e) => {
                e.preventDefault();
                createQuiz();
              }}
            >
              <div className="col-lg-12 form-group">
                <label
                  className="form-control-label"
                  style={{ width: "30%", "margin-right": "5px" }}
                >
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
                <label
                  className="form-control-label"
                  style={{ width: "30%", "margin-right": "5px" }}
                >
                  QUIZ DURATION
                </label>
                <input
                  id="qduration"
                  className=""
                  min="5"
                  placeholder="Quiz Duration (in minutes)"
                  type="number"
                  required
                />
              </div>

              <div className="col-lg-12 form-group">
                <label
                  className="form-control-label"
                  style={{ width: "30%", "margin-right": "5px" }}
                >
                  QUIZ LENGTH
                </label>
                <input
                  id="qlength"
                  className=""
                  min="1"
                  placeholder="Number of Questions"
                  type="number"
                  required
                />
                <small className="form-text text-white text-justify">
                  <strong style={{ textDecoration: "underline" }}>Note:</strong>{" "}
                  You can set more questions than the specified number, and only
                  the set number of questions will be served from your question
                  pool appropriately.
                </small>
              </div>

              <div className="d-flex justify-content-center pb-5">
                <Link to="/dashboard">
                  <button
                    className="btn btn-qf-neon-primary text-nowrap"
                    type="button"
                    value="BACK"
                  >
                    GO BACK
                  </button>
                </Link>
                <input
                  className="btn btn-qf-neon-primary text-nowrap"
                  type="submit"
                  value="Set Quiz"
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
