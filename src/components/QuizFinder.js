import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { Link } from "react-router-dom";

//Component imports
import firebase from "../Firebase";


function QuizFinder() {
    const [redirect, setRedirect] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    let [quizID, setQuizID] = useState(null);
    const [duration, setDuration] = useState(0);
    const [title, setTitle] = useState("");
    const { addToast } = useToasts();

    let myStorage = window.localStorage;
    const quizDB = firebase.firestore().collection("QuizDB");

    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        }
    }, [myStorage]);

    const findQuiz = () => {
        //to check if a quiz with the given quizID exists

        let qID = document.getElementById("qid").value.toString().trim();
        setQuizID(qID); //setState is necessary to pass quizID via redirect

        if (qID === "") {
            //fix later with required form attribute
            addToast(`The Quiz ID field cannot be left empty!`, { appearance: "error", autoDismissTimeout: 3000 });

        } else {
            quizDB
                .doc(qID)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        addToast(`Your quiz will begin in a moment! Get ready!`, { appearance: "success", autoDismissTimeout: 3000 });

                        //start quiz in 2 seconds
                        setTimeout(() => {
                            setRedirect(true);
                        }, 2000);
                        setDuration(snapshot.data().quizDuration);
                        setTitle(snapshot.data().quizName);
                    } else {
                        addToast(`No quiz with the specified Quiz ID exists!`, { appearance: "error", autoDismissTimeout: 3000 });
                    }
                });
        }
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
                            Duration: duration,
                            qName: title
                        },
                    }}
                />
            ) : (
                <div className="container card col-lg-4 col-md-8 text-center quiz-box">
                    <div className="card-img">
                        <i className="fa fa-search quiz-img" aria-hidden="true"></i>
                    </div>
                    <div className="card-body">
                        <h1 className="col-lg-12 quiz-title text-center">QUIZ FINDER</h1>
                        <form id="finderform" className="">
                            <div className="col-lg-12 form-group">
                                <label className="quiz-form-control-label">QUIZ ID</label>
                                <input
                                    type="text"
                                    id="qid"
                                    className=""
                                    placeholder="8 Character Quiz ID"
                                    maxLength="8"
                                    required
                                />
                            </div>

                            <div className="d-flex justify-content-center pb-5">
                                <Link to="/dashboard">
                                    <button
                                        className="btn btn-qf-neon-primary text-nowrap"
                                        type="button"
                                        value="BACK">
                                        GO BACK
                                    </button>
                                </Link>
                                <button
                                    className="btn btn-qf-neon-primary text-nowrap"
                                    type="button"
                                    value="Attempt Quiz"
                                    onClick={findQuiz}>
                                    ATTEMPT QUIZ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizFinder;
