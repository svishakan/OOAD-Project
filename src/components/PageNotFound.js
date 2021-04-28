import Navigation from "./Navigation";

function PageNotFound() {
    return (
        <div>
            <Navigation />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-img">
                            <i class="fas fa-bug"></i>
                        </div>
                        <h1 className="col-lg-12 col-md-12 col-sm-12 quiz-title text-center">
                            ERROR: 404
                        </h1>
                        <h1 className="col-lg-12 col-md-12 col-sm-12 quiz-title text-center">
                            Page not found
                        </h1>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PageNotFound;