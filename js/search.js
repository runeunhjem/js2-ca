import { fetchOptions, searchURL } from "./variables/consts.mjs";
import { createPostCard } from "./utils/feed.mjs";

// Function to handle search
async function handleSearch(event) {
  event.preventDefault();
  const query = document.querySelector('input[name="searchQuery"]').value;

  try {
    const response = await fetch(searchURL, fetchOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postsResult = await response.json();
    console.log("postsResult:", postsResult);
    const searchResults = postsResult.filter((post) => {
      // Customize this search logic based on your data structure
      const searchString = post.title + post.body + post.tags.join(" ") + post.author.name;
      return searchString.toLowerCase().includes(query.toLowerCase());
    });

    displaySearchResults(searchResults);
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
  }
}

// Function to display search results
function displaySearchResults(results) {
   const feedPosts = document.getElementById('feed-posts');

   // Clear previous search results
   feedPosts.innerHTML = '';
  console.log("results:", results);
   if (results.length === 0) {
      // Display a message when there are no results
      feedPosts.innerHTML = '<p>No results found.</p>';
   } else {
      // Create and append post cards for each search result
      results.forEach((result) => {
         const postCard = createPostCard(result);
         feedPosts.appendChild(postCard);
      });
   }
}

// Event listener for the search form
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (search) => {
  search.preventDefault();

  const searchInput = document.getElementById("searchInput");
  handleSearch(search);

  searchInput.value = "";
});
