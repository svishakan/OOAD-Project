import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import firebase from './firebase';

const QuizFinder = () => {
    const [redirect, setRedirect] = useState(false);
    let [quizID, setQuizID] = useState(null);
    
    const quizDB = firebase.firestore().collection("QuizDB");

    const findQuiz = () => {
        //to check if a quiz with the given quizID exists

        let qID = document.getElementById("qid").value.toString();
        setQuizID(qID); //setState is necessary to pass quizID via redirect
  
        console.log(qID);

        if(qID == null){
            //fix later with required form attribute
            window.alert("Quiz ID cannot be empty!");
        }


        quizDB.doc(qID).get()
            .then((snapshot) => {
                if(snapshot.exists){
                    window.alert("Click OK to Begin Quiz!");
                    setRedirect(true);
                }
                else{
                    window.alert("Quiz with the ID: " + quizID + " does not exist!");
                    console.log("Does not exist.");
                }
            });
    }

    return (
        <div>
            {redirect === true ? (<Redirect
                to={{
                    pathname: "/questionnaire",
                    state: { qID: quizID }
                }}
            />) : (
                <form id="creatorform" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="block text-gray-700 text-lg text-center font-bold mb-2">Quiz Finder</h1>

                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-8">Quiz ID</label>
                    <input id="qid" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray" placeholder="8 Character Quiz ID" maxLength="8" required />

                    <div className="flex items-center justify-between mt-8">
                        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="reset" value="Clear All" />
                        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" value="Attempt Quiz" onClick={findQuiz} />
                    </div>
                </form>
            )}

        </div>
    )
}

export default QuizFinder;