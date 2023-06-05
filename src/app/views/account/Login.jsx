import React, { useEffect, useState } from "react";
import station from "../../../assets/img/illustrations/login/station.svg";
import useThemeSwitch from "../../helpers/hooks/useThemeSwitch";
import { useNavigate } from "react-router-dom";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import groflexShortLogo from "../../../assets/img/logos/logo/groflex_short_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../../config";
import _ from "lodash";
import GroflexService from "../../services/groflex.service";
import * as actionTypes from "../../redux/actions/actions.types";
import store from "../../redux/store";
import webStorageKeyEnum from "../../enums/web-storage-key.enum";
import webstorageService from "../../services/webstorage.service";

store.subscribe(() => {
  console.log(store.getState());
});

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeSwitcher = useThemeSwitch();
  const { theme } = useSelector((state) => state.themeData);

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim());
  };

  useEffect(() => {
    if (config.checkLoginTokenIsValid()) {
      navigate("/");
    }
  });

  const handleLogin = () => {
    GroflexService.login(email, password).then((res) => {
      // console.log(res.data, " :Response for login");
      dispatch({ type: actionTypes.SET_LOGIN_TOKEN, payload: res.data.token });
      webstorageService.setItem(
        webStorageKeyEnum.LOGIN_TOKEN_KEY,
        res.data.token
      );
      webstorageService.setItem(
        webStorageKeyEnum.LOGIN_TOKEN_START_TIME,
        new Date().getTime()
      );
      navigate("/");
    });
  };

  const logoClassnames = theme === "light" ? "light-image" : "dark-image";

  console.log(email, password);
  return (
    <div className="auth-wrapper is-dark">
      <div className="modern-login">
        <div className="underlay h-hidden-mobile h-hidden-tablet-p"></div>

        <div className="columns is-gapless is-vcentered">
          <div className="column is-relative is-8 h-hidden-mobile h-hidden-tablet-p">
            <div className="hero is-fullheight is-image">
              <div className="hero-body">
                <div className="container">
                  <div className="columns">
                    <div className="column">
                      <img className="hero-image" src={station} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4 is-relative">
            <a style={{ width: "55%" }} className="top-logo" href="/">
              <img
                src={groflexShortLogo}
                alt="logo"
                className={logoClassnames}
              />
            </a>
            <label className="dark-mode ml-auto">
              <input onClick={themeSwitcher} type="checkbox" defaultChecked />
              <span></span>
            </label>
            <div className="is-form">
              <div className="hero-body">
                <div className="form-text">
                  <h2>Sign In</h2>
                  <p>Welcome back to your account.</p>
                </div>
                <div className="form-text is-hidden">
                  <h2>Recover Account</h2>
                  <p>Reset your account password.</p>
                </div>
                <form
                  onSubmit={handleLogin}
                  id="login-form"
                  className="login-wrapper"
                  action="/"
                >
                  <div className="control has-validation">
                    <input
                      value={email}
                      onChange={handleEmailChange}
                      type="email"
                      className="input"
                      placeholder=""
                    />
                    <small className="error-text">
                      This is a required field
                    </small>
                    <div className="auth-label">Email Address</div>
                    <div className="auth-icon">
                      <FeatherIcon name={"Mail"} />
                    </div>
                    <div className="validation-icon is-success">
                      <div className="icon-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-check"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div className="validation-icon is-error">
                      <div className="icon-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="control has-validation">
                    <input
                      onChange={handlePasswordChange}
                      type="password"
                      className="input"
                      value={password}
                    />
                    <div className="auth-label">Password</div>
                    <div className="auth-icon">
                      <FeatherIcon name={"Lock"} />
                    </div>
                  </div>

                  <div className="control is-flex">
                    <label className="remember-toggle">
                      <input
                        value={rememberMe}
                        type="checkbox"
                        onChange={() => {
                          setRememberMe(!setRememberMe);
                        }}
                      />
                      <span className="toggler">
                        <span className="active">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span className="inactive">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-circle"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                        </span>
                      </span>
                    </label>
                    <div className="remember-me">Remember Me</div>
                    <a id="forgot-link">Forgot Password?</a>
                  </div>
                  <div className="button-wrap has-help">
                    <button
                      onClick={handleLogin}
                      id="login-submit"
                      type="button"
                      className="button h-button is-big is-rounded is-primary is-bold is-raised"
                    >
                      Login Now
                    </button>
                    <span>
                      Or <a href="/signup">Create</a> an account.
                    </span>
                  </div>
                </form>

                <form
                  onSubmit={handleLogin}
                  id="recover-form"
                  className="login-wrapper is-hidden"
                >
                  <p className="recover-text">
                    Enter your email and click on the confirm button to reset
                    your password. We'll send you an email detailing the steps
                    to complete the procedure.
                  </p>
                  <div className="control has-validation">
                    <input type="text" className="input" />
                    <small className="error-text">
                      This is a required field
                    </small>
                    <div className="auth-label">Email Address</div>
                    <div className="auth-icon">
                      <i className="lnil lnil-envelope"></i>
                    </div>
                    <div className="validation-icon is-success">
                      <div className="icon-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-check"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div className="validation-icon is-error">
                      <div className="icon-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="button-wrap">
                    <button
                      id="cancel-recover"
                      type="button"
                      className="button h-button is-white is-big is-rounded is-lower"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="button h-button is-solid is-big is-rounded is-lower is-raised is-colored"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
