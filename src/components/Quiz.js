import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import useInterval from "@use-it/interval";

//Component imports
import firebase from "../Firebase";
import Loading from "./Loading";
import Questionnaire from "./Questionnaire";


function Quiz(props) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDuration, setQuizDuration] = useState(0);
    const [handle, setHandle] = useState("");
    const [username, setUsername] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [scoreSheet, setScoreSheet] = useState([]);
    const { addToast } = useToasts();

    let quizLength = 0;
    let myStorage = window.localStorage;
    let quizID = "props.location.state.qID"; //extract quizID from local storage
    const [redirectBack, setRedirectBack] = useState(false);
    const [redirectDash, setRedirectDash] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);

    const quizDB = firebase.firestore().collection("QuizDB");
    const quizMeta = firebase.firestore().collection("QuizDB");
    const Users = firebase.firestore().collection("UserCreds");

    const updateDuration = () => {
        if (quizDuration >= 0)
            setQuizDuration((t) => Math.max(-1, t - 1));
    }

    useEffect(() => {
        if (quizDuration < 0) {
            setCurrentIndex(() => questions.length + 1);

            addToast(`Your timer ran out! Your answer submissions were saved.`, { appearance: "error" });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizDuration]);

    useEffect(() => {
        //to get the quiz's metadata
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else if (
            props.location.state === undefined ||
            props.location.state.qID === undefined ||
            props.location.state.qID === null
        ) {
            setRedirectBack(true);
        } else {
            setHandle(myStorage.getItem("handle"));
            setUsername(myStorage.getItem("Username"));
            // eslint-disable-next-line react-hooks/exhaustive-deps
            quizID = props.location.state.qID;
            getData();
        }
    }, []);

    const getData = () => {

        quizMeta
            .doc(quizID)
            .get()
            .then((doc) => {
                const metadata = doc.data();
                setQuizTitle(metadata.quizName);
                setQuizDuration(metadata.quizDuration * 60 + 1);
                quizLength = metadata.quizLength;
            });

        //to get the quiz's questionnaire
        quizDB
            .doc(quizID)
            .collection("QuestionSet")
            .get()
            .then((snapshot) => {
                const documents = snapshot.docs.map((doc) => doc.data());

                let questions = [];

                setScoreSheet(Array(quizLength).fill(null));

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
                questions = questions.splice(0, quizLength);

                setQuestions(questions);

            });
    };

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const displayAnswerInfo = () => {

        if (selectedAnswer) {
            addToast(`You selected ${selectedAnswer} for the previous question.`, { appearance: "info", autoDismissTimeout: 2000 });
        }

        else {
            addToast(`You did not select an answer for the previous question.`, { appearance: "warning", autoDismissTimeout: 2000 });
        }
    };

    const selectAnsweredQuestion = (direction) => {
        //select an already answered question by default

        setSelectedAnswer(scoreSheet[currentIndex]);

        setTimeout(() => {
            //wait for the question set to render, then set focus on its answer

            if (scoreSheet[currentIndex + direction] != null) {
                //select the previously selected answer if it was selected
                document.getElementById(`${scoreSheet[currentIndex + direction]}-opt`).click();
                document.getElementById(`${scoreSheet[currentIndex + direction]}-opt`).focus();
            }

            else {
                setSelectedAnswer(null);
            }

        }, 100);


    }

    const handleNextQuestion = () => {

        displayAnswerInfo();

        if (currentIndex + 2 === questions.length) {
            //to change the next button style to a submit button on the last question
            document.getElementById("next-q-btn").className += " fa-check-circle icon-btn-submit";
        }

        if (selectedAnswer) {
            scoreSheet[currentIndex] = selectedAnswer;
        } else {
            scoreSheet[currentIndex] = null;
        }

        if (currentIndex + 1 === questions.length) {
            //to calculate the total score
            calculateScore(questions);
        }

        document.getElementById("next-q-btn").blur();

        setCurrentIndex(currentIndex + 1);

        selectAnsweredQuestion(1);

    };

    const handlePreviousQuestion = () => {
        if (currentIndex <= 0) return;

        displayAnswerInfo();

        if (currentIndex + 1 === questions.length) {
            //to change the next button style back to old style
            document.getElementById("next-q-btn").className = "icon-btn far fa-arrow-alt-circle-right";
        }

        if (selectedAnswer) {
            scoreSheet[currentIndex] = selectedAnswer;
        } else {
            scoreSheet[currentIndex] = null;
        }

        document.getElementById("prev-q-btn").blur();

        setCurrentIndex(currentIndex - 1);

        selectAnsweredQuestion(-1);

    }

    const calculateScore = (questions) => {
        let totalScore = 0;

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].correct_answer === scoreSheet[i]) {
                totalScore += 1;
            }
        }

        setScore(totalScore);

        loadIntoDB(totalScore);
    }

    const loadIntoDB = (totalScore) => {
        let timestamp = Date.now().toString();

        const scoreData = {
            handle: handle,
            Username: username,
            timestamp: timestamp,
            Score: totalScore,
            Percent: Math.round((totalScore / questions.length) * 100 * 100) / 100,
        };
        quizDB
            .doc(props.location.state.qID)
            .update({
                Scores: firebase.firestore.FieldValue.arrayUnion(scoreData),
            })
            .then((result) => {
                Users.doc(handle)
                    .update({
                        TakenQuizes: firebase.firestore.FieldValue.arrayUnion({
                            quizID: props.location.state.qID,
                            quizTitle: props.location.state.qName,
                            timestamp: timestamp,
                            Score: totalScore,
                            Percent: Math.round((totalScore / questions.length) * 100 * 100) / 100,
                        }),
                    })
                //setLoading(false);
            });
        //setEndOfQuiz(true);
        return "";
    };

    //if(true) return <Timer duration={4} />
    if (redirectHome) return <Redirect to="/" />;
    if (redirectDash) return <Redirect to="/dashboard" />;
    if (redirectBack) return <Redirect to="/findquiz" />;
    
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
    const [displayTime, setDisplayTime] = useState(duration);

    let time = duration;
    useInterval(() => {
        update();
        let days = Math.floor(time / (24 * 60 * 60));
        time %= 24 * 60 * 60;
        let hours = Math.floor(time / (60 * 60));
        time %= 60 * 60;
        let minutes = Math.floor(time / 60);
        time %= 60;
        let seconds = time;
        if (days > 0) {
            setDisplayTime(`${days} Day(s)`);
        } else {
            let string = "";
            if (hours && hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            if (hours) string = `${hours}:${minutes}:${seconds}`;
            else string = `${minutes}:${seconds}`;

            if (duration < 0) {
                string = "Times Up!";
            }

            //html = string;
            setDisplayTime(string);
        }
    }, 1000);
    return <h1 className="col-lg-12 quiz-title text-center">{displayTime}</h1>;
};

export default Quiz;
