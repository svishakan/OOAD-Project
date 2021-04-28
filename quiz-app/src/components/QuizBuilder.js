import React, { useState, useEffect } from "react";
import { useToasts } from 'react-toast-notifications';
import { Redirect } from "react-router-dom";

//Component imports
import firebase from "../Firebase";

let records = [];


function QuizBuilder() {
    const [quizID, setQuizID] = useState("");
    const [quizLength, setQuizLength] = useState(0);
    const [quizDuration, setQuizDuration] = useState(0);
    const [quizName, setQuizName] = useState("");
    const [redirectBack, setRedirectBack] = useState(false);
    const [redirectDash, setRedirectDash] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const [handle, setHandle] = useState("");
    const { addToast } = useToasts();
    const quizDB = firebase.firestore().collection("QuizDB");
    const Users = firebase.firestore().collection("UserCreds");

    let myStorage = window.localStorage;

    const [questionNumber, setQuestionNumber] = useState(1);

    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else if (myStorage.getItem("qID") === null) {
            setRedirectBack(true);
        } else {
            setHandle(myStorage.getItem("handle"));
            setQuizID(myStorage.getItem("qID"));
            setQuizName(myStorage.getItem("qName"));
            setQuizLength(myStorage.getItem("qLength"));
            setQuizDuration(myStorage.getItem("qDuration"));
            document.getElementById("uploadSetBtn").style.display = "none";
        }
    }, [myStorage]);

    const nextQuestion = () => {
        //store the question and clear the form

        const question = document.getElementById("ques").value;
        const correct_answer = document.getElementById("ans1").value;
        const incorrect_answers = [
            document.getElementById("ans2").value,
            document.getElementById("ans3").value,
            document.getElementById("ans4").value,
        ];

        const record = [
            questionNumber,
            question,
            correct_answer,
            incorrect_answers,
        ];

        records.push(record);

        setQuestionNumber(questionNumber + 1);
        document.getElementById("quizform").reset();

        if (questionNumber >= quizLength) {
            //display upload button only if the minimum number of questions have been entered
            document.getElementById("uploadSetBtn").style.display = "inline";
        }

        else {
            document.getElementById("uploadSetBtn").style.display = "none";
        }

        addToast(`Question ${questionNumber} has been stored successfully!`, { appearance: "success" });
    };

    const createQuizInDB = () => {
        //make an entry into the quizDB in Firestore and create a document

        quizDB
            .doc(quizID)
            .set({
                quizName: quizName,
                quizDuration: quizDuration,
                quizLength: quizLength,
                Scores: [],
            })
            .then(() => {
                Users.doc(handle).update({
                    CreatedQuizes: firebase.firestore.FieldValue.arrayUnion({
                        quizID: quizID,
                        quizTitle: quizName,
                    }),
                });

                addToast(`${quizID} is your new quiz ID. Kindly make note of it.`, { appearance: "info" });
            })
            .catch((err) => {
                addToast(`An error occurred! Your quiz could not be set.`, { appearance: "error" });
            });
    }

    const uploadQuiz = () => {
        //upload the quiz to the Firestore DB

        nextQuestion(); //store the most recent question as well

        createQuizInDB();   //create the quiz in firestore

        for (let i = 0; i < records.length; i++) {
            quizDB
                .doc(quizID)
                .collection("QuestionSet")
                .doc(i.toString())
                .set({
                    question: records[i][1],
                    correct_answer: records[i][2],
                    incorrect_answers: records[i][3],
                })
                .then(() => {
                    setRedirectDash(true);
                })
                .catch((err) => {
                    addToast(`Your quiz ${quizID} could not be uploaded. Try again!`, { appearance: "error" });
                })
                // eslint-disable-next-line no-loop-func
                .finally(() => {
                    records = [];

                    if (redirectDash === true) {
                        addToast(`Your quiz ${quizID} has been uploaded successfully!`, { appearance: "success" });
                    }
                });
        }
    };

    if (redirectHome) return <Redirect to="/" />;
    if (redirectDash) return <Redirect to="/dashboard" />;
    if (redirectBack) return <Redirect to="/quizcreator" />;

    return (
        <div className="container card col-lg-8 col-md-12 col-sm-12 text-justify quiz-box">
            <div className="card-img text-center">
                <i className="fas fa-book-open quiz-img"></i>
            </div>
            <div className="card-body">
                <h1 className="col-lg-12 quiz-title text-center">
                    QUIZ BUILDER
                </h1>
                <h3 className="col-lg-12 quiz-sub-title text-center">
                    QUIZ ID: {quizID}
                </h3>

                <form
                    id="quizform"
                    className=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        nextQuestion();
                    }}>

                    <div className="col-lg-12 form-group">
                        <label className="quiz-form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
                            QUESTION #{questionNumber}
                        </label>
                        <input
                            type="text"
                            id="ques"
                            className=""
                            placeholder="Question"
                            style={{ width: "80%" }}
                            required
                        />
                    </div>

                    <div className="col-lg-12 form-group">
                        <label className="quiz-form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
                            CORRECT ANSWER
                        </label>
                        <input
                            type="text"
                            id="ans1"
                            className=""
                            placeholder="Correct Answer"
                            style={{ width: "35%" }}
                            required
                        />
                    </div>

                    <div className="col-lg-12 form-group">
                        <label className="quiz-form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
                            WRONG ANSWER #1
                        </label>
                        <input
                            type="text"
                            id="ans2"
                            className=""
                            placeholder="Wrong Answer #1"
                            style={{ width: "35%" }}
                            required
                        />
                    </div>

                    <div className="col-lg-12 form-group">
                        <label className="quiz-form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
                            WRONG ANSWER #2
                        </label>
                        <input
                            type="text"
                            id="ans3"
                            className=""
                            style={{ width: "35%" }}
                            placeholder="Wrong Answer #2"
                        />
                    </div>

                    <div className="col-lg-12 form-group">
                        <label className="quiz-form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
                            WRONG ANSWER #3
                        </label>
                        <input
                            type="text"
                            id="ans4"
                            className=""
                            style={{ width: "35%" }}
                            placeholder="Wrong Answer #3"
                        />
                    </div>

                    <div className="d-flex justify-content-center pb-5">
                        <button
                            className="btn btn-qb-neon-primary text-nowrap"
                            type="reset"
                            value="Clear All"
                        >CLEAR ALL</button>
                        <button
                            className="btn btn-qb-neon-primary text-nowrap"
                            type="submit"
                            value="Next Question"
                        >NEXT QUESTION</button>
                        <button
                            className="btn btn-qb-neon-primary text-nowrap"
                            type="button"
                            id="uploadSetBtn"
                            value="Upload Set"
                            onClick={uploadQuiz}
                        >UPLOAD SET</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuizBuilder;
