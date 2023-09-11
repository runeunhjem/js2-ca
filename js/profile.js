const API_BASE_URL = "https://api.noroff.dev";

let loggedInUser = localStorage.getItem("loggedInUser");
let loggedInUserData;
const profileURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}`;

const token = localStorage.getItem("accessToken");
const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

async function profileWithToken(url, options) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    localStorage.setItem("loggedInUserData", JSON.stringify(json));

    // console.log(`Name 1: ${json.name}`);
    // console.log(`Name 2: ${loggedInUser}`);

    loggedInUserData = {
      name: json.name,
      email: json.email,
      banner: json.banner,
      avatar: json.avatar,
      _count: {
        followers: json._count.followers,
        following: json._count.following,
        posts: json._count.posts,
      },
    };

    // console.log("1 :", loggedInUserData.email);
    // console.log(loggedInUserData);

  } catch (error) {
    console.error(error);
  }
  // console.log(`loggedInUserData: `, loggedInUserData);
}

profileWithToken(profileURL, fetchOptions);

