import Login from "./login"
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

function LoginPage() {
    return (
        <div className="justify-items-center w-auto h-6/7 flex h-screen">
            <div className="justify-items-center rounded-lg shadow-lg py-6 px-6 m-auto  bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 align-middle">
                <div className="flex justify-around text-2xl text-yellow-600">
                    <div className="hover:text-yellow-400">
                        <Link to="/enter">Sign in</Link>
                    </div>
                    <div className="hover:text-yellow-400">
                        <Link to="/signup">Sign up</Link>
                    </div>
                </div>
                <Login />
            </div>
        </div>
    );
}

export default LoginPage;