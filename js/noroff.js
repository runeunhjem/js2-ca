// ------------ J W T ------------
const API_BASE_URL = "https://api.noroff.dev";

// End points:
// Register: /api/v1/social/auth/register
// Login: /api/v1/social/auth/login
// Posts - All ebtries: /api/v1//social/posts

//----------------------Registers user----------------------

/**
 *
 * @param {string} url
 * @param {any} user
 * ```js
 * registerUser(registerURL, user);
 * ```
 * @returns
 */
async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}
// ------------ User data on the noroff social media platform ------------
const user = {
  name: "runeunhjem",
  email: "rununh17678@stud.noroff.no",
  password: "runhjem4",
};
const registerURL = `${API_BASE_URL}/api/v1/social/auth/register`;

// registerUser(registerURL, user);

//-------------------------------

//----------------------Login user----------------------

async function loginUser(url, userData) {
  try {
    // console.log(url, userData);
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    // console.log("AccessToken is: " + json.accessToken);
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return json;
  } catch (error) {
    console.log(error);
  }
}

const userToLogin = {
  // This should come from the login form
  email: "rununh17678@stud.noroff.no",
  password: "runhjem4",
};
console.log(API_BASE_URL);
const loginURL = `${API_BASE_URL}/api/v1/social/auth/login`;

loginUser(loginURL, userToLogin); // You would only call this when clicking the login button in the form
//-------------------------------

// //----------------------Request with token----------------------

// const postsURL = `${API_BASE_URL}/api/v1/social/posts`;
// const token = localStorage.getItem("accessToken");
// const fetchOptions = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// };
// async function getWithToken(url, options) {
//   try {
//     const response = await fetch(url, options);
//     console.log(response);
//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getWithToken(postsURL, fetchOptions);
