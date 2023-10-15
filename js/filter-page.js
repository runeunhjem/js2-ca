const filterFeedSelector = document.getElementById("filterFeedSelector"); // Selector for filtering by movie categories
const filterUserTagsSelector = document.getElementById("filterUserTagsSelector"); // Selector for filtering by user tags
const postsContainer = document.getElementById("feed-posts");

// Function to filter posts based on the selected tag and selector
/**
 * Filter posts based on the selected tag and selector.
 * @param {string} selectedTag - The selected tag to filter posts.
 * @param {HTMLSelectElement} selector - The selector element used for filtering.
 */
export function filterPosts(selectedTag, selector) {

  // Convert the selected tag to lowercase for case-insensitive comparison
  selectedTag = selectedTag.toLowerCase();
  let postsLeft = 0;
  let noTagsCount = 0;

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
        .map((tag) => tag.trim().toLowerCase());

      // Check if the post has no tags
      if (selectedTag === "notags") {
        if (postTags.length === 1 && postTags[0] === "no categories available") {
          postCard.style.display = "block";
          noTagsCount++;
        } else {
          postCard.style.display = "none";
        }
      } else {
        // Check if the post has the selected tag (case-insensitive), considering the "#" symbol
        if (postTags.some((tag) => (tag.startsWith("#") ? tag.slice(1) === selectedTag : tag === selectedTag))) {
          postCard.style.display = "block";
          postsLeft++;
        } else {
          postCard.style.display = "none";
        }
      }
    }
  });
  const mainHeader = document.querySelector(".main-header");
  mainHeader.classList.add("text-success", "fs-5");
  mainHeader.classList.remove("text-dark", "fs-3");

  if (selectedTag === "notags") {
    mainHeader.innerHTML = `${noTagsCount} posts with no tags`;
  } else {
    mainHeader.innerHTML = `${postsLeft} results for ${selectedTag}`;
  }
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
