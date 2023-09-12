const API_BASE_URL = "https://api.noroff.dev";

let loggedInUser = localStorage.getItem("loggedInUser");
loggedInUser = "tester_tester"; // For testing purposes
let loggedInUserData;
let reactionsData;
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

// async function profileWithToken(url, options) {
  async function fetchProfileAndReactions() {
    try {
      // const response = await fetch(url, options);
      // const json = await response.json();

      // Fetch user profile data
      const profileResponse = await fetch(profileURL, fetchOptions);
      const profileJson = await profileResponse.json();

      // Fetch reactions data
      const reactionsResponse = await fetch(reactionsURL, fetchOptions);
      const reactionsJson = await reactionsResponse.json();

      localStorage.setItem("loggedInUserData", JSON.stringify(profileJson));
      localStorage.setItem("reactionsData", JSON.stringify(reactionsJson));

      // console.log(`Name 1: ${profileJson.name}`);
      // console.log(`Name 2: ${loggedInUser}`);

      loggedInUserData = {
        name: profileJson.name,
        email: profileJson.email,
        banner: profileJson.banner,
        avatar: profileJson.avatar,
        following: profileJson.following,
        followers: profileJson.followers,
        posts: profileJson.posts,
        _count: {
          followers: profileJson._count.followers,
          following: profileJson._count.following,
          posts: profileJson._count.posts,
        },
      };

      reactionsData = {
        reactions: reactionsJson.reactions,
        comments: reactionsJson.comments,
        _count: {
          reactions: reactionsJson._count.reactions,
          comments: reactionsJson._count.comments,
        },
      };
      console.log(reactionsData);
      // console.log("1 :", loggedInUserData.email);
      // console.log(loggedInUserData);
    } catch (error) {
      console.error(error);
    }
    // console.log(`loggedInUserData: `, loggedInUserData);
  }

// profileWithToken(profileURL, fetchOptions);
fetchProfileAndReactions();
