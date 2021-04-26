import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import Toaster from "./toaster";

import "./quizforms.css";

let records = [];

function QuizBuilder() {
    const [quizID, setQuizID] = useState("");
    const [quizLength, setQuizLength] = useState(0);
    const [redirectBack, setRedirectBack] = useState(false);
    const [redirectDash, setRedirectDash] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const [handle, setHandle] = useState("");
    //const batch = firebase.firestore().batch();
    const quizDB = firebase.firestore().collection("QuizDB");

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
            setQuizLength(myStorage.getItem("qLength"));
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

        render(
            <Toaster
                headerText={"Question Saved!"}
                bodyText={`Question ${questionNumber} has been stored successfully!`}
                bgType={"bg-success"}
                textColor={"text-white"} />
        );
    };

    const uploadQuiz = () => {
        //upload the quiz to the Firestore DB

        //nextQuestion(); //store the most recent question as well

        console.log("Quiz ID: " + quizID + "\nQuiz Length: " + quizLength);

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
                    console.log("Successfully written!");
                    setRedirectDash(true);

                    render(
                        <Toaster
                            headerText={"Question Set Uploaded!"}
                            bodyText={`Your quiz ${quizID} has been uploaded successfully!`}
                            bgType={"bg-success"}
                            delayTime={5000}
                            textColor={"text-white"} />
                    );
                })
                .catch((err) => {
                    console.error("Document writing error: ", err);

                    render(
                        <Toaster
                            headerText={"Upload Failed!"}
                            bodyText={`Your quiz ${quizID} could not be uploaded. Try again!`}
                            bgType={"bg-danger"}
                            delayTime={5000}
                            textColor={"text-white"} />
                    );
                })
                .finally(() => {
                    records = [];
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
                    className="">

                    <div className="col-lg-12 form-group">
                        <label className="form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
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
                        <label className="form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
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
                        <label className="form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
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
                        <label className="form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
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
                        <label className="form-control-label" style={{ width: "15%", "margin-right": "5px" }}>
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
                            type="button"
                            value="Next Question"
                            onClick={nextQuestion}
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
