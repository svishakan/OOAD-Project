import React from "react";
import "./dashboard.css";

function DashBoard() {
    console.log("ulle");
    return(
        <body>
        <div class="center">
            <table>
                <tr>
                    <td><button onClick="take_quiz();"
                        >Take up a Quiz</button></td>
                    <td><button onClick="create_quiz();">Create a Quiz</button></td>
                </tr>
                <tr>
                    <td><button onClick="view_profile();">View Profie</button></td>
                    <td><button onClick="();"></button></td>
                </tr>
            </table>
        </div>
        </body>
    );
}/*
function take_quiz(){
    return(
        <div><TakeQuiz /></div>
    );
}
function create_quiz(){
    return(
        <div><CreateQuiz /></div>
    );
function view_profile(){
    return(
        <div><ViewProfile /></div>
    );
}
function (){
    return(
        <div>< /></div>
    );
}
*/
export default DashBoard;