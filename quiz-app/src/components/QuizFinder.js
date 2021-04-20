import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


import "./quizforms.css";

const QuizFinder = () => {
    const [redirect, setRedirect] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const [handle, setHandle] = useState("");
    let [quizID, setQuizID] = useState(null);

    let myStorage = window.localStorage;
    const quizDB = firebase.firestore().collection("QuizDB");
    const Users = firebase.firestore().collection("UserCreds");

    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else {
            setHandle(myStorage.getItem("handle"));
        }
    }, []);

    const findQuiz = () => {
        //to check if a quiz with the given quizID exists

        let qID = document.getElementById("qid").value.toString();
        setQuizID(qID); //setState is necessary to pass quizID via redirect

        console.log(qID);

        if (qID == null) {
            //fix later with required form attribute
            window.alert("Quiz ID cannot be empty!");
        }

        quizDB
            .doc(qID)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    Users.doc(handle)
                        .update({
                            TakenQuizes: firebase.firestore.FieldValue.arrayUnion(qID),
                        })
                        .then(() => {
                            window.alert("Click OK to Begin Quiz!");
                            setRedirect(true);
                        });
                } else {
                    window.alert("Quiz with the ID: " + quizID + " does not exist!");
                    console.log("Does not exist.");
                }
            });
    };

    if (redirectHome) return <Redirect to="/" />;
    return (
        <div>
            {redirect === true ? (
                <Redirect
                    to={{
                        pathname: "/questionnaire",
                        state: {
                            qID: quizID,
                        },
                    }}
                />
            ) : (
                <div className="container card col-lg-4 col-md-8 text-center quiz-box">
                    <div className="card-img">
                        <i className="fa fa-search quiz-img" aria-hidden="true"></i>
                    </div>
                    <div className="card-body">
                        <h1 className="col-lg-12 quiz-title text-center">
                            QUIZ FINDER
                        </h1>
                        <form
                            id="finderform"
                            className="">

                            <div className="col-lg-12 form-group">
                                <label className="form-control-label">
                                    QUIZ ID
                                </label>
                                <input
                                    type="text"
                                    id="qid"
                                    className=""
                                    placeholder="8 Character Quiz ID"
                                    maxLength="8"
                                    required />
                            </div>

                            <div className="d-flex justify-content-center pb-5">
                                <Link to="/dashboard"><button
                                    className="btn btn-qf-neon-primary text-nowrap"
                                    type="button"
                                    value="BACK" >GO BACK</button></Link>
                                <button
                                    className="btn btn-qf-neon-primary text-nowrap"
                                    type="button"
                                    value="Attempt Quiz"
                                    onClick={findQuiz}>ATTEMPT QUIZ</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizFinder;
