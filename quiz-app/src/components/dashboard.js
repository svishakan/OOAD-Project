import React from "react";
import {useState, useEffect} from "react";
import "./dashboard.css";

function DashBoard(props) {
    const [handle, setHandle] = useState("");
    
    useEffect(() => {
    setHandle(props.location.state.handle);
    }, [props.location.state.handle]);

  return (
    <div className="fixed top-0 left-0 justify-center w-screen h-screen">
      <div>
          {handle}
      </div>
      <table>
        <tr>
          <td>
            <button onClick="take_quiz();">Take up a Quiz</button>
          </td>
          <td>
            <button onClick="create_quiz();">Create a Quiz</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick="view_profile();">View Profie</button>
          </td>
          <td>
            <button onClick="();"></button>
          </td>
        </tr>
      </table>
    </div>
  );
} /*
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
