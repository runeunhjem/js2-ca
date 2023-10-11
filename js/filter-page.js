// Get references to HTML elements
const filterFeedSelector = document.getElementById("filterFeedSelector"); // Selector for filtering by movie categories
const filterUserTagsSelector = document.getElementById("filterUserTagsSelector"); // Selector for filtering by user tags
const postsContainer = document.getElementById("feed-posts"); // Container for posts

// Function to filter posts based on the selected tag and selector
function filterPosts(selectedTag, selector) {
  // Convert the selected tag to lowercase for case-insensitive comparison
  selectedTag = selectedTag.toLowerCase();

  // Get all the post cards
  const postCards = postsContainer.querySelectorAll(".post-card");

  // Iterate through the post cards and apply the filter
  postCards.forEach((postCard) => {
    // Find the element with categories/tags text within the post card
    const categoriesElement = postCard.querySelector(".post-tags");

    // Check if the element with categories/tags text exists
    if (categoriesElement) {
      const categoriesText = categoriesElement.textContent;
      const postTags = categoriesText
        .replace("Categories:", "")
        .trim()
        .split(", ")
        .map((tag) => tag.trim().toLowerCase()); // Convert tags to lowercase

      // Check if the post has no tags
      if (selectedTag === "notags") {
        if (postTags.length === 1 && postTags[0] === "no categories available") {
          postCard.style.display = "block"; // Show the post
        } else {
          postCard.style.display = "none"; // Hide the post
        }
      } else {
        // Check if the post has the selected tag (case-insensitive)
        if (postTags.includes(selectedTag)) {
          postCard.style.display = "block"; // Show the post
        } else {
          postCard.style.display = "none"; // Hide the post
        }
      }
    }
  });
}


// Add event listeners to both filter selectors
filterFeedSelector.addEventListener("change", () => {
  const selectedTag = filterFeedSelector.value;
  filterPosts(selectedTag, filterFeedSelector);
});

filterUserTagsSelector.addEventListener("change", () => {
  const selectedTag = filterUserTagsSelector.value;
  filterPosts(selectedTag, filterUserTagsSelector);
});
