import React from "react";
import { useState, useEffect } from "react";
import firebase from "./firebase";
import Register from "./register"
// import Login from "./login"
import Loading from "./loading"

//import "./App.css";

//ReactDOM.render(<login />, document.getElementById('root'));
//ReactDOM.render(<register />, document.getElementById('root'));

function App() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

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
  
  
/*
  useEffect(() => {
    getCreds();
  }, []);*/

  if (loading) {
    return(
      <div><Loading /></div>
    ) ;
  }
  
  // if(login){
  //   return(
  //     <div><Login /></div>
  //   ) ;
  // }
  // else{
     return(
      <div><Register /></div>
    ) ;
  //}
 
  /*return (
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
  );*/
  
}

export default App;
