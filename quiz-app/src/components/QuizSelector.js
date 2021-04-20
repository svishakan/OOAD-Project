import React from "react";
import { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import firebase from "../firebase";

import "./quiztables.css";

const QuizSelector = () => {
    const [redirect, setRedirect] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const [quizIDS, setQuizIDS] = useState([]);
    const [quizID, setQuizID] = useState("");
    const [quizData, setQuizData] = useState([]);
    const [handle, setHandle] = useState("");

    let myStorage = window.localStorage;
    const quizDB = firebase.firestore().collection("QuizDB");
    const Users = firebase.firestore().collection("UserCreds");

    let qIDS = [];
    useEffect(() => {
        if (myStorage.getItem("handle") === null) {
            setRedirectHome(true);
        } else {
            //setHandle(myStorage.getItem("handle"));
            setData(myStorage.getItem("handle")).then(() => {
                console.log(myStorage.getItem("handle"));
                makeQuizSet().then(() => {
                    console.log("here i am back");
                    console.log(quizData);
                });
            });
        }
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
    };

    const makeQuizSet = async () => {
        console.log("in make");
        for (let i = 0; i < qIDS.length; i++) {
            const id = qIDS[i];
            await quizDB
                .doc(id)
                .get()
                .then((data) => {
                    setQuizData((old_array) => [
                        ...old_array,
                        { quizID: id, title: data.data().quizName },
                    ]);
                });
        }
    };

    // const linkChange = (qID) => {
    //   setQuizID(qID);
    //   setRedirect(true);
    // };

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
        <div class="container card col-lg-8 col-md-8 text-center quiz-box">
            <div className="card-img">
                <i className="fas fa-scroll quiz-img" aria-hidden="true"></i>
            </div>
            <div className="card-body">
                <h1 className="col-lg-12 quiz-title text-center">
                    QUIZ REPORTS
                </h1>
                <table class="table table-dark table-bordered table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizData.map((quizdet, idx) => (
                            <tr>
                                <td scope="row">{idx + 1}</td>
                                <td scope="row">{quizdet.title}</td>
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
            <div className="d-flex justify-content-center pt-2 pb-5">
                <Link to="/dashboard">
                    <button
                        className="btn btn-qb-neon-primary text-nowrap"
                        type="button"
                        value="BACK" >GO BACK</button></Link>
            </div>
        </div>
    );
};

export default QuizSelector;
