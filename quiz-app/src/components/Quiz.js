import React, { useState, useEffect } from "react";
import { Questionnaire } from ".";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import Loading from "./loading";

//const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizTitle, setQuizTitle] = useState(null);
  const [quizDuration, setQuizDuration] = useState(0);

  const [quizID, setQuizID] = useState(""); //extract quizID from local storage
  const [redirectBack, setRedirectBack] = useState(false);
  let myStorage = window.localStorage;

  console.log(quizID);
  const quizDB = firebase
    .firestore()
    .collection("QuizDB")
    .doc(quizID)
    .collection("QuestionSet");
  const quizMeta = firebase.firestore().collection("QuizDB").doc(quizID);

  useEffect(() => {
    if (myStorage.getItem("qID") == null) {
      setRedirectBack(true);
    } else {
      setQuizID(myStorage.getItem("qID"));
    }
  }, [myStorage]);

  useEffect(() => {
    //to get the quiz's metadata
    quizMeta.get().then((doc) => {
      const metadata = doc.data();
      setQuizTitle(metadata.quizTitle);
      setQuizDuration(metadata.quizDuration);
      console.log(metadata);
    });

    //to get the quiz's questionnaire
    quizDB.get().then((snapshot) => {
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
      console.log(questions);
    });
  }, [quizDB, quizMeta]);

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

  if (redirectBack) return <Redirect to="/quizfinder" />;
  return questions.length > 0 ? (
    <div className="container w-screen m-3">
      <h1 className="text-3xl text-white text-center font-bold m-10">
        {quizTitle}
      </h1>
      {currentIndex >= questions.length ? (
        <h2 className="text-3xl text-white font-bold">
          Quiz Ended! Your Score was {score}
        </h2>
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
