import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

//File imports
import Register from "./components/register";
import Login from "./components/login";
import Loading from "./components/loading";
import Dashboard from "./components/dashboard";
import QuizFinder from "./components/QuizFinder";
import QuizBuilder from "./components/QuizBuilder";
import QuizCreator from "./components/QuizCreator";
import Quiz from "./components/Quiz";
import QuizSelector from "./components/QuizSelector";
import ScoreBoard from "./components/scoreBoard";
import Feedback from "./components/feedback";
import About from "./components/about";
import ForgotPassword from "./components/ForgotPassword"
import Profile from "./components/profile"


//import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
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
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/enter">
                <Login />
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
              <Route path="/YourQuizes">
                <QuizSelector />
              </Route>
              <Route
                path="/results"
                render={(props) => <ScoreBoard {...props} />}
              />
              <Route path="/feedback">
                <Feedback />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/passwordreset">
                <ForgotPassword />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
