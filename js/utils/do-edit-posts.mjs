import { API_BASE_URL, loggedInUser, token, currentProfileName, editURL, postId } from "../variables/consts.mjs";

// Select all elements with the class "edit-post"
const editPostForms = document.querySelectorAll(".edit-post");
const card = document.querySelector(".post-card");
// Iterate over each edit-post form
editPostForms.forEach((editPostForm) => {
  const movieTitleInput = editPostForm.querySelector(".movie-title-input");
  const movieCoverInput = editPostForm.querySelector(".movie-cover-input");
  const tagsInput = editPostForm.querySelector(".tags-input");
  const newPostBodyTextarea = editPostForm.querySelector(".new-post-body-textarea");
  const doEditButton = editPostForm.querySelector(".do-edit-button");
  const closeEditButton = editPostForm.querySelector(".close-edit-button");

  // Add an event listener for the submit button
  doEditButton.addEventListener("click", async () => {
    // Get the values from the input fields
    const movieTitle = movieTitleInput.value;
    const movieCover = movieCoverInput.value;
    const tags = tagsInput.value;
    const newPostBody = newPostBodyTextarea.value;

    // Perform the update/PUT operation with these values
    const postId = editPostForm.getAttribute("data-post-id");
    const authorName = card.authorName.getAttribute("data-authorname");
    editPost(editPostForm, postId, movieTitle, movieCover, tags, newPostBody, authorName);

    // After the update is complete, you may want to hide the edit form again
    editPostForm.classList.add("d-none");
  });

  closeEditButton.addEventListener("click", () => {
    editPostForm.classList.add("d-none");
    // The "card" variable used here needs to be defined appropriately
    // card.scrollIntoView({ behavior: "smooth" });
  });
});

// Define the editPost function
export async function editPost(editPostForm, postId, movieTitle, movieCover, tags, newPostBody, authorName) {
  // Check if editPostForm exists
  if (editPostForm) {
    console.log("Edit form exists.");
    const authorName = localStorage.getItem("authorName");
    // const authorName = editPostForm.querySelector(".card-title").value;
    // data - authorname;
    // const authorName = card.authorName.getAttribute("data-authorname");
    // authorName = card.authorName.getAttribute("data-authorname");
    // console.log(`Author Name: ${authorName}`);

    if (loggedInUser === authorName) {
      console.log("User is authorized to edit.");
      try {
        const editPostData = {
          title: movieTitle,
          body: newPostBody,
          // tags: tags,
          tags: tags.split(",").map((tag) => tag.trim()),
          media: movieCover,
        };
        console.log("Edit Post Data: ", editPostData);

        const response = await fetch(editURL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editPostData),
        });

        console.log("Edit Response Status: ", response.status);

        if (response.status >= 200 && response.status <= 299) {
          console.log("Post successfully edited!");
          window.location.reload();
        } else {
          console.error("Edit Post failed. You can only edit your own posts.");
          alert("You can only edit your own posts.");
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
