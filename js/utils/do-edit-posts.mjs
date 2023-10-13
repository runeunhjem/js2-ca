import { API_BASE_URL, allPostsTags, loggedInUser, token, currentProfileName, authorName, postId } from "../variables/consts.mjs";
import { populateTagsSelector, filterUserTagsSelector } from "../feed-get-posts.js";

// const postId = localStorage.getItem("postId");
const editURL = `${API_BASE_URL}/social/posts/${postId}`;
export async function editPost(editPostForm, postId, movieTitle, movieCover, tags, newPostBody, authorName) {

  if (editPostForm) {
    const authorName = localStorage.getItem("authorName");

    if (loggedInUser === authorName) {
      try {
        const editPostData = {
          title: movieTitle,
          body: newPostBody,
          // tags: tags,
          tags: tags.split(",").map((tag) => tag.trim()),
          media: movieCover,
        };
        const response = await fetch(editURL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editPostData),
        });

        console.log("editURL:", editURL);
       if (response.status >= 200 && response.status <= 299) {

         await populateTagsSelector(allPostsTags, filterUserTagsSelector);
         window.location.reload();
       } else {
         console.error("Edit Post failed. You can only edit your own posts.");
         alert("You can only edit your own posts, but it could just be an invalid image URL. Check and try again.");
       }
      } catch (error) {
        console.error("An error occurred during post editing:", error);
      }
    } else {
      console.error("User is not authorized to edit.");
    }
  } else {
    console.error("Edit form does not exist.");
  }
}
