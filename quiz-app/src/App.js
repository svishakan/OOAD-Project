import React from "react";
import { useState, useEffect } from "react";
import Register from "./components/register";
import Login from "./components/login";
import Loading from "./components/loading";
import Dashboard from "./components/dashboard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  function getBg() {
    const li = [
      [
        "bg-gradient-to-tl",
        "from-yellow-500",
        "via-yellow-600",
        "to-yellow-700",
      ],
      ["bg-purple-500"],
      ["bg-gradient-to-r", "from-pink-300", "via-purple-300", "to-indigo-400"],
      ["bg-gradient-to-bl", "from-purple-400", "to-yellow-400"],
    ];

    const indx = Math.floor(Math.random() * li.length);
    return li[indx];
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    const style = getBg();
    for (let i = 0; i < style.length; i++)
      document.body.classList.add(style[i]);
  }, []);

  return (
    <div>
      {loading === true ? (
        <Loading />
      ) : (
        <Router>
          <div className="justify-items-center w-auto h-6/7 flex h-screen">
            <Switch>
              <Route exact path="/">
                <Redirect to="/enter" />
              </Route>
              <Route path="/signup">
                <div className="justify-items-center rounded-lg shadow-lg py-6 px-6 m-auto  bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 align-middle">
                  <div className="flex justify-around text-2xl text-yellow-600">
                    <div className="hover:text-yellow-400">
                      <Link to="/enter">Sign in</Link>
                    </div>
                    <div className="hover:text-yellow-400">
                      <Link to="/signup">Sign up</Link>
                    </div>
                  </div>

                  <Register />
                </div>
              </Route>
              <Route path="/enter">
                <div className="justify-items-center rounded-lg shadow-lg py-6 px-6 m-auto  bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 align-middle">
                  <div className="flex justify-around text-2xl text-yellow-600">
                    <div className="hover:text-yellow-400">
                      <Link to="/enter">Sign in</Link>
                    </div>
                    <div className="hover:text-yellow-400">
                      <Link to="/signup">Sign up</Link>
                    </div>
                  </div>
                  <Login />
                </div>
              </Route>
              <Route
                path="/dashboard"
                render={(props) => <Dashboard {...props} />}
              />
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
