import React, { useEffect, useState } from "react";
import login_Bg from "../../../assets/groflex/bg/loginpage_bg.png";
import googleIcon from "../../../assets/groflex/logos/google.png";
import carousel1 from "../../../assets/groflex/images/carousel1.png";
import carousel2 from "../../../assets/groflex/images/carousel2.png";
import carousel3 from "../../../assets/groflex/images/carousel3.png";
import carousel4 from "../../../assets/groflex/images/carousel4.png";
import groflex_logo_transparent from "../../../assets/groflex/logos/groflex_name_logo_color_no_tag.png";
import useThemeSwitch from "../../helpers/hooks/useThemeSwitch";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../../config";
import _ from "lodash";
import groflexService from "../../services/groflex.service";
import * as actionTypes from "../../redux/actions/actions.types";
import store from "../../redux/store";
import webStorageKeyEnum from "../../enums/web-storage-key.enum";
import webstorageService from "../../services/webstorage.service";
import ReactSlickCarousel from "../../shared/components/carousel/ReactSlickCarousel";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { Input } from "../../shared/components/input/Input";
import { Button } from "../../shared/components/button/Button";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import { InputAddons } from "../../shared/components/inputAddons/InputAddons";
import { Check } from "react-feather";
import { Checkbox } from "../../shared/components/checkbox/Checkbox";

store.subscribe(() => {
  console.log(store.getState());
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailExistsFlag, setEmailExistsFlag] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  useEffect(() => {
    if (config.checkLoginTokenIsValid()) {
      navigate("/");
    }
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim());
  };

  const handleLogin = () => {
    setFormErrors({ ...formErrors, emailError: "", passwordError: "" });

    // Email is empty or not
    if (!email) {
      setFormErrors({ ...formErrors, emailError: "Please type email address" });
      return;
    }

    // Email is valid or not
    if (!config.regex.emailCheck.test(email)) {
      setFormErrors({
        ...formErrors,
        emailError: "Please type a valid email address",
      });
      return;
    }

    // Check email exists or not
    if (emailExistsFlag === null) {
      groflexService.checkEmailExist(email).then((res) => {
        if (
          res.meta.email !== undefined &&
          res.meta.email[0].code === "NOT_FOUND"
        ) {
          console.log(res, "Email not exists!");
          setEmailExistsFlag(false);
          navigate("/signup");
          return;
        }
        // console.log("Email exists!");
        setEmailExistsFlag(true);
      });
      return;
    }

    // If Email exists then try login
    if (emailExistsFlag) {
      groflexService.login(email, password).then((res) => {
        if (res.meta.email) {
          setFormErrors({ ...formErrors, emailError: "Email not found" });
          return;
        } else if (res.meta.password) {
          setFormErrors({ ...formErrors, passwordError: "Password is wrong" });
          return;
        }

        // Set Token, and login time in localstorage
        webstorageService.setItem(
          webStorageKeyEnum.LOGIN_TOKEN_KEY,
          res.data.token
        );
        webstorageService.setItem(
          webStorageKeyEnum.LOGIN_TOKEN_START_TIME,
          new Date().getTime()
        );

        groflexService
          .request(config.resourceUrls.tenant, {
            auth: true,
          })
          .then((res) => {
            dispatch({
              type: actionTypes.SET_TENANT_DATA,
              payload: res.data,
            });
          })
          .then(() => {
            groflexService
              .request(config.resourceUrls.user, {
                auth: true,
              })
              .then((res) => {
                dispatch({
                  type: actionTypes.SET_USER_DATA,
                  payload: res.data,
                });
              });
          })
          .then(() => {
            groflexService
              .request(config.resourceUrls.accountSettings, {
                auth: true,
              })
              .then((res) => {
                console.log(res.data);
                dispatch({
                  type: actionTypes.SET_ACCOUNTINFO_DATA,
                  payload: res.data,
                });
                navigate("/");
              });
          });
      });
    }
  };

  // console.log(email, password);
  return (
    <div className="auth-wrapper is-dark">
      <div className="modern-login">
        <div className="underlay h-hidden-mobile h-hidden-tablet-p"></div>

        <div className="columns is-gapless is-vcentered">
          {/* First column */}
          <div className="column is-relative is-7 h-hidden-mobile h-hidden-tablet-p">
            <div
              style={{
                backgroundImage: `url(${login_Bg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
              }}
              className="hero is-fullheight is-image"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                }}
              >
                <img
                  style={{
                    margin: "14px",
                    width: "180px",
                    objectFit: "cover",
                  }}
                  src={groflex_logo_transparent}
                  alt="logo"
                />
                <div
                  className="carousel-container"
                  style={{ margin: "auto 0" }}
                >
                  <ReactSlickCarousel>
                    <div
                      style={{
                        height: "350px",
                      }}
                    >
                      <img
                        style={{
                          margin: "0 auto",
                          height: "350px",
                          objectFit: "contain",
                        }}
                        src={carousel1}
                        alt="carousel1"
                      />
                      <div
                        style={{
                          margin: "0 auto",
                          height: "150px",
                          width: "340px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <h2 className="is-bold is-5 title">
                          Best and Easiest Billing Software!
                        </h2>
                        <div>Create GST compliant invoices</div>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "350px",
                      }}
                    >
                      <img
                        style={{
                          margin: "0 auto",
                          height: "350px",
                          objectFit: "contain",
                        }}
                        src={carousel2}
                        alt="carousel2"
                      />
                      <div
                        style={{
                          margin: "0 auto",
                          height: "150px",
                          width: "340px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <h2 className="is-bold is-5 title">
                          Best and Easiest Billing Software!
                        </h2>
                        <div>Create GST compliant invoices</div>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "350px",
                      }}
                    >
                      <img
                        style={{
                          margin: "0 auto",
                          height: "350px",
                          objectFit: "contain",
                        }}
                        src={carousel3}
                        alt="carousel3"
                      />
                      <div
                        style={{
                          margin: "0 auto",
                          height: "150px",
                          width: "340px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <h2 className="is-bold is-5 title">
                          Best and Easiest Billing Software!
                        </h2>
                        <div>Create GST compliant invoices</div>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "350px",
                      }}
                    >
                      <img
                        style={{
                          margin: "0 auto",
                          height: "350px",
                          objectFit: "contain",
                        }}
                        src={carousel4}
                        alt="carousel4"
                      />
                      <div
                        style={{
                          margin: "0 auto",
                          height: "150px",
                          width: "340px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <h2 className="is-bold is-5 title">
                          Best and Easiest Billing Software!
                        </h2>
                        <div>Create GST compliant invoices</div>
                      </div>
                    </div>
                  </ReactSlickCarousel>
                </div>
              </div>
            </div>
          </div>

          {/* Second column */}
          <div className="column is-5 is-relative">
            <div className="is-form">
              <AdvancedCard
                type={"r-card"}
                footer={emailExistsFlag ? false : true}
                footerContentCenter={
                  emailExistsFlag ? null : (
                    <div style={{ margin: "10px 50px", textAlign: "center" }}>
                      <div>By signing up, you agree to our</div>
                      <Link
                        to={"/login"}
                        className="text-primary title is-6"
                        style={{ cursor: "pointer" }}
                      >
                        Terms & Privacy
                      </Link>
                    </div>
                  )
                }
              >
                <h2
                  style={{ textAlign: "center", margin: "20px 0" }}
                  className="title is-4 is-bold"
                >
                  {emailExistsFlag ? "Welcome back" : "Welcome to Groflex"}
                </h2>
                <div style={{ margin: "20px 0" }} className="field">
                  <form
                    id="login-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    <label>
                      <p>Email</p>
                    </label>
                    <Input
                      helpText={formErrors.emailError}
                      hasError={formErrors.emailError}
                      hasValidation
                      name="email"
                      onChange={handleEmailChange}
                      placeholder={"Enter email"}
                      type={"email"}
                      value={email}
                    />
                    {emailExistsFlag ? (
                      <>
                        <label>
                          <p>Password</p>
                        </label>
                        <InputAddons
                          hasValidation
                          hasError={formErrors.passwordError}
                          helpText={formErrors.passwordError}
                          // right={<FeatherIcon name={"Eye"} />}
                          hasShowPassword
                          name="password"
                          onChange={handlePasswordChange}
                          placeholder={"Enter password"}
                          type="password"
                          value={password}
                        />
                      </>
                    ) : null}
                  </form>
                </div>
                {emailExistsFlag ? (
                  <div
                    style={{
                      margin: "20px 0",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="field"
                  >
                    <Checkbox
                      isOutlined
                      isSuccess
                      onChange={() => {
                        setRememberMe(!rememberMe);
                      }}
                      checked={rememberMe}
                      value={rememberMe}
                      label={"Remember me"}
                      labelStyle={{ padding: "0" }}
                    />

                    <h2
                      style={{ cursor: "pointer", color: "#00A353" }}
                      className="title is-bold is-6"
                    >
                      Forgot Password?
                    </h2>
                  </div>
                ) : null}

                <Button
                  style={{ margin: "20px 0" }}
                  isFullWidth
                  isLight={!email}
                  isSuccess={email}
                  onClick={handleLogin}
                >
                  {emailExistsFlag ? "Login" : "Login / Register"}
                </Button>

                {emailExistsFlag ? null : (
                  <>
                    <div
                      className="divider_with_message"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          backgroundColor: "#00A353",
                          height: "1px",
                          width: "100%",
                        }}
                      />
                      <div style={{ margin: "0 23px" }}>Or</div>
                      <div
                        style={{
                          backgroundColor: "#00A353",
                          height: "1px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <Button
                      style={{
                        margin: "20px 0",
                        display: "flex",
                        alignItems: "center",
                      }}
                      icon={
                        <img
                          width={20}
                          height={20}
                          style={{ margin: "0 10px 0 0" }}
                          src={googleIcon}
                          alt="loginwithgoogle"
                        />
                      }
                      isFullWidth
                      isOutlined
                      isSuccess
                    >
                      Continue with Google
                    </Button>
                  </>
                )}
              </AdvancedCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
