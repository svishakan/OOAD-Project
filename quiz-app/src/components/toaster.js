import { useState } from "react";
import { Toast } from "react-bootstrap"

function Toaster({ headerText, smallText = "now", bodyText, delayTime = "3000", bgType, textColor }) {
    const [show, setShow] = useState(true);

    return (
        <div style={{ position: "absolute", top: "0", right: "0"}}>
            <Toast className={`${textColor} bg-info ${bgType}`} onClose={() => setShow(false)} show={show} delay={delayTime} autohide={true} animation={true}>
                <Toast.Header style={{maxHeight: "50px"}} closeButton={false}>
                    <i className="fas fa-info-circle rounded mr-2" style={{fontSize: "1.5em"}}></i>
                    <strong className="mr-auto">{headerText}</strong>
                    <small>{smallText}</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => setShow(false)} style={{width: "50px"}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Toast.Header>
                <Toast.Body>{bodyText}</Toast.Body>
            </Toast>
        </div>
        
    );
}


export default Toaster;