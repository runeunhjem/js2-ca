// loggedInUserToLocaleStorage.js

// Import the viewedProfileName from your consts.js
import { API_BASE_URL, fetchOptions, loggedInUser, viewedProfileName } from "./variables/consts.js";
console.log(`typeof viewedProfileName: ${typeof viewedProfileName}`);
let loggedInUserData;
let reactionsAndCommentsURL;
let profileURL; // Define profileURL here

// Define the URLs
if (viewedProfileName !== "invalid") {
  profileURL = `${API_BASE_URL}/api/v1/social/profiles/${viewedProfileName}?_following=true&_followers=true&_posts=true`;
  // profileURL = `${API_BASE_URL}/api/v1/social/profiles/runeunhjem?_following=true&_followers=true&_posts=true`;
  reactionsAndCommentsURL = `${API_BASE_URL}/api/v1/social/profiles/${viewedProfileName}?_reactions=true&_comments=true&_count=true`;
  // reactionsAndCommentsURL = `${API_BASE_URL}/api/v1/social/profiles/runeunhjem?_reactions=true&_comments=true&_count=true`;
} else {
  profileURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_following=true&_followers=true&_posts=true`;
  reactionsAndCommentsURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_reactions=true&_comments=true&_count=true`;
}
console.log(`profileURL: ${profileURL}`);
console.log(`reactionsAndCommentsURL: ${reactionsAndCommentsURL}`);

async function fetchUserProfile() {
  try {
    // Fetch user profile and reactions/comments data in parallel
    const [profileResponse, reactionsAndCommentsResponse] = await Promise.all([
      fetch(profileURL, fetchOptions),
      fetch(reactionsAndCommentsURL, fetchOptions),
    ]);

    // Parse the responses
    const profileJson = await profileResponse.json();
    console.log("profileResponse:", profileResponse);
    console.log("profileJson:", profileJson);

    const reactionsAndCommentsJson = await reactionsAndCommentsResponse.json();

    // Check if profileJson is valid
    if (!profileJson || !profileJson.posts) {
      console.error("Profile data is missing or invalid.");
      return;
    }

    // Organize reactions and comments under the respective posts
    const postsWithReactionsAndComments = profileJson.posts.map((post) => {
      const postID = post.id;
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
    console.log(`postsWithReactionsAndComments: ${postsWithReactionsAndComments}`);

    // Update the loggedInUserData with organized data
    loggedInUserData = {
      ...profileJson,
      posts: postsWithReactionsAndComments,
    };

    // Store the updated loggedInUserData in localStorage

    // Store viewedProfileNameDetails separately in localStorage
    if (viewedProfileName !== "invalid") {
      localStorage.setItem("loggedInUserData", JSON.stringify(loggedInUserData));
      localStorage.setItem("viewedProfileNameDetails", JSON.stringify(profileJson));
    } else {
      localStorage.setItem("viewedProfileNameDetails", JSON.stringify(loggedInUserData));
    }
  } catch (error) {
    console.error(error);
  }
}

fetchUserProfile();
