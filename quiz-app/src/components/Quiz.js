import React, { useState, useEffect } from "react";
import { Questionnaire } from ".";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import Loading from "./loading";

//const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy";

function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDuration, setQuizDuration] = useState(0);
  const [handle, setHandle] = useState("");

  let myStorage = window.localStorage;
  let quizID = "props.location.state.qID"; //extract quizID from local storage
  const [redirectBack, setRedirectBack] = useState(false);
  const [redirectDash, setRedirectDash] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);

  // console.log(quizID);
  const quizDB = firebase.firestore().collection("QuizDB");

  const quizMeta = firebase.firestore().collection("QuizDB");

  // useEffect(() => {

  // }, [])
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
      console.log(props.location.state);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      quizID = props.location.state.qID;
      console.log("quizID : " + quizID);
      getData();
    }
  }, []);

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      //prevent double answers
      //check for the answer
      if (answer === questions[currentIndex].correct_answer) {
        //increase the score
        setScore(score + 1);
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    setCurrentIndex(currentIndex + 1);
  };

  if (redirectHome) return <Redirect to="/" />;
  if (redirectDash) return <Redirect to="/dashboard" />;
  if (redirectBack) return <Redirect to="/quizfinder" />;

  return questions.length > 0 ? (
    <div className="flex justify-center items-center h-screen">
      <div className="container w-screen m-3">
        <h1 className="text-3xl text-white text-center font-bold m-10">
          {quizTitle}
        </h1>
        {currentIndex >= questions.length ? (
          <div align="center">
            <h2 className="text-3xl text-white text-center font-bold">
              Quiz Ended! Your Score was {score} / {questions.length}.
          </h2>
            <br /><br />
            <input
              type="button"
              value="Go To Dashboard"
              name="return"
              className="rounded-full py-1 px-6 bg-green-800 text-white hover:bg-green-900"
              onClick={() => setRedirectDash(true)}
            />
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
    </div>
  ) : (
    <Loading />
  );
}

export default Quiz;
