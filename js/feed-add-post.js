import { createPostURL, postForm, addNewPostOptions, postsURL, fetchOptions } from "./variables/consts.mjs";
import { createNewPost } from "./utils/create-new-post.mjs";
import { getFeedPostsWithToken } from "./feed-get-posts.js";

postForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const movieTitle = document.getElementById("title").value;
  const movieCover = document.getElementById("media").value;
  const tags = document.getElementById("tags").value;
  const newPostBody = document.getElementById("newPostBody").value;

  const newPostData = {
    title: movieTitle,
    body: newPostBody,
    tags: tags.split(",").map((tag) => tag.trim()), // Split tags into an array if they are comma-separated and remove whitespace
    media: movieCover,
  };

  addNewPostOptions.body = JSON.stringify(newPostData);

  // Wait for new post to complete before fetching posts again
  await createNewPost(createPostURL, addNewPostOptions);

  // Refresh the feed posts to include the newly added postv
  await getFeedPostsWithToken(postsURL, fetchOptions); // Fungerer ikke som jeg vil - Må gjøre om på dette - feed blir ikke refreshet

  postForm.reset();

});
