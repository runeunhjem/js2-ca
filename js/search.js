import { populateTags } from "./feed-get-posts.js";
import { fetchOptions, searchURL, allPostsTags } from "./variables/consts.mjs";
import { createPostCard } from "./utils/feed.mjs";

let postsLeft = 0;
let limit = 100; // Get max 100 from API
let offset = 0; // Initialize the offset to 0
let query = ""; // Initialize the query variable

/**
 * Fetch all search results from the API based on the provided query.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {string} query - The search query.
 * @param {number} limit - The maximum number of posts to fetch.
 * @param {number} offset - The offset for pagination.
 * @returns {Promise<Array>} An array of search results.
 */
async function fetchAllSearchResults(url, query, limit, offset) {
  let allResults = [];
  let totalFetched = 0; // Track the total number of posts fetched

  try {
    // Fetch max 1500 posts
    while (totalFetched < 1500) {
      const response = await fetch(`${url}?limit=${limit}&offset=${offset}`, fetchOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Filter and append results that match the query and are not duplicates
      const searchResults = result.filter((post) => {
        const searchString = post.title + post.body + post.tags.join(" ") + post.author.name;
        return (
          searchString.toLowerCase().includes(query.toLowerCase()) &&
          !allResults.some((existingPost) => existingPost.id === post.id) // Check for duplicates
        );
      });

      allResults = allResults.concat(searchResults);
      totalFetched += result.length; // Update the total count of fetched posts

      offset += limit; // Increment the offset for the next page

      if (result.length < limit) {
        break; // No more matching results to fetch
      }
    }

    // Show the number of results in the main header
    const mainHeader = document.querySelector(".main-header");
    mainHeader.classList.add("text-success", "fs-5");
    mainHeader.classList.remove("text-dark");
    mainHeader.innerHTML = `${allResults.length} results for ${query}`;

    displaySearchResults(allResults, query); // Call displaySearchResults once after fetching all results
    return allResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

/**
 * Display the search results in the DOM.
 *
 * @param {Array} results - The search results to display.
 * @param {string} query - The search query.
 */
function displaySearchResults(results, query) {
  let feedPosts;
  if (window.location.pathname.includes("/post.html")) {
    // Set feedPosts for the post.html page
    feedPosts = document.getElementById("view-post");
  } else {
    // Set feedPosts for other pages
    feedPosts = document.getElementById("feed-posts");
  }
  feedPosts.innerHTML = "";

  if (results.length === 0) {
    displayNoResults();
  } else {
    // Create and append post cards for each search result
    results.forEach((result) => {
      const postCard = createPostCard(result);
      feedPosts.appendChild(postCard);
      allPostsTags.length = 0; // Clear the allPostsTags array

      results.forEach((post) => {
        const tags = post.tags || [];
        // Loop through the tags in the current post
        tags.forEach((tag) => {
          // Check if the tag is not already in the allPostsTags array
          if (!allPostsTags.includes(tag)) {
            // Add the tag to the allPostsTags array
            allPostsTags.push(tag);
          }
        });
      });
      populateTags(results); // Populate the allPostsTags array with tags from the fetched posts
    });

    // Update the postsLeft count after processing all results
    postsLeft = results.length;
    updateMainHeader(query);
  }
}

/**
 * Handle the search form submission.
 *
 * @param {Event} event - The form submission event.
 */
async function handleSearch(event) {
  event.preventDefault();
  const queryInput = document.querySelector('input[name="searchQuery"]');
  query = queryInput.value.toLowerCase(); // Update the query variable
  const spinner = document.querySelector(".spinner-border");
  spinner.classList.remove("d-none");
  spinner.classList.add("mt-4");
  const showSearching = document.getElementById("searching");
  showSearching.classList.add("d-block", "mt-3");
  showSearching.classList.remove("d-none");

  try {
    // Reset the postsLeft counter and offset for a new search
    postsLeft = 0;
    offset = 0;

    if (window.location.pathname.includes("/profile/")) {
      // Search is on the profile page
      filterProfilePosts(query);
    } else {
      // Search is on feed or post page
      await fetchAllSearchResults(searchURL, query, limit, offset);
    }
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
  } finally {
    spinner.classList.add("d-none");
    queryInput.value = "";
    showSearching.classList.add("d-none");
  }
}

/**
 * Filter and display profile posts based on the search query.
 *
 * @param {string} query - The search query.
 */
export async function filterProfilePosts(query) {
  const profilePosts = document.querySelectorAll(".post-card");
  let postsLeft = 0;

  // Filter and hide cards that do not match my search query
  Array.from(profilePosts).forEach((post) => {
    const titleElement = post.querySelector(".card-title");
    const movieTitleElement = post.querySelector(".movie-title");
    const bodyElement = post.querySelectorAll(".card-text");
    const tagsElement = post.querySelector(".post-tags");

    let searchString = "";

    // Add title to the search string if available
    if (titleElement) {
      searchString += titleElement.textContent.toLowerCase();
    }

    // Add movie title to the search string if available
    if (movieTitleElement) {
      searchString += movieTitleElement.textContent.toLowerCase();
    }

    // Add body to the search string if available
    if (bodyElement) {
      bodyElement.forEach((bodyElement) => {
        searchString += bodyElement.textContent.toLowerCase();
      });
    }

    // Add tags to the search string if available
    if (tagsElement) {
      // Join them into a space-separated string
      searchString += tagsElement.textContent.toLowerCase().split(", ").join(" ");
    }

    // Check if the search query is not found in the searchString
    if (!searchString.toLowerCase().includes(query.toLowerCase())) {
      post.style.display = "none"; // Hide the card
    } else {
      post.style.display = "block"; // Show the card
      postsLeft++;
    }
  });

  // Update the main header
  const mainHeader = document.querySelector(".main-header");
  mainHeader.classList.add("text-success", "fs-5");
  mainHeader.classList.remove("text-dark", "fs-3");
  mainHeader.innerHTML = `${postsLeft} results for ${query}`;
}

/**
 * Update the main header with the search results.
 *
 * @param {string} query - The search query.
 */
function updateMainHeader(query) {
  const mainHeader = document.querySelector(".main-header");
  const mainHeaderTitle = query ? `${postsLeft} results for ${query}` : "Search results";
  mainHeader.innerHTML = mainHeaderTitle;
  mainHeader.classList.add("text-success", "fs-5");
  mainHeader.classList.remove("text-dark", "fs-3");
}

/**
 * Display a message when no search results are found.
 */
function displayNoResults() {
  const feedPosts = document.getElementById("feed-posts");
  feedPosts.innerHTML = "<p>No results found.</p>";
  updateMainHeader(query);
}

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleSearch);
