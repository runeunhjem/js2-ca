import { API_BASE_URL, loggedInUser, currentProfileName, deletePostOptions } from "../variables/consts.mjs";

// Function to delete a post
export async function deletePost(postId) {
  // const postId = localStorage.getItem("postId");
  const authorName = localStorage.getItem("authorName");
  // Check if the logged-in user matches the username from the URL
  if (loggedInUser === authorName) {
    console.log(`postId: ${postId}`);
    console.log(`authorName: ${authorName}`);
    const deleteURL = `${API_BASE_URL}/social/posts/${postId}`; // Include postId in the URL
    console.log(`deleteURL: ${deleteURL}`);
    try {
      const response = await fetch(deleteURL, deletePostOptions);
      const json = await response.json();
      // console.log("profileData is:", JSON.stringify(json, null, 2));

      if (response.status >= 200 && response.status <= 299) {
        console.log("Post successfully deleted!");
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
