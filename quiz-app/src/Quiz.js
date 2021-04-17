import React, { useState, useEffect } from 'react';
import { Questionnaire } from './components';
import firebase from './firebase';


//const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy";

function Quiz(props) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);

    const quizID = props.location.state.qID;    //extract quizID from props
    console.log(quizID);
    const quizDB = firebase.firestore().collection("QuizDB").doc(quizID).collection("QuestionSet");

    useEffect(() => {
        quizDB
            .get()
            .then(snapshot => {
                const documents = snapshot.docs.map(doc => doc.data());
                console.log(documents)

                let questions = [];

                for (let i = 0; i < documents.length; i++) {
                    let qObj = {
                        question: documents[i].question,
                        correct_answer: documents[i].correct_answer,
                        answers: [documents[i].correct_answer, ...documents[i].incorrect_answers].sort(() => Math.random() - 0.5)
                    };
                    questions.push(qObj);
                }
                setQuestions(questions);
                console.log(questions);
            });
    }, []);

    const handleAnswer = (answer) => {
        if (!showAnswers) { //prevent double answers
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
        setCurrentIndex(currentIndex + 1)
    }

    return questions.length > 0 ? (
        <div className="container">
            {currentIndex >= questions.length ? (
                <h1 className="text-3xl text-white font-bold">Quiz Ended! Your Score was {score}</h1>
            ) : (
                <Questionnaire data={questions[currentIndex]} handleAnswer={handleAnswer} showAnswers={showAnswers} handleNextQuestion={handleNextQuestion} />
            )}
        </div>
    ) : (
        <h1 className="text-2xl text-white font-bold">Loading ...</h1>
    );
}

export default Quiz;
