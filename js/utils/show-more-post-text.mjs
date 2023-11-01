/**
 * Toggles the visibility of the full post content by expanding or collapsing it.
 *
 * @param {Event} event - The click event object.
 */
export function togglePostContent(event) {
  const postCard = event.target.closest(".card"); // Find the closest card element
  const postContent = postCard.querySelector(".card-text .hidden-content"); // Adjust the selector
  const showMoreButton = postCard.querySelector(".show-more-button");

  // Show or hide the content
  if (postContent.style.maxHeight) {
    // Content is currently hidden, so show it
    postContent.style.maxHeight = null;
    showMoreButton.textContent = "... Show More";
    postContent.classList.remove("d-none");
  } else {
    // Content is currently visible, so hide it
    showMoreButton.textContent = "... Show Less";
    postContent.classList.add("d-none");
    postContent.style.maxHeight = "100%"; // Expand to full height
  }
}
