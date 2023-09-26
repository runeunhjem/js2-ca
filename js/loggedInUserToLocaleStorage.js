// import { API_BASE_URL, fetchOptions, reactionsAndCommentsURL, profilePostsURL } from "./variables/consts.mjs";
// const urlParams = new URLSearchParams(window.location.search);
// const userName = urlParams.get("name");
// const profileURL = `${API_BASE_URL}/social/profiles/${userName}?_following=true&_followers=true&_posts=true`;

// export async function fetchUserProfile() {
//   try {
//     // Fetch user profile, reactions/comments, and profile posts data in parallel
//     const [profileResponse, reactionsAndCommentsResponse, profilePostsResponse] = await Promise.all([
//       fetch(profileURL, fetchOptions),
//       fetch(reactionsAndCommentsURL, fetchOptions),
//       fetch(profilePostsURL, fetchOptions),
//     ]);

//     // Parse the responses
//     const profileJson = await profileResponse.json();
//     const reactionsAndCommentsJson = await reactionsAndCommentsResponse.json();
//     const profilePostsJson = await profilePostsResponse.json(); // Parse profile posts data

//     // Store the data in localStorage
//     if (!userName) {
//       localStorage.setItem("loggedInUserData", JSON.stringify(profileJson));
//     }
//     localStorage.setItem("reactionsAndComments", JSON.stringify(reactionsAndCommentsJson));
//     localStorage.setItem("profilePostsData", JSON.stringify(profilePostsJson)); // Store profile posts data

//     // Organize reactions and comments under the respective posts
//     const postsWithReactionsAndComments = profileJson.posts.map((post) => {
//       const postID = post.id; // Assuming post.id represents the unique post ID
//       const postReactionsAndComments = reactionsAndCommentsJson[postID];

//       return {
//         ...post,
//         reactions: postReactionsAndComments ? postReactionsAndComments.reactions : [],
//         comments: postReactionsAndComments ? postReactionsAndComments.comments : [],
//         _count: {
//           reactions: postReactionsAndComments ? postReactionsAndComments._count.reactions : 0,
//           comments: postReactionsAndComments ? postReactionsAndComments._count.comments : 0,
//         },
//       };
//     });

//     // Update the loggedInUserData with organized data
//     const loggedInUserData = {
//       ...profileJson,
//       posts: postsWithReactionsAndComments,
//     };

//     // Return the organized data if needed
//     return loggedInUserData;
//   } catch (error) {
//     console.error(error);
//     throw error; // Rethrow the error for error handling in the calling function
//   }
// }

// fetchUserProfile();
