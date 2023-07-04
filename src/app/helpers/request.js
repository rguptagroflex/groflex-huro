import config from "../../../config";
import webStorageKeyEnum from "../enums/web-storage-key.enum";
import WebStorageService from "../services/webstorage.service";

const environment = "local";
const localHost = "http://localhost:18000/serverconnect?url=";

const getEndpoint = (endpoint) => {
  return environment === "local" ? `${localHost}${endpoint}` : endpoint;
};

export const login = (email, password) => {
  if (environment === "local") {
    return new Promise((resolve, reject) => {
      fetch(getEndpoint(config.resourceUrls.login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
          url: config.resourceUrls.login,
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
      fetch(getEndpoint(config.resourceUrls.login), {
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

export const request = (endpoint, options) => {
  let token = options.token
    ? options.token
    : WebStorageService.getItem(webStorageKeyEnum.LOGIN_TOKEN_KEY);
  // console.log(token, options.auth);

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
    // console.log(endpoint, fetchOptions);
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

export const checkEmailExist = (email, password = "lSlSlS@3") => {
  if (environment === "local") {
    return new Promise((resolve, reject) => {
      fetch(getEndpoint(config.resourceUrls.login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
          url: config.resourceUrls.login,
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
      fetch(getEndpoint(config.resourceUrls.login), {
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


// export const checkEmailExist = (email) => {
//   if (environment === "local") {
//     return new Promise((resolve, reject) => {
//       fetch(
//         getEndpoint(
//           `${config.resourceUrls.checkEmailExist}?` +
//             new URLSearchParams({
//               email,
//             })
//         ),
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             headers: { "Content-Type": "application/json" },
//             method: "GET",
//             url: config.resourceUrls.checkEmailExist,
//           }),
//         }
//       ).then((response) => {
//         if (response.ok) {
//           response.json().then((data) => {
//             resolve(data);
//           });
//         } else {
//           reject(response);
//         }
//       });
//     });
//   } else {
//     return new Promise((resolve, reject) => {
//       fetch(
//         getEndpoint(
//           `${config.resourceUrls.checkEmailExist}?` +
//             new URLSearchParams({
//               email,
//             })
//         ),
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       ).then((response) => {
//         if (response.ok) {
//           response.json().then((data) => {
//             resolve(data);
//           });
//         } else {
//           reject(response);
//         }
//       });
//     });
//   }
// };
