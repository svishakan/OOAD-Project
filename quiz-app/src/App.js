import React from "react";
import { useState, useEffect } from "react";
import RegPage from "./components/RegPage";
import LoginPage from "./components/LoginPage";
import Loading from "./components/loading";
import Dashboard from "./components/dashboard";
import QuizFinder from "./components/QuizFinder";
import QuizBuilder from "./components/QuizBuilder";
import QuizCreator from "./components/QuizCreator";
import Quiz from "./components/Quiz";

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
          <div>
            <Switch>
              <Route exact path="/">
                <Redirect to="/enter" />
              </Route>
              <Route path="/signup">
                <RegPage />  
              </Route>
              <Route path="/enter">
                <LoginPage />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/quiz">
                <Redirect to="/quizfinder" />
              </Route>
              <Route path="/quizfinder">
                <QuizFinder />
              </Route>
              <Route
                path="/questionnaire"
                render={(props) => <Quiz {...props} />}
              />
              <Route path="/quizbuilder">
                <QuizBuilder />
              </Route>
              <Route path="/quizcreator">
                <QuizCreator />
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
