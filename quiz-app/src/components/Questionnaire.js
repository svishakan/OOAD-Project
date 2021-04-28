/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';


const Questionnaire = ({ totalQuestions, questionNumber, handleAnswer, data: { question, correct_answer, answers }, handlePreviousQuestion, handleNextQuestion }) => {
    let setPreviousHidden = "";

    if(questionNumber === 1){
        setPreviousHidden = "set-p-hidden"
    }

    return (
        <div className="flex flex-col">
            <div className="col-lg-12">
                <h2 className="quiz-label">Q: {questionNumber} / {totalQuestions}</h2>
            </div>
            <div className="col-lg-12">
                <h2 className="quiz-question" dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            <div className="pb-5">
                {// eslint-disable-next-line array-callback-return
                answers.map((answer, index) => {
                    if (answer.trim() !== "") {
                        //const textColor = showAnswers ? answer === correct_answer ? 'text-green-800' : 'text-red-800' : 'text-purple-800';
                        return (
                            <button id={`${answer}-opt`} className={`btn-lg btn-block btn-ans-neon-primary`} onClick={() => handleAnswer(answer)} dangerouslySetInnerHTML={{ __html: answer }} />
                        )
                    }
                }

                )}
            </div>
            <div className="d-flex flex-row justify-content-between">
                {(<a onClick={handlePreviousQuestion} id="prev-q-btn" className={`icon-btn far fa-arrow-alt-circle-left ${setPreviousHidden}`}></a>)}
                {(<a onClick={handleNextQuestion} id="next-q-btn" className="icon-btn far fa-arrow-alt-circle-right"></a>)}
            </div>
        </div>

    )
};

export default Questionnaire;