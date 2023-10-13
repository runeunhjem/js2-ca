import { API_BASE_URL, allPostsTags, loggedInUser, deletePostOptions } from "../variables/consts.mjs";
import { populateTagsSelector, filterUserTagsSelector } from "../feed-get-posts.js";
// Function to delete a post
export async function deletePost(postId) {
  // const postId = localStorage.getItem("postId");
  const authorName = localStorage.getItem("authorName");
  // Check if the logged-in user matches the username from the URL
  if (loggedInUser === authorName) {
    const deleteURL = `${API_BASE_URL}/social/posts/${postId}`; // Include postId in the URL
    try {
      const response = await fetch(deleteURL, deletePostOptions);
      const json = await response.json();

      if (response.status >= 200 && response.status <= 299) {
        populateTagsSelector(allPostsTags, filterUserTagsSelector);
        window.location.reload();

        return json;
      } else {
        // Display a message indicating that only the post owner can delete the post
        alert("You can only delete your own posts.");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
