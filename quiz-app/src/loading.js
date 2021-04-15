import "./loading.css";
import circle from ".//images/Loading.svg"
import {Helmet} from 'react-helmet'
function Loading(){
return(
    <div className="fullPage">
        <img src={circle} alt=""/>
    </div>
    );
}
export default Loading;