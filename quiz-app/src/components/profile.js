import firebase from "../Firebase";
import { Link, Redirect } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { render } from "@testing-library/react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// import "./profile.css";
import Loading from "./Loading";

const Profile = (props) => {
  const [handle, setHandle] = useState("");
  const UserCreds = firebase.firestore().collection("UserCreds");
  const [userDetails, setUserdetails] = useState([]);
  const [takenQuizes, setTakenQuizes] = useState([]);

  const [averagePercentage, setAveragePercentage] = useState(0);
  const [redirectHome, setRedirectHome] = useState(false);
  const [loading, setLoading] = useState(false);

  let myStorage = window.localStorage;
  let scoreList = [];
  let details = {};

  useEffect(() => {
    if (myStorage.getItem("handle") == null) {
      setRedirectHome(true);
    } else {
      setHandle(myStorage.getItem("handle"));
    }
    console.log(handle);
    getData(myStorage.getItem("handle")).then(() => {
      console.log(takenQuizes);
      //console.log(details);

      setLoading(false);
    });
  }, []);

  const getData = async (handle) => {
    setLoading(true);
    await UserCreds.doc(handle)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          details = snapshot.data();
          //console.log(snapshot.data());
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

  //   const getAverage = async () => {
  //     console.log("in dj");
  //     // console.log(takenQuizes);
  // 	console.log(userDetails);
  // 	// console.log(takenQuizes);
  //     const sum = takenQuizes.map((data) => data.Percent).reduce((a, b) => a + b);
  //     setAveragePercentage(sum / takenQuizes.length);
  // 	console.log(sum);
  //   };
  if (redirectHome) return <Redirect to="/" />;

  return loading ? (
    <Loading />
  ) : (
    <div className="container card col-lg-8 col-md-12 col-sm-12 text-center quiz-box">
      <div className="login-img">
        <i className="fas fa-address-card" aria-hidden="true" ></i>
      </div>
      <div className="card-body">
        <h1 className="col-lg-12 col-md-12 col-sm-12 quiz-title text-center">
          User Profile
        </h1>
        {/* <div style={{ width: 200, height: 200 }}>
           <CircularProgressbar
            value={averagePercentage}
            text={`${averagePercentage}%`}
          /> 
        </div> */}
        <div id="tablediv">
          <table
            id="profiletable"
            className="table table-dark table-bordered table-hover col-sm-12"
          >
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
              {/* <tr >
              <th >Role</th>
              <td>{userDetails.Role}</td>
            </tr> 
               <tr >
              <th >Quizes Created</th>
              <td>{}</td>
            </tr>
            <tr >
              <th >Quizes Taken</th>
              <td>{}</td>
            </tr> */}
            </tbody>
          </table>
          <br></br>
          <h1 className="col-lg-12 col-md-12 col-sm-12 quiz-title text-center">
            Quizes Taken
          </h1>

          <table
            id="scoretable"
            className="table table-dark table-bordered table-hover col-sm-12"
          >
            <thead className="thead-light">
              <tr>
                <th scope="col"> # </th>
                <th scope="col"> QuizID </th>
                <th scopr="col">Title</th>
                <th scope="col"> Timestamp </th>
                <th scope="col"> Score </th>
                <th scope="col"> Percentage </th>
              </tr>
            </thead>
            <tbody>
              {takenQuizes.map((takenQuizes, idx) => (
                <tr>
                  <td scope="row">{idx + 1}</td>
                  <td scope="row">{takenQuizes.quizID}</td>
                  <td scope="row">{convertTimeStamp(takenQuizes.timestamp)}</td>
                  <td scope="row">{takenQuizes.quizTitle}</td>
                  <td scope="row">{takenQuizes.Score}</td>
                  <td scope="row">
                    <div style={{ width: 50, height: 50 }}>
                      <CircularProgressbar
                        value={takenQuizes.Percent}
                        text={`${takenQuizes.Percent}%`}
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
            value="BACK"
          >
            GO BACK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
