/* eslint-disable jsx-a11y/scope */
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import firebase from "../Firebase";
import Loading from "./Loading";


const Profile = (props) => {
    const [, setHandle] = useState("");
    const UserCreds = firebase.firestore().collection("UserCreds");
    const [userDetails, setUserdetails] = useState([]);
    const [takenQuizzes, setTakenQuizes] = useState([]);
    const [redirectHome, setRedirectHome] = useState(false);
    const [loading, setLoading] = useState(false);

    let myStorage = window.localStorage;

    useEffect(() => {
        if (myStorage.getItem("handle") == null) {
            setRedirectHome(true);
        } else {
            setHandle(myStorage.getItem("handle"));
        }
        getData(myStorage.getItem("handle")).then(() => {
          setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myStorage]);

    const getData = async (handle) => {
        setLoading(true);
        await UserCreds.doc(handle)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUserdetails(snapshot.data());
                    setTakenQuizes(snapshot.data().TakenQuizes);
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
    };

    if (redirectHome) return <Redirect to="/" />;

    return loading ? (
        <Loading />
    ) : (
        <div className="container card col-lg-8 col-md-12 col-sm-12 text-center quiz-box">
            <div className="login-img">
                <i className="fas fa-id-card-alt" aria-hidden="true" ></i>
            </div>
            <div className="card-body">
                <h1 className="col-lg-12 col-md-12 col-sm-12 quiz-title text-center">
                    My Profile
                </h1>
                <div id="tablediv">
                    <table
                        id="profiletable"
                        className="table table-dark table-bordered table-hover table-responsive-md col-sm-12">
                        <tbody>
                            <tr>
                                <th>Handle</th>
                                <td>{userDetails.Handle}</td>
                            </tr>
                            <tr>
                                <th> Username</th>
                                <td>{userDetails.Username}</td>
                            </tr>
                            <tr>
                                <th>Workpalce/Institution</th>
                                <td>{userDetails.Workplace}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{userDetails.Email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br></br>
                <h1 className="col-lg-12 col-md-12 col-sm-12 quiz-title text-center">
                    Quizzes Taken
                    </h1>

                <div style={{ height: "250px", overflowY: "auto" }}>
                    <table
                        id="scoretable"
                        className="table table-dark table-bordered table-hover table-striped table-responsive-md col-sm-12">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" className="sticky-header"> # </th>
                                <th scope="col" className="sticky-header"> QuizID </th>
                                <th scopr="col" className="sticky-header"> Title </th>
                                <th scope="col" className="sticky-header"> Submission Time </th>
                                <th scope="col" className="sticky-header"> Score </th>
                                <th scope="col" className="sticky-header"> Percentage </th>
                            </tr>
                        </thead>
                        <tbody>
                            {takenQuizzes.map((takenQuizzes, idx) => (
                                <tr>
                                    <td scope="row">{idx + 1}</td>
                                    <td scope="row">{takenQuizzes.quizID}</td>
                                    <td scope="row">{takenQuizzes.quizTitle}</td>
                                    <td scope="row">{convertTimeStamp(takenQuizzes.timestamp)}</td>
                                    <td scope="row">{takenQuizzes.Score}</td>
                                    <td className="d-flex justify-content-center" scope="row">
                                        <div style={{ width: 65, height: 65 }}>
                                            <CircularProgressbar
                                                value={takenQuizzes.Percent}
                                                text={`${takenQuizzes.Percent}%`}
                                                styles={buildStyles({
                                                    textSize: "25px",
                                                    textColor: '#fff',
                                                    backgroundColor: '#baf2ef'
                                                })}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex justify-content-center pt-2 pb-5">
                <Link to="/dashboard">
                    <button
                        className="btn btn-qb-neon-primary"
                        type="button"
                        value="BACK">
                        GO BACK
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
