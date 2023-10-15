import { createPostURL, postForm, addNewPostOptions, postsURL, fetchOptions } from "./variables/consts.mjs";
import { createNewPost } from "./utils/create-new-post.mjs";
import { getFeedPostsWithToken } from "./feed-get-posts.js";

const submitButton = document.getElementById("create-new-post");

/**
 * Event handler for the submission of a new post form. This function performs the following actions:
 * 1. Prevents the default form submission behavior.
 * 2. Retrieves user input data from form fields.
 * 3. Constructs the data for creating a new post.
 * 4. Submits the new post data to the server.
 * 5. Updates the appearance of the submission button to indicate success.
 * 6. Refreshes the feed to display the newly added post.
 * 7. Resets the form fields and reverts the button to its original state after a delay.
 *
 * @param {Event} event - The submit event object.
 * @returns {Promise<void>}
 */
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

  submitButton.classList.remove("btn-warning"); // Remove the default Bootstrap primary class
  submitButton.classList.add("btn-success"); // Add the Bootstrap success class for green background
  submitButton.classList.add("text-white"); // Add text-white class for white text

  // Refresh the feed posts to include the newly added postv
  await getFeedPostsWithToken(postsURL, fetchOptions);
  setTimeout(() => {
    // Reset the button to its original state
    submitButton.classList.remove("btn-success");
    submitButton.classList.remove("text-white");
    submitButton.classList.add("btn-warning");
    submitButton.classList.add("text-dark");
    submitButton.disabled = false;

    // Hide the form
    const createPostForm = document.getElementById("createPostForm");
    createPostForm.classList.remove("show");
  }, 1200); // Reset after 2 seconds (adjust as needed)

  postForm.reset();
});

