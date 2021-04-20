import "./loading.css";
import circle from "../images/Loading.svg";

function Loading() {
    return (
        <div className="d-flex justify-content-center">
            <i className="fa fa-cog fa-spin cog-key" aria-hidden="true"></i>
        </div>
    );
}
export default Loading;
