// import { createPostURL, postForm, addNewPostOptions, postsURL, fetchOptions } from "../variables/consts.mjs";
// import { createNewPost } from "./create-new-post.mjs";
// import { getFeedPostsWithToken } from "../feed-get-posts.js";
import { API_BASE_URL, loggedInUser, currentProfileName, editURL, editPostOptions } from "../variables/consts.mjs";

// Function to edit a post
const editPostForm = document.getElementById("editPostForm");
if (editPostForm) {
  const editPostForm = document.getElementById("editPostForm");
  const movieTitle = document.getElementById("title").value;
  const movieCover = document.getElementById("media").value;
  const tags = document.getElementById("tags").value;
  const newPostBody = document.getElementById("newPostBody").value;

  const editPostData = {
    title: movieTitle,
    body: newPostBody,
    tags: tags.split(",").map((tag) => tag.trim()), // Split tags into an array if they are comma-separated and remove whitespace
    media: movieCover,
  };

  editPostOptions.body = JSON.stringify(editPostData);
}

export async function editPost(postId) {
  // const postId = localStorage.getItem("postId");

  const authorName = document.querySelector(".card-title").textContent.trim();
  // const authorName = localStorage.getItem("authorName");
  // Check if the logged-in user matches the username from the URL
  if (loggedInUser === authorName) {
    console.log(`postId: ${postId}`);
    console.log(`authorName: ${authorName}`);
    // const editURL = `${API_BASE_URL}/social/posts/${postId}`; // Include postId in the URL
    console.log(`editURL: ${editURL}`);
    try {
      console.log("editPostOptions: ", editPostOptions);
      const response = await fetch(editURL, editPostOptions);
      const json = await response.json();
      // console.log("profileData is:", JSON.stringify(json, null, 2));

      if (response.status >= 200 && response.status <= 299) {
        console.log("Post successfully edited!");
        window.location.reload();
        return json;
      } else {
        // Display a message indicating that only the post owner can delete the post
        alert("You can only edit your own posts.");
      }
    } catch (error) {
      console.error(error);
    }
  }
}


// postForm.addEventListener("submit", async function (event) {
//   event.preventDefault();

  // const movieTitle = document.getElementById("title").value;
  // const movieCover = document.getElementById("media").value;
  // const tags = document.getElementById("tags").value;
  // const newPostBody = document.getElementById("newPostBody").value;

  // const newPostData = {
  //   title: movieTitle,
  //   body: newPostBody,
  //   tags: tags.split(",").map((tag) => tag.trim()), // Split tags into an array if they are comma-separated and remove whitespace
  //   media: movieCover,
  // };

  // addNewPostOptions.body = JSON.stringify(newPostData);

//   console.log("Form submitted!");

//   // Wait for new post to complete before fetching posts again
//   await createNewPost(createPostURL, addNewPostOptions);

//   // Refresh the feed posts to include the newly added postv
//   await getFeedPostsWithToken(postsURL, fetchOptions); // Fungerer ikke som jeg vil - Må gjøre om på dette - feed blir ikke refreshet

//   postForm.reset();
// });
