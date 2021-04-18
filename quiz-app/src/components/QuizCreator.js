import React, { useState } from "react";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";

const { nanoid } = require("nanoid");
const quizID = nanoid(8);

function QuizCreator() {
  const quizDB = firebase.firestore().collection("QuizDB");

  const [redirect, setRedirect] = useState(false);

  const createQuiz = () => {
    //create the quiz in a new FireStore collection

    const qName = document.getElementById("qtitle").value;
    const qDuration = document.getElementById("qduration").value;

    let myStorage = window.localStorage;

    quizDB
      .doc(quizID)
      .set({
        quizName: qName,
        quizDuration: qDuration,
      })
      .then(() => {
        console.log("Successfully written!");
        document.getElementById("creatorform").reset();
        myStorage.setItem("qID", quizID);
        setRedirect(true);
      })
      .catch((err) => {
        console.error("Document writing error: ", err);
      });
  };

  return (
    <div>
      {redirect === true ? (
        <Redirect to="/quizbuilder" />
      ) : (
        <form
          id="creatorform"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="block text-gray-700 text-lg text-center font-bold mb-2">
            Quiz Creator
          </h1>
          <h3 className="block text-gray-700 text-md text-center font-bold mb-2">
            Quiz ID: {quizID}
          </h3>

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-8">
            Quiz Title
          </label>
          <input
            id="qtitle"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray focus:bg-blue-100"
            placeholder="Quiz Title"
            required
          />

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
            Quiz Duration
          </label>
          <input
            id="qduration"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray focus:bg-blue-100"
            placeholder="Quiz Duration (in minutes)"
            type="number"
            required
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
              value="Set Quiz"
              onClick={createQuiz}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default QuizCreator;
