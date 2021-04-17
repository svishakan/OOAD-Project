import "./loading.css";
import circle from "../images/Loading.svg"

function Loading(){
return(
    <div className="bg-purple-900 bg-opacity-75 justify-items-center w-auto h-6/7 flex h-screen">
    <div className="m-auto align-middle">
       <img src={circle} alt=""/>
    </div>
    </div>
    );
}
export default Loading;