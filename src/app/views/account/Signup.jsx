import React, { useEffect, useState } from "react";
import bankingImgLight from "../../../assets/img/illustrations/apps/huro-banking-light.png";
import bankingImgDark from "../../../assets/img/illustrations/apps/huro-banking-dark.png";
import logoLight from "../../../assets/img/logos/logo/logo.svg";
import logoDark from "../../../assets/img/logos/logo/logo-light.svg";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../shared/components/input/Input";
import { Button } from "../../shared/components/button/Button";
import { Switch } from "../../shared/components/switch/Switch";
import useThemeSwitch from "../../helpers/hooks/useThemeSwitch";
import config from "../../../../config";

export const SignUp = () => {
  const themeSwitch = useThemeSwitch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [receivePromotionalOffers, setReceivePromotionalOffers] =
    useState(false);
  useEffect(() => {
    if (config.checkLoginTokenIsValid()) {
      navigate("/");
    }
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim());
  };
  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value.trim());
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value.trim());
  };
  const handleReceivePromotionalOffers = () => {
    setReceivePromotionalOffers(!receivePromotionalOffers);
  };

  const handleSignup = () => {
    navigate("/");
  };
  console.log(
    username,
    email,
    password,
    repeatPassword,
    receivePromotionalOffers
  );

  return (
    <div className="app-wrapper">
      <div className="pageloader is-full"></div>
      <div className="infraloader is-full"></div>

      <div className="auth-wrapper">
        {/* Page Body */}
        {/* Wrapper */}
        <div className="auth-wrapper-inner columns is-gapless">
          {/* Form Section */}
          <div className="column is-5">
            <div className="hero is-fullheight is-white">
              <div className="hero-heading">
                <label className="dark-mode ml-auto">
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={themeSwitch}
                  />
                  <span></span>
                </label>

                <div className="auth-logo">
                  <a href="/">
                    <img
                      className="top-logo light-image"
                      src={logoLight}
                      alt="Logo"
                    />
                    <img
                      className="top-logo dark-image"
                      src={logoDark}
                      alt="Logo"
                    />
                  </a>
                </div>
              </div>

              <div className="hero-body">
                <div className="container">
                  <div className="columns">
                    <div className="column is-12">
                      <div className="auth-content">
                        <h2>Join Us Now.</h2>
                        <p>Start by creating your account</p>
                        <Link to={"/login"}>I already have an account</Link>
                      </div>

                      <div className="auth-form-wrapper">
                        {/* Login Form */}
                        <form onSubmit={handleSignup}>
                          <div className="login-form">
                            <Input
                              value={username}
                              onChange={handleUserNameChange}
                              placeholder={"Username"}
                              hasIcon
                              iconType={"user"}
                            />
                            <Input
                              value={email}
                              onChange={handleEmailChange}
                              placeholder={"Email Address"}
                              hasIcon
                              iconType={"envelope"}
                            />
                            <Input
                              value={password}
                              onChange={handlePasswordChange}
                              placeholder={"Password"}
                              hasIcon
                              iconType={"lock"}
                            />
                            <Input
                              value={repeatPassword}
                              onChange={handleRepeatPasswordChange}
                              placeholder={"Repeat Password"}
                              hasIcon
                              iconType={"lock"}
                            />

                            <div className="setting-item">
                              <Switch
                                value={receivePromotionalOffers}
                                onChange={handleReceivePromotionalOffers}
                                isPrimary
                              />
                              <div className="setting-meta">
                                <span>Receive promotional offers</span>
                              </div>
                            </div>

                            <div className="control login">
                              <Button
                                onClick={handleSignup}
                                isPrimary
                                isBold
                                isRaised
                                isFullWidth
                              >
                                Sign Up
                              </Button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section (hidden on mobile) */}
          <div className="column login-column is-7 is-hidden-mobile h-hidden-tablet-p hero-banner">
            <div className="hero login-hero is-fullheight is-app-grey">
              <div className="hero-body">
                <div className="columns">
                  <div className="column is-10 is-offset-1">
                    <img
                      className="light-image has-light-shadow has-light-border"
                      src={bankingImgLight}
                      alt="Banking Image"
                    />

                    <img
                      className="dark-image has-light-shadow"
                      src={bankingImgDark}
                      alt="Banking Image"
                    />
                  </div>
                </div>
              </div>

              <div className="hero-footer">
                <p className="has-text-centered"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
