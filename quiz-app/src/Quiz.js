import React, { useState, useEffect } from 'react';

import { Questionnaire } from './components';

const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy";

function App() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then((data) => {
                const questions = data.results.map((question) => ({
                    ...question,
                    answers: [
                        question.correct_answer,
                        ...question.incorrect_answers
                    ].sort(() => Math.random() - 0.5)
                }));
                setQuestions(questions);
            });
    }, []);

    const handleAnswer = (answer) => {
        if (!showAnswers){ //prevent double answers
           //check for the answer
            if(answer === questions[currentIndex].correct_answer){
                //increase the score
                setScore(score + 1);
            } 
        }

        setShowAnswers(true);
    };

    const handleNextQuestion = () =>{
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
