import React from "react";
import invoiz from "services/invoiz.service";
import { Redirect, Route } from "react-router-dom";
import config from "oldConfig";
import { getResource } from "./resource";

const ROUTE_DASHBOARD = "/";
const ROUTE_LOGIN = "/account/login";

const getTitle = (resourceKey) => {
  const routeTitle = getResource("routesTitle");
  const componentTitle = routeTitle[resourceKey];
  return componentTitle
    ? `${componentTitle} - ${config.documentTitleSuffix}`
    : config.documentTitleSuffix;
};

export function PrivateRoute({ component: Component, ...rest }) {
  document.title = getTitle(rest.resourceKey);
  return (
    <Route
      {...rest}
      render={(props) => {
        invoiz.trigger("menuItemChanged", {
          menuItem: rest.menuItem,
          submenuItem: rest.submenuItem,
        });

        return invoiz.user.loggedIn ? (
          <div className={`page main ${rest.pageClass || ""}`}>
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{
              pathname: ROUTE_LOGIN,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

export function PublicRoute({ component: Component, ...rest }) {
  document.title = getTitle(rest.resourceKey);
  const isRegisterLegalForm =
    rest.computedMatch &&
    rest.computedMatch.params &&
    rest.computedMatch.params.viewState &&
    (rest.computedMatch.params.viewState === "legalform" ||
      rest.computedMatch.params.viewState === "mobile" ||
      rest.computedMatch.params.viewState === "businesstype" ||
      rest.computedMatch.params.viewState === "businessturnover" ||
      rest.computedMatch.params.viewState === "businesscategory" ||
      rest.computedMatch.params.viewState === "mobileotp");
  // rest.computedMatch.params.viewState === 'mobile')

  const isRegistrationInvitation =
    rest.computedMatch &&
    rest.computedMatch.path &&
    rest.computedMatch.path.indexOf("/account/registration/invitation/") !== -1;

  const isRegisterEmailVerification =
    rest.computedMatch.params.viewState === "doi";

  const isAccountDelete =
    rest.computedMatch &&
    rest.computedMatch.path &&
    rest.computedMatch.path.indexOf("/account/delete/") !== -1;

  const isAccountEmailChange =
    rest.computedMatch &&
    rest.computedMatch.path &&
    rest.computedMatch.path.indexOf("/account/approvechangeemail/") !== -1;

  return (
    <Route
      {...rest}
      render={(props) =>
        !invoiz.user.loggedIn ||
        (invoiz.user.loggedIn &&
          (isRegisterLegalForm ||
            isRegistrationInvitation ||
            isAccountDelete ||
            isAccountEmailChange ||
            isRegisterEmailVerification)) ? (
          <div className="page">
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{
              pathname: ROUTE_DASHBOARD,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export class UnmatchedRoute extends React.Component {
  render() {
    return invoiz.user.loggedIn ? (
      <Redirect
        to={{
          pathname: ROUTE_DASHBOARD,
        }}
      />
    ) : (
      <Redirect
        to={{
          pathname: ROUTE_LOGIN,
        }}
      />
    );
  }
}
