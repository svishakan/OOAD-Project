import React from "react";
import { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import firebase from "../firebase";

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
    <div>
      <table>
        <thead>
          <tr>
            <th> # </th>
            <th> Title </th>
          </tr>
        </thead>
        <tbody>
          {quizData.map((quizdet, idx) => (
            <tr>
              <Link
                to={{ pathname: "/results", state: { qID: quizdet.quizID } }}
              >
                <td>{idx + 1}</td>
                <td>{quizdet.title}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizSelector;