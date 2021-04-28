import React from "react";
import { Link } from "react-router-dom";

//Image imports
import HutLogo from "../images/hut_logo.svg"


function About() {
    return (
        <div>
            <i className="card-img-top about-img fas fa-code"></i>
            <h1 className="col-lg-12 text-center about-title">ABOUT THE DEVELOPERS</h1>
            <div className="">
                <div className="card-deck card-custom-margin">
                    <div className="card about-box">
                        <h1 className="card-header title-name">Venkataraman Nagarajan</h1>
                        <i className="card-img-top card-custom-img fas fa-user-ninja"></i>
                        <div className="card-body">
                            <p className="card-text text-white card-p-text">
                                “They're humid, prepossessing Homo sapiens with full-sized aortic pumps.”
                            </p>
                        </div>
                        <div class="card-footer d-flex justify-content-around">
                            <a href="https://github.com/Venkataraman-Nagarajan" target="_blank" className="" rel="noreferrer"><i className="connect-img fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/venkataraman-nagarajan/" target="_blank" className="" rel="noreferrer"><i className="connect-img fab fa-linkedin"></i></a>
                            <a href="mailto:njvraman@gmail.com" target="_blank" className="" rel="noreferrer"><i className="connect-img fas fa-at"></i></a>
                        </div>
                    </div>
                    <div className="card about-box">
                        <h1 className="card-header title-name">Vikram Venkatapathi</h1>
                        <i className="card-img-top card-custom-img fas fa-user-graduate"></i>
                        <div className="card-body">
                            <p className="card-text text-white card-p-text">
                                “Don’t raise your voice, improve your argument.”
                            </p>
                        </div>
                        <div class="card-footer d-flex justify-content-around">
                            <a href="https://github.com/VikramVenkatapathi" target="_blank" className="" rel="noreferrer"><i className="connect-img fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/vikram-venkatapathi-615ab21b3/" target="_blank" className="" rel="noreferrer"><i className="connect-img fab fa-linkedin"></i></a>
                            <a href="mailto:vikramvenkat2408@gmail.com" target="_blank" className="" rel="noreferrer"><i className="connect-img fas fa-at"></i></a>
                        </div>
                    </div>
                    <div className="card about-box">
                        <h1 className="card-header title-name">Vishakan Subramanian</h1>
                        <i className="card-img-top card-custom-img fas fa-user-astronaut"></i>
                        <div className="card-body" style={{ wordWrap: "break-word" }}>
                            <p className="card-text text-white card-p-text">
                                “Sometimes you gotta work a little, so you can ball a lot.”
                            </p>
                        </div>
                        <div class="card-footer d-flex justify-content-around">
                            <a href="https://github.com/svishakan" target="_blank" className="" rel="noreferrer"><i className="connect-img fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/vishakan-subramanian/" target="_blank" className="" rel="noreferrer"><i className="connect-img fab fa-linkedin"></i></a>
                            <a href="mailto:svishakan123@gmail.com" target="_blank" className="" rel="noreferrer"><i className="connect-img fas fa-at"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center my-5">
                <Link to="/dashboard">
                    <button
                        className="btn btn-gb-neon-primary"
                        type="button"
                        value="BACK">
                        GO BACK</button>
                </Link>
            </div>
            <div className="about-footer text-center">
                <p>Powered By:
                <i className="footer-img fab fa-github" data-toggle="tooltip" title="GitHub" />
                    <i className="footer-img fab fa-react" data-toggle="tooltip" title="React" />
                    <i className="footer-img fab fa-bootstrap" data-toggle="tooltip" title="Bootstrap" />
                    <i className="footer-img fab fa-google" data-toggle="tooltip" title="Google Firebase" />
                    <i className="footer-img fab fa-font-awesome" data-toggle="tooltip" title="Font Awesome" />
                    <i className="footer-img fab fa-html5" data-toggle="tooltip" title="HTML5" />
                    <i className="footer-img fab fa-css3" data-toggle="tooltip" title="CSS3" />
                    <i className="footer-img fab fa-js" data-toggle="tooltip" title="JavaScript ES6" />
                    <i className="footer-img fab fa-npm" data-toggle="tooltip" title="NPM" />
                    <div className="footer-text">
                        <img className="user" height="25" width="25" src={HutLogo} data-toggle="tooltip" title="QuizHut" alt=""/> 
                            Logo By 
                        <a href="https://www.freepik.com" title="Freepik"> Freepik.</a>
                    </div>
                </p>
            </div>
        </div>
    );
};

export default About;