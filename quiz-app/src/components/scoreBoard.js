import firebase from "../firebase";
import { Link, Redirect } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

//import "./quiztables.css";
import Loading from "./loading";

const ScoreBoard = (props) => {
    const [handle, setHandle] = useState("");
    const [scoreData, setScoreData] = useState([]);

    const quizDB = firebase.firestore().collection("QuizDB");
    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectBack, setRedirectBack] = useState(false);
    const [loading, setLoading] = useState(false);

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

            setLoading(false);  //finished loading data
        }
    }, [scoreList]);

    const getData = async () => {
        console.log("qID :" + qID);

        setLoading(true);   //started loading data
        //for extracting qID for export
        myStorage.setItem("qID", qID);

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

    const convertTimeStamp = (timestamp) => {
        //to convert the epoch time to locale string

        let date = new Date(parseInt(timestamp));

        return date.toLocaleString();
    }

    if (redirectHome) return <Redirect to="/" />;
    if (redirectBack) return <Redirect to="/YourQuizes" />;

    return (
        loading? <Loading /> : (<div className="container card col-lg-8 col-md-12 col-sm-12 text-center quiz-box">
            <div className="card-img">
                <i className="fas fa-poll quiz-img" aria-hidden="true"></i>
            </div>
            <div className="card-body">
                <h1 className="col-lg-12 col-md-12 col-sm-12 quiz-title text-center">
                    SCORECARD
                </h1>
                <div id="tablediv">
                <table id="scoretable" class="table table-dark table-bordered table-hover col-sm-12">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col"> # </th>
                            <th scope="col"> Submission Time </th>
                            <th scope="col"> Handle </th>
                            <th scope="col"> Name </th>
                            <th scope="col"> Score </th>
                            <th scope="col"> Percentage </th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreData.map((scoreData, idx) => (
                            <tr>
                                <td scope="row">{idx + 1}</td>
                                <td scope="row">{convertTimeStamp(scoreData.timestamp)}</td>
                                <td scope="row">{scoreData.handle}</td>
                                <td scope="row">{scoreData.Username}</td>
                                <td scope="row">{scoreData.Score}</td>
                                <td scope="row">{scoreData.Percent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <div className="d-flex justify-content-center pt-2 pb-5">
                <Link to="/YourQuizes">
                    <button
                        className="btn btn-qb-neon-primary"
                        type="button"
                        value="BACK">GO BACK</button></Link>

                    <ReactHTMLTableToExcel
                    className="download-table-xls-button btn btn-qb-neon-primary"
                    table="scoretable"
                    filename={`Marksheet: ${window.localStorage.getItem("qID")}`}
                    sheet={qID}
                    buttonText="EXPORT"/>

            </div>
        </div>
    ));
};

export default ScoreBoard;
