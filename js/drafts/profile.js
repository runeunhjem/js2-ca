const API_BASE_URL = "https://api.noroff.dev";

let loggedInUser = localStorage.getItem("loggedInUser");
// loggedInUser = "tester_tester"; // For testing purposes
// loggedInUser = "xyxy"; // For testing purposes
// loggedInUser = "Jarle"; // For testing purposes
// loggedInUser = "fridlo"; // For testing purposes
loggedInUser = "Tonje"; // For testing purposes
let loggedInUserData;
const profileURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_following=true&_followers=true&_posts=true`;
const reactionsURL = `${API_BASE_URL}/api/v1/social/posts/${loggedInUser}?_reactions=true&_comments=true&_count=true`;

const token = localStorage.getItem("accessToken");
const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

// GET userdata with token
async function profileWithToken(url, options) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    localStorage.setItem("loggedInUserData", JSON.stringify(json));

    loggedInUserData = {
      name: json.name,
      email: json.email,
      banner: json.banner,
      avatar: json.avatar,
      following: json.following,
      followers: json.followers,
      posts: json.posts,
      _count: {
        followers: json._count.followers,
        following: json._count.following,
        posts: json._count.posts,
      },
    };

  } catch (error) {
    console.error(error);
  }
}

profileWithToken(profileURL, fetchOptions);
