/* eslint-disable jsx-a11y/scope */
import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import firebase from "../Firebase";
import Loading from "./Loading";

const QuizSelector = () => {
    const [redirect] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const [quizIDS, setQuizIDS] = useState([]);
    const [quizID] = useState("");
    const [loading, setLoading] = useState(false);

    let myStorage = window.localStorage;
    const Users = firebase.firestore().collection("UserCreds");

    let qIDS = [];
    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else {
            setLoading(true);   //started loading data
            setData(myStorage.getItem("handle")).then(() => {
                console.log(myStorage.getItem("handle"));
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myStorage]);

    const setData = async (handle) => {
        console.log("handle :" + handle);
        await Users.doc(handle)
            .get()
            .then((data) => {
                if (data.exists) {
                    const quizList = data.data();
                    console.log(quizList.CreatedQuizes);
                    qIDS = qIDS.concat(quizList.CreatedQuizes);
                    setQuizIDS([...quizList.CreatedQuizes]);
                    console.log(quizIDS);
                    console.log(qIDS);
                    console.log("in");
                }
            })
            .catch((err) => {
                console.log(err);
            });
            setLoading(false);  //finished loading data
    
    };

    if (redirectHome) return <Redirect to="/" />;
    if (redirect) {
        console.log(quizID);
        return (
            <Redirect
                to={{
                    pathname: "/results",
                    state: { qID: quizID },
                }}
            />
        );
    }
    return (
        loading? <Loading /> : (
        <div className="container card col-lg-8 col-md-8 text-center quiz-box">
            <div className="card-img">
                <i className="fas fa-scroll quiz-img" aria-hidden="true"></i>
            </div>
            <div className="card-body">
                <h1 className="col-lg-12 quiz-title text-center">
                    QUIZ REPORTS
                </h1>
                <div id="tablediv" style={{ height: "500px", overflowY: "auto" }}>
                <table className="table table-dark table-bordered table-hover table-responsive-md col-sm-12 col-sm-12">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" className="sticky-header">#</th>
                            <th scope="col" className="sticky-header">Quiz ID</th>
                            <th scope="col" className="sticky-header">Title</th>
                            <th scope="col" className="sticky-header">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizIDS.map((quizdet, idx) => (
                            <tr>
                                <td scope="row">{idx + 1}</td>
                                <td scope="row">{quizdet.quizID}</td>
                                <td scope="row">{quizdet.quizTitle}</td>
                                <td scope="row">
                                    <Link to={{ pathname: "/results", state: { qID: quizdet.quizID } }}>
                                        <button
                                            className="btn btn-l-neon-primary text-nowrap"
                                            type="button"
                                            value="VIEW">View</button>
                                    </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <div className="d-flex justify-content-center pt-2 pb-5">
                <Link to="/dashboard">
                    <button
                        className="btn btn-qb-neon-primary text-nowrap"
                        type="button"
                        value="BACK" >GO BACK</button></Link>
            </div>
        </div>
    ));
};

export default QuizSelector;
