import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";

let records = [];

function QuizBuilder() {
  const [quizID, setQuizID] = useState("");
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
  };

  const uploadQuiz = () => {
    //upload the quiz to the Firestore DB

    nextQuestion(); //store the most recent question as well

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
          //To Do: Set a redirect back to dashboard from here
        })
        .catch((err) => {
          console.error("Document writing error: ", err);
        });
    }
  };

  if (redirectHome) return <Redirect to="/" />;
  if (redirectDash) return <Redirect to="/dashboard" />;
  if (redirectBack) return <Redirect to="/quizcreator" />;
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        id="quizform"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-12 w-full"
      >
        <h1 className="block text-gray-700 text-lg text-center font-bold mb-2">
          Quiz Builder
      </h1>
        <h3 className="block text-gray-700 text-md text-center font-bold mb-2">
          Quiz ID: {quizID}
        </h3>

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-8">
          Question #{questionNumber}
        </label>
        <input
          id="ques"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray focus:bg-blue-100"
          placeholder="Question"
          required
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
          Correct Answer
      </label>
        <input
          id="ans1"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray focus:bg-blue-100"
          placeholder="Correct Answer"
          required
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
          Wrong Answer #1
      </label>
        <input
          id="ans2"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray focus:bg-blue-100"
          placeholder="Wrong Answer #1"
          required
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
          Wrong Answer #2
      </label>
        <input
          id="ans3"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray focus:bg-blue-100"
          placeholder="Wrong Answer #2"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
          Wrong Answer #3
      </label>
        <input
          id="ans4"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray focus:bg-blue-100"
          placeholder="Wrong Answer #3"
        />

        <div className="flex items-center justify-between mt-8">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="reset"
            value="Clear All"
          />
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            value="Next Question"
            onClick={nextQuestion}
          />
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            value="Upload Set"
            onClick={uploadQuiz}
          />
        </div>
      </form>
    </div>
  );
}

export default QuizBuilder;
