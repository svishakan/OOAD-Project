import React, { useState, useEffect, useRef } from "react";
import useInterval from "@use-it/interval";
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
    const [scoreSheet, setScoreSheet] = useState([]);


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

    const updateDuration = () => {
        //console.log("Duration:" +  quizDuration)
        if (quizDuration >= 0)
            setQuizDuration((t) => Math.max(-1, t - 1));
    }

    useEffect(() => {
        //console.log(quizDuration + " xD")
        if (quizDuration < 0) {
            setCurrentIndex(() => questions.length + 1);
        }
        //console.log(currentIndex);
    }, [quizDuration]);

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

    const getData = () => {
        //console.log(quizID);

        quizMeta
            .doc(quizID)
            .get()
            .then((doc) => {
                const metadata = doc.data();
                setQuizTitle(metadata.quizName);
                setQuizDuration(metadata.quizDuration * 60 + 1);
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

                setScoreSheet(Array(documents.length).fill(0));

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

                questions.sort(() => Math.random() - 0.5);

                setQuestions(questions);
                //console.log(questions);
            });
    };

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

        if(currentIndex + 2 == questions.length){
            //to change the next button style to a submit button on the last question
            document.getElementById("next-q-btn").className += " fa-check-circle icon-btn-submit";
        }

        if (selectedAnswer == questions[currentIndex].correct_answer) {
            scoreSheet[currentIndex] = 1;
        }

        else {
            scoreSheet[currentIndex] = 0;
        }

        if(currentIndex + 1 == questions.length){
            //to calculate the total score
            calculateScore();
        }

        document.getElementById("next-q-btn").blur();
        setShowAnswers(false);
        setCurrentIndex(currentIndex + 1);
    };

    const handlePreviousQuestion = () => {
        if (currentIndex <= 0) return;

        if(currentIndex + 1 == questions.length){
            //to change the next button style back to old style
            document.getElementById("next-q-btn").className = "icon-btn far fa-arrow-alt-circle-right";
        }

        if (selectedAnswer == questions[currentIndex].correct_answer) {
            scoreSheet[currentIndex] = 1;
        }

        else {
            scoreSheet[currentIndex] = 0;
        }

        document.getElementById("prev-q-btn").blur();
        setShowAnswers(false);

        setCurrentIndex(currentIndex - 1);

        scoreSheet[currentIndex - 1] = 0;

    }

    const calculateScore = () => {
        let totalScore = 0;

        for (let i = 0; i < scoreSheet.length; i++) {
            totalScore += scoreSheet[i];
        }

        setScore(totalScore);

        loadIntoDB(totalScore);
    }

    const loadIntoDB = (totalScore) => {
        //setLoading(true);

        console.log("in exit");
        const scoreData = {
            handle: handle,
            Username: username,
            timestamp: Date.now().toString(),
            Score: totalScore,
            Percent: Math.round((totalScore / questions.length) * 100 * 100) / 100,
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

    //if(true) return <Timer duration={4} />
    if (redirectHome) return <Redirect to="/" />;
    if (redirectDash) return <Redirect to="/dashboard" />;
    if (redirectBack) return <Redirect to="/quizfinder" />;
    if (loading) return <Loading />;

    return questions.length > 0 ? (
        <div className="container card col-lg-8 col-md-12 col-sm-12 text-justify quiz-box">
            <div className="card-img text-center">
                <i class="fas fa-list-alt quiz-img"></i>
            </div>
            <h1 className="col-lg-12 quiz-title text-center">{quizTitle}</h1>
            {currentIndex >= questions.length ? (
                <div align="center" className="pb-5">
                    <h2 className="col-lg-12 quiz-sub-title text-center">
                        Quiz Ended! Your Score was {score} / {questions.length}.
                    </h2>
                    <br />
                    <br />
                    <button
                        type="button"
                        value="Go To Dashboard"
                        name="return"
                        className="btn btn-qb-neon-primary text-nowrap"
                        onClick={() => setRedirectDash(true)}
                    >
                        GO TO DASHBOARD
                    </button>
                </div>
            ) : (
                <div>
                    <Timer duration={quizDuration} update={updateDuration} />
                    <Questionnaire
                        totalQuestions={questions.length}
                        questionNumber={currentIndex + 1}
                        data={questions[currentIndex]}
                        handleAnswer={handleAnswer}
                        showAnswers={showAnswers}
                        handlePreviousQuestion={handlePreviousQuestion}
                        handleNextQuestion={handleNextQuestion}
                    />
                </div>
            )}
        </div>
    ) : (
        <Loading />
    );
}

const Timer = ({ duration, update }) => {
    //duration = 4;
    //const [Time] = useState(duration);
    const [displayTime, setDisplayTime] = useState(duration);

    //setTime(() => duration*60);
    //console.log(duration);
    let time = duration;
    //duration = time;
    useInterval(() => {
        update();
        //console.log("inside timer");
        let days = Math.floor(time / (24 * 60 * 60));
        time %= 24 * 60 * 60;
        let hours = Math.floor(time / (60 * 60));
        time %= 60 * 60;
        let minutes = Math.floor(time / 60);
        time %= 60;
        let seconds = time;
        //console.log(days, hours, minutes, seconds)
        if (days > 0) {
            setDisplayTime(`${days} Day(s)`);
        } else {
            let string = "";
            if (hours && hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            if (hours) string = `${hours}:${minutes}:${seconds}`;
            else string = `${minutes}:${seconds}`;

            if (duration < 0) string = "Times Up!";

            //html = string;
            setDisplayTime(string);
        }
    }, 1000);
    //console.log(html);
    return <h1 className="col-lg-12 quiz-title text-center">{displayTime}</h1>;
};

export default Quiz;
