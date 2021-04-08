import React from "react";
import { useState, useEffect } from "react";
import firebase from "./firebase";
//import "./App.css";

function App() {
  const [creds, setCreds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const ref = firebase.firestore().collection("UserCreds");

  // function getCreds() {
  //   setLoading(true);
  //   console.log("in");
  //   ref.onSnapshot((querySnapshot) => {
  //     console.log("out")
  //     const items = []
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data())
  //     })
  //     setCreds(items);
  //     setLoading(false);
  //   });
  // }

  function getCreds() {
    console.log("vantan");
    setLoading(true);
    console.log("in");
    ref.get().then((item) => {
      console.log("out");
      console.log(item);
      const items = item.docs.map((doc) => doc.data());
      setCreds(items);
      setLoading(false);
    });
  }

  function addUserCred(newUser) {
    console.log("i was asked to come");

    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(newUser.id)
      .set(newUser)
      .then(() => {
        setCreds((prev) => [newUser, ...prev]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getCreds();
  }, []);

  if (loading) {
    return <h1>Loading ....</h1>;
  }
  return (
    <div className="App">
      <h1>Hello Nara here!!</h1>
      {console.log("re-rendered")}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addUserCred({ handle, username, password });
        }}
      >
        <input
          value={handle}
          type="text"
          placeholder="Handle Name"
          onChange={(event) => setHandle(event.target.value)}
        />
        <input
          value={username}
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input value="ADD USER" type="submit" />
      </form>
      <br />
      <div>
        {
          creds.map((user) => (
            <div key={user.id}>
              <h2>Handle Name : {user.handle}</h2>
                <p>Username : {user.username}</p>
                <p>Password : {user.password}</p>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default App;
