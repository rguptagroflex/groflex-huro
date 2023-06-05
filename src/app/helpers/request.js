import config from "../../../config";
import webStorageKeyEnum from "../enums/web-storage-key.enum";
import WebStorageService from "../services/webstorage.service";
import store from "../redux/store";

const environment = "local";
const localHost = "http://localhost:18000/serverconnect?url=";
let token = store?.getState()?.appData?.loginToken;

const getEndpoint = (endpoint) => {
  return environment === "local" ? `${localHost}${endpoint}` : endpoint;
};

store.subscribe(() => {
  token = store?.getState()?.appData?.loginToken;
});

export const request = (endpoint, options) => {
  if (!options?.auth || !token) {
    console.error("No token provided for request");
    return new Promise((resolve, reject) => {});
  }

  // This options object is to be sent to the fetch function
  const fetchOptions = {
    method: options.method || "GET",
    headers: options.headers || { "Content-Type": "application/json" },
    url: endpoint,
  };

  fetchOptions.headers.Authorization = `Bearer ${token}`;
  if (fetchOptions.method !== "GET" && !!options.data) {
    fetchOptions.body = JSON.stringify(options.data);
  }

  // Local only accepts POST requests but the options body can be any method
  if (environment === "local") {
    console.log(endpoint, fetchOptions);
    const defaultLocalhostOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchOptions),
    };
    return new Promise((resolve, reject) => {
      fetch(`${localHost}${endpoint}`, defaultLocalhostOptions).then(
        (response) => {
          if (response.ok) {
            response.json().then((data) => {
              resolve(data);
            });
          } else {
            reject(response);
          }
        }
      );
    });
  } else {
    // on non local environment
    return new Promise((resolve, reject) => {
      fetch(endpoint, fetchOptions).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            resolve(data);
          });
        } else {
          reject(response);
        }
      });
    });
  }
};

export const login = (email, password) => {
  if (environment === "local") {
    return new Promise((resolve, reject) => {
      fetch(getEndpoint(config.login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
          url: config.login,
        }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            resolve(data);
          });
        } else {
          reject(response);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      fetch(getEndpoint(config.login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            resolve(data);
          });
        } else {
          reject(response);
        }
      });
    });
  }
};

export const logout = () => {
  WebStorageService.removeItem(webStorageKeyEnum.LOGIN_TOKEN_KEY);
  WebStorageService.removeItem(webStorageKeyEnum.LOGIN_TOKEN_START_TIME);
  location.assign("/login");
};
