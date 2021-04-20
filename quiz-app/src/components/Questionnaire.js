import React from 'react';

import "./quiz.css";

// import { isCompositeComponentWithType } from 'react-dom/test-utils';


const Questionnaire = ({ totalQuestions, questionNumber, handleAnswer, data: { question, correct_answer, answers }, showAnswers, handleNextQuestion }) => {

    return (
        <div className="flex flex-col">
            <div className="col-lg-12">
                <h2 className="quiz-label">Q: {questionNumber} / {totalQuestions}</h2>
            </div>
            <div className="col-lg-12">
                <h2 className="quiz-question" dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            <div className="pb-5">
                {answers.map(answer => {
                    if (answer.trim() != "") {
                        //display answer option only if it is not null

                        //const textColor = showAnswers ? answer === correct_answer ? 'text-green-800' : 'text-red-800' : 'text-purple-800';
                        return (
                            <button className={`btn btn-block btn-ans-neon-primary`} onClick={() => handleAnswer(answer)} dangerouslySetInnerHTML={{ __html: answer }} />
                        )
                    }
                }

                )}
            </div>
            {(<button onClick={handleNextQuestion} id="next-q-btn" className="btn btn-block btn-next-neon-primary text-nowrap float-right">Next Question</button>)}
        </div>

    )
};

export default Questionnaire;