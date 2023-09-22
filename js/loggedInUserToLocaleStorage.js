import { API_BASE_URL } from "./variables/consts.mjs";
// import { profileURL } from "./variables/consts.mjs";
// import { reactionsAndCommentsURL } from "./variables/consts.mjs";
// import { token } from "./variables/consts.mjs";
import { fetchOptions } from "./variables/consts.mjs";
// const API_BASE_URL = "https://api.noroff.dev";
import { loggedInUser } from "./variables/consts.mjs";
// let loggedInUser;
// loggedInUser = localStorage.getItem("loggedInUser");
// loggedInUser = "tester_tester"; // For testing purposes
// loggedInUser = "xyxy"; // For testing purposes
// loggedInUser = "Jarle"; // For testing purposes
// loggedInUser = "fridlo"; // For testing purposes
// loggedInUser = "Tonje"; // For testing purposes

// Define the URLs
const profileURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_following=true&_followers=true&_posts=true`;
const reactionsAndCommentsURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_reactions=true&_comments=true&_count=true`;

let loggedInUserData;

// const token = localStorage.getItem("accessToken");
// const fetchOptions = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// };

async function fetchUserProfile() {
  try {
    // Fetch user profile and reactions/comments data in parallel
    const [profileResponse, reactionsAndCommentsResponse] = await Promise.all([
      fetch(profileURL, fetchOptions),
      fetch(reactionsAndCommentsURL, fetchOptions),
    ]);

    // Parse the responses
    const profileJson = await profileResponse.json();
    const reactionsAndCommentsJson = await reactionsAndCommentsResponse.json();

    // Store the data in localStorage
    localStorage.setItem("loggedInUserData", JSON.stringify(profileJson));
    localStorage.setItem("reactionsAndComments", JSON.stringify(reactionsAndCommentsJson));

    // Organize reactions and comments under the respective posts
    const postsWithReactionsAndComments = profileJson.posts.map((post) => {
      // console.log("post:", post);
      const postID = post.id; // Assuming post.name represents the unique post ID
      // console.log(`postID: ${postID}`);
      const postReactionsAndComments = reactionsAndCommentsJson[postID];

      return {
        ...post,
        reactions: postReactionsAndComments ? postReactionsAndComments.reactions : [],
        comments: postReactionsAndComments ? postReactionsAndComments.comments : [],
        _count: {
          reactions: postReactionsAndComments ? postReactionsAndComments._count.reactions : 0,
          comments: postReactionsAndComments ? postReactionsAndComments._count.comments : 0,
        },
      };
    });

    // Update the loggedInUserData with organized data
    loggedInUserData = {
      ...profileJson,
      posts: postsWithReactionsAndComments,
    };

    // console.log("post:", post);
    // console.log("loggedInUserData:", loggedInUserData);
    // console.log("loggedInUserData.posts.id:", loggedInUserData.post); // THIS DON'T WORK ****************************************************
    // console.log("loggedInUserData.posts.reactions:", loggedInUserData.posts.reactions); // THIS DON'T WORK ****************************************************
    // Now you can work with the updated loggedInUserData
    // console.log("Updated loggedInUserData: ", loggedInUserData);

    // Store the updated loggedInUserData in localStorage
    localStorage.setItem("loggedInUserData", JSON.stringify(loggedInUserData));
  } catch (error) {
    console.error(error);
  }
}

fetchUserProfile();
