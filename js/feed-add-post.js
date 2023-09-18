// import { API_BASE_URL, createPostURL } from "./consts.js";
import { createPostURL } from "./variables/consts.js";
// import { token } from "./consts.js";
import { addNewPosthOptions } from "./variables/consts.js";
// const API_BASE_URL = "https://api.noroff.dev";
// const createPostURL = `${API_BASE_URL}/api/v1/social/posts`;

// const newPostData = {
//   title: "My New Post", // Required
//   body: "This is the body of my new post.", // Optional
//   tags: ["Movies", "Actors"], // Optional
//   media: "https://url.comhttps://picsum.photos/id/237/200/300", // Optional
// };

// const token = localStorage.getItem("accessToken");
// const addNewPosthOptions = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify(newPostData),
// };
import  { createNewPost } from "../js/utils/feed.js";
// async function createNewPost(url, options) {
//   try {
//     const response = await fetch(url, options);
//     if (response.ok) {
//       const newPost = await response.json();
//       console.log("New Post Created: ", newPost);
//     } else {
//       console.error("Failed to create a new post");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// ************** Create a new post **************
// ****************** ON CLICK *******************
// createNewPost(createPostURL, addNewPosthOptions);
