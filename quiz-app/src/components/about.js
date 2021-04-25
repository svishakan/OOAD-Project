import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./about.css";

const About = () => {
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
                                "Build Up Panramo, Peela Udramo Adhu Mukkiyam Illa, Namma Edhu Pannalum Indha Ulagam Nammala Odaney Uththu Paakanum."
                            </p>
                        </div>
                        <div class="card-footer d-flex justify-content-around">
                            <a href="https://github.com/Venkataraman-Nagarajan" target="_blank" className=""><i className="connect-img fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/venkataraman-nagarajan/" target="_blank" className=""><i className="connect-img fab fa-linkedin"></i></a>
                            <a href="mailto:venkataraman18192@cse.ssn.edu.in" target="_blank" className=""><i className="connect-img fas fa-at"></i></a>
                        </div>
                    </div>
                    <div className="card about-box">
                        <h1 className="card-header title-name">Vikram Venkatapathi</h1>
                        <i className="card-img-top card-custom-img fas fa-user-graduate"></i>
                        <div className="card-body">
                            <p className="card-text text-white card-p-text">
                                "Namakku Vaaitha Adimaigal Migavum Thiramai Saaligal."
                            </p>
                        </div>
                        <div class="card-footer d-flex justify-content-around">
                            <a href="https://github.com/VikramVenkatapathi" target="_blank" className=""><i className="connect-img fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/vikram-venkatapathi-615ab21b3/" target="_blank" className=""><i className="connect-img fab fa-linkedin"></i></a>
                            <a href="mailto:vikram18194@cse.ssn.edu.in" target="_blank" className=""><i className="connect-img fas fa-at"></i></a>
                        </div>
                    </div>
                    <div className="card about-box">
                        <h1 className="card-header title-name">Vishakan Subramanian</h1>
                        <i className="card-img-top card-custom-img fas fa-user-astronaut"></i>
                        <div className="card-body" style={{wordWrap: "break-word"}}>
                            <p className="card-text text-white card-p-text">
                                "Jaaminukkum Meenukum Vidhyaasame Theriyadha Ungala Enaku Assistant-ah Vechaen Paathiya, Adha Nenachu Naan Romba Perumai Padren Da."
                            </p>
                        </div>
                        <div class="card-footer d-flex justify-content-around">
                            <a href="https://github.com/svishakan" target="_blank" className=""><i className="connect-img fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/vishakan-subramanian/" target="_blank" className=""><i className="connect-img fab fa-linkedin"></i></a>
                            <a href="mailto:vishakan18196@cse.ssn.edu.in" target="_blank" className=""><i className="connect-img fas fa-at"></i></a>
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
        </div>
    );
};

export default About;