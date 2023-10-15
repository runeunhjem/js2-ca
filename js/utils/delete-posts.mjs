import { API_BASE_URL, allPostsTags, loggedInUser, deletePostOptions } from "../variables/consts.mjs";
import { populateTagsSelector, filterUserTagsSelector } from "../feed-get-posts.js";

/**
 * Deletes a post if the logged-in user is authorized to do so.
 *
 * @param {string} postId - The unique identifier of the post to be deleted.
 * @returns {Promise<Object|null>} A Promise that resolves with the JSON response if successful; otherwise, null.
 */
export async function deletePost(postId) {
  const authorName = localStorage.getItem("authorName");

  // Check if the logged-in user matches the username from the URL
  if (loggedInUser === authorName) {
    const deleteURL = `${API_BASE_URL}/social/posts/${postId}`;
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
