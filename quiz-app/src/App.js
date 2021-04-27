import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

//File imports
import Register from "./components/Register";
import Login from "./components/Login";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";
import QuizFinder from "./components/QuizFinder";
import QuizBuilder from "./components/QuizBuilder";
import QuizCreator from "./components/QuizCreator";
import Quiz from "./components/Quiz";
import QuizSelector from "./components/QuizSelector";
import ScoreBoard from "./components/Scoreboard";
import Feedback from "./components/Feedback";
import About from "./components/About";
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
            <ToastProvider autoDismiss={true}>
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
            </ToastProvider>
        </div>
    );
}

export default App;
