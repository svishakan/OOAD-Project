import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";


function DashBoard() {
    const [handle, setHandle] = useState("");
    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectTake, setRedirectTake] = useState(false);
    const [redirectSet, setRedirectSet] = useState(false);
    const [redirectReport, setRedirectReport] = useState(false);
    // const [redirectFeedback, setredirectFeedback] = useState(false);

    let myStorage = window.localStorage;

    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else {
            setHandle(myStorage.getItem("handle"));
        }
    }, [myStorage]);

    if (redirectSet) return <Redirect to="/quizcreator" />;
    if (redirectTake) return <Redirect to="/quizfinder" />;
    if (redirectReport) return <Redirect to="/YourQuizes" />;
    //if (redirectFeedback) return <Redirect to="/Feedback" />;

    return (
        <div>
            {redirectHome === true ? (
                <Redirect to="/enter" />
            ) : (
                <div>
                    <div className="justify-items-center">
                            <div className="card-deck card-custom-margin">
                                <div className="card about-box ice-hover">
                                    <h1 className="card-header2">Take Up a Quiz</h1>
                                    <i className="card-img-top card-custom-img fas fa-clipboard"></i>
                                    <div className="card-body">
                                        <p className="card-text text-white card-p-text">
                                            Attempt an existing quiz with its unique quiz ID.
                                        </p>
                                    </div>
                                    <div className="card-footer text-muted">
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            onClick={() => {
                                                setRedirectTake(true);
                                            }}>
                                            TAKE A QUIZ
                                        </button>
                                    </div>
                                </div>

                                <div className="card about-box ice-hover">
                                    <h1 className="card-header2">Create a Quiz</h1>
                                    <i className="card-img-top card-custom-img fas fa-feather"></i>
                                    <div className="card-body">
                                        <p className="card-text text-white card-p-text">
                                            Build your own quiz and share it to others with its quiz ID.
                                        </p>
                                    </div>
                                    <div className="card-footer text-muted">
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            onClick={() => {
                                                setRedirectSet(true);
                                            }}>
                                            CREATE A QUIZ
                                        </button>
                                    </div>
                                </div>

                                <div className="card about-box ice-hover">
                                    <h1 className="card-header2">View Report</h1>
                                    <i className="card-img-top card-custom-img fas fa-poll-h"></i>
                                    <div className="card-body">
                                        <p className="card-text text-white card-p-text">
                                            Check the reports for the quizzes that you have set.
                                        </p>
                                    </div>
                                    <div className="card-footer text-muted">
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            onClick={() => {
                                                setRedirectReport(true);
                                            }}>
                                            VIEW REPORTS
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashBoard;
