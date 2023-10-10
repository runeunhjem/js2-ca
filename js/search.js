import { populateTagsSelector } from "./feed-get-posts.js";
import { fetchOptions, searchURL } from "./variables/consts.mjs";
import { createPostCard } from "./utils/feed.mjs";

let postsLeft = 0;
let limit = 100; // Get max 100 from API
let offset = 0; // Initialize the offset to 0
let query = ""; // Initialize the query variable
// let nextPage = 1; // Initialize the nextPage variable

async function fetchAllSearchResults(url, query, limit, offset) {
  let allResults = [];
  let totalFetched = 0; // Track the total number of posts fetched

  try {
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
      const filterUserTagsSelector = document.getElementById("filterUserTagsSelector");
      localStorage.setItem("currentPagePosts", JSON.stringify(allResults));
      populateTagsSelector(allResults, filterUserTagsSelector);
    }

    // Show the number of results in the main header
    const mainHeader = document.querySelector(".main-header");
    mainHeader.classList.add("text-success", "fs-5");
    mainHeader.classList.remove("text-dark");
    mainHeader.innerHTML = `${allResults.length} results for ${query}`;

    displaySearchResults(allResults, query); // Call displaySearchResults once after fetching all results
    // document.addEventListener("DOMContentLoaded", captureCurrentPagePosts);
    return allResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}


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
    });

    // Update the postsLeft count after processing all results
    postsLeft = results.length;
    updateMainHeader(query);
  }
}



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
      console.log(`Search is on profile page: ${query}`);
      filterProfilePosts(query);
    } else {
      // Search is on other pages
      console.log(`Search is on feed page: ${query}`);
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

export async function filterProfilePosts(query) {
  const profilePosts = document.querySelectorAll(".post-card");

  // Filter and hide cards that do not match my search query
  Array.from(profilePosts).forEach((post) => {
    const titleElement = post.querySelector(".card-title");
    const bodyElement = post.querySelectorAll(".card-text");
    const tagsElement = post.querySelector(".post-tags");

    let searchString = "";

    // Add title to the search string if available
    if (titleElement) {
      searchString += titleElement.textContent.toLowerCase();
    }

    // Add body to the search string if available
    if (bodyElement) {
     bodyElement.forEach((bodyElement) => {
       searchString += bodyElement.textContent.toLowerCase();
     });
    }

    // Add tags to the search string if available
    if (tagsElement) {
      // Assuming tags is an array, join them into a space-separated string
      searchString += tagsElement.textContent.toLowerCase().split(", ").join(" ");
    }

    // Check if the search query is not found in the searchString
    if (!searchString.includes(query.toLowerCase())) {
      post.style.display = "none"; // Hide the card
    } else {
      post.style.display = "block"; // Show the card
      postsLeft++;
      updateMainHeader(query);
    }
  });


}

function updateMainHeader(query) {
  const mainHeader = document.querySelector(".main-header");
  const mainHeaderTitle = query ? `${postsLeft} results for ${query}` : "Search results";
  mainHeader.innerHTML = mainHeaderTitle;
  mainHeader.classList.add("text-success", "fs-5");
  mainHeader.classList.remove("text-dark", "fs-3");
}

function displayNoResults() {
  const feedPosts = document.getElementById("feed-posts");
  feedPosts.innerHTML = "<p>No results found.</p>";
  updateMainHeader(query);
}

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleSearch);

