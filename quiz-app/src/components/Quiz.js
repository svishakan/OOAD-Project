import React, { useState, useEffect } from "react";
import { Questionnaire } from ".";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import Loading from "./loading";

import "./quiz.css";

//const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy";

function Quiz(props) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDuration, setQuizDuration] = useState(0);
    const [handle, setHandle] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    let myStorage = window.localStorage;
    let quizID = "props.location.state.qID"; //extract quizID from local storage
    const [redirectBack, setRedirectBack] = useState(false);
    const [redirectDash, setRedirectDash] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);

    // console.log(quizID);
    const quizDB = firebase.firestore().collection("QuizDB");
    const quizMeta = firebase.firestore().collection("QuizDB");
    const Users = firebase.firestore().collection("UserCreds");

    //useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    //}, [currentIndex]);

    const getData = () => {
        //console.log(quizID);

        quizMeta
            .doc(quizID)
            .get()
            .then((doc) => {
                const metadata = doc.data();
                setQuizTitle(metadata.quizTitle);
                setQuizDuration(metadata.quizDuration);
                console.log(metadata);
            });

        //to get the quiz's questionnaire
        quizDB
            .doc(quizID)
            .collection("QuestionSet")
            .get()
            .then((snapshot) => {
                const documents = snapshot.docs.map((doc) => doc.data());
                console.log(documents);

                let questions = [];

                for (let i = 0; i < documents.length; i++) {
                    let qObj = {
                        question: documents[i].question,
                        correct_answer: documents[i].correct_answer,
                        answers: [
                            documents[i].correct_answer,
                            ...documents[i].incorrect_answers,
                        ].sort(() => Math.random() - 0.5),
                    };
                    questions.push(qObj);
                }
                setQuestions(questions);
                //console.log(questions);
            });
    };

    useEffect(() => {
        //to get the quiz's metadata
        console.log("here");
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else if (
            props.location.state === undefined ||
            props.location.state.qID === undefined ||
            props.location.state.qID === null
        ) {
            setRedirectBack(true);
        } else {
            console.log("Props");
            setHandle(myStorage.getItem("handle"));
            setUsername(myStorage.getItem("Username"));
            console.log(props.location.state);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            quizID = props.location.state.qID;
            console.log("quizID : " + quizID);
            getData();
        }
    }, []);

    const handleAnswer = (answer) => {
        // if (!showAnswers) {
        //   //prevent double answers
        //   //check for the answer
        //   if (answer === questions[currentIndex].correct_answer) {
        //     //increase the score
        //     setScore(score + 1);
        //   }
        // }

        // setShowAnswers(true);
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        // setShowAnswers(false);
        // setCurrentIndex((prev) => prev + 1);
        // console.log(currentIndex, questions.length);

        // console.log(currentIndex);
        if (selectedAnswer == questions[currentIndex].correct_answer) {
            setScore(score + 1);
        }

        document.getElementById("next-q-btn").blur();
        setShowAnswers(false);
        setCurrentIndex(currentIndex + 1);
    };

    const loadIntoDB = () => {
        //setLoading(true);
        console.log("in exit");
        const scoreData = {
            handle: handle,
            Username: username,
            Score: score,
            Percent: Math.round((score / questions.length) * 100 * 100) / 100,
        };
        console.log(scoreData);
        console.log(quizDB);
        console.log(props.location.state.qID);
        quizDB
            .doc(props.location.state.qID)
            .update({
                Scores: firebase.firestore.FieldValue.arrayUnion(scoreData),
            })
            .then(() => {
                console.log("matter over");
                //setLoading(false);
            });
        //setEndOfQuiz(true);
        return "";
    };

    if (redirectHome) return <Redirect to="/" />;
    if (redirectDash) return <Redirect to="/dashboard" />;
    if (redirectBack) return <Redirect to="/quizfinder" />;
    if (loading) return <Loading />;

    return questions.length > 0 ? (
        <div className="container card col-lg-8 col-md-12 col-sm-12 text-justify quiz-box">
            <div className="card-img text-center">
                <i class="fas fa-list-alt quiz-img"></i>
            </div>
            <h1 className="col-lg-12 quiz-title text-center">
                {quizTitle}
            </h1>
            {currentIndex >= questions.length ? (
                <div align="center" className="pb-5">
                    <h2 className="col-lg-12 quiz-sub-title text-center">
                        Quiz Ended! Your Score was {score} / {questions.length}.
          </h2>
                    <br /><br />
                    <button
                        type="button"
                        value="Go To Dashboard"
                        name="return"
                        className="btn btn-qb-neon-primary text-nowrap"
                        onClick={() => setRedirectDash(true)}
                    >GO TO DASHBOARD</button>
                </div>
            ) : (
                <Questionnaire
                    totalQuestions={questions.length}
                    questionNumber={currentIndex + 1}
                    data={questions[currentIndex]}
                    handleAnswer={handleAnswer}
                    showAnswers={showAnswers}
                    handleNextQuestion={handleNextQuestion}
                />
            )}
        </div>
    ) : (
        <Loading />
    );
}

export default Quiz;
