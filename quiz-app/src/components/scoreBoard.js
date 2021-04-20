import firebase from "../firebase";
import { Redirect } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";

const ScoreBoard = (props) => {
    const [handle, setHandle] = useState("");
    const [scoreData, setScoreData] = useState([]);

    const quizDB = firebase.firestore().collection("QuizDB");
    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectBack, setRedirectBack] = useState(false);
    //  console.log("in");
    let myStorage = window.localStorage;
    let qID = "";
    let scoreList = [];
    useEffect(() => {
        console.log(props);
        if (myStorage.getItem("handle") == null) {
            setRedirectHome(true);
        } else if (
            props.location.state === undefined ||
            props.location.state.qID === undefined
        ) {
            setRedirectBack(true);
        } else {
            setHandle(myStorage.getItem("handle"));
            // eslint-disable-next-line react-hooks/exhaustive-deps
            qID = props.location.state.qID;
            console.log(qID);
            getData().then(() => {
                console.log(scoreList);
                setScoreData([...scoreList])
            });
        }
    }, [scoreList]);

    const getData = async () => {
        console.log("qID :" + qID);
        await quizDB
            .doc(qID)
            .get()
            .then((data) => {
                if (data.exists) {
                    const score = data.data();
                    console.log(score.Scores);
                    scoreList = scoreList.concat(score.Scores);
                    //setQuizIDS([...quizList.CreatedQuizes]);
                    //console.log(scoreList);
                    //console.log(qIDS);
                    console.log("in");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (redirectHome) return <Redirect to="/" />;
    if (redirectBack) return <Redirect to="/YourQuizes" />;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Handle </th>
                        <th> First Name </th>
                        <th> Score </th>
                        <th> % </th>
                    </tr>
                </thead>
                <tbody>
                    {scoreData.map((scoreData, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{scoreData.handle}</td>
                            <td>{scoreData.Username}</td>
                            <td>{scoreData.Score}</td>
                            <td>{scoreData.Percent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScoreBoard;
