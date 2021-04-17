import "./loading.css";
import circle from "../images/Loading.svg";

function Loading() {
  return (
    <div className="fixed top-0 left-0 justify-center w-screen h-screen bg-purple-900 ">
      <img src={circle} alt="" className="mx-auto block "/>
    </div>
  );
}
export default Loading;
