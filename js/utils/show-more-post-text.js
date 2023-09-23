// Function to toggle the visibility of the full post content
export function togglePostContent(event) {
  const postCard = event.target.closest(".card"); // Find the closest card element
  const postContent = postCard.querySelector(".card-text .full-content"); // Adjust the selector
  const showMoreButton = postCard.querySelector(".show-more-button");

  if (postContent.style.maxHeight) {
    // Content is currently hidden, so show it
    postContent.style.maxHeight = null;
    showMoreButton.textContent = "Show Less";
  } else {
    // Content is currently visible, so hide it
    postContent.style.maxHeight = "100%"; // Expand to full height
    showMoreButton.textContent = "Show More";
  }
}

// // Add click event listener to the "Show More" button in each card
// const showMoreButtons = document.querySelectorAll(".show-more-button");
// showMoreButtons.forEach((button) => {
//   button.addEventListener("click", togglePostContent);
// });
