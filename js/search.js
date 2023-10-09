import { fetchOptions, searchURL } from "./variables/consts.mjs";
import { createPostCard } from "./utils/feed.mjs";

let postsLeft = 0;

async function fetchAllSearchResults(url, query) {
  const limit = 100;
  let allResults = [];
  let nextPage = 1;
  let totalFetched = 0; // Track the total number of posts fetched

  try {
    while (totalFetched < 500) {
      // Limit the search to the first 1000 posts

      const response = await fetch(`${searchURL}?page=${nextPage}&limit=${limit}`, fetchOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (!result || result.length === 0) {
        break; // No more results to fetch
      }

      // Filter and append results that match the query and are not duplicates
      const searchResults = result.filter((post) => {
        const searchString = post.title + post.body + post.tags.join(" ") + post.author.name;
        return (
          searchString.toLowerCase().includes(query.toLowerCase()) &&
          !allResults.some((existingPost) => existingPost.id === post.id) // Check for duplicates
        );
      });

      allResults = allResults.concat(searchResults);
      // console.log(`allResults.length: ${allResults.length} - allResults:`, allResults);
      totalFetched += result.length; // Update the total count of fetched posts

      nextPage++;

      if (result.length < limit) {
        break; // No more matching results to fetch
      }
    }
    // Show the number of results in the main header
    const mainHeader = document.querySelector(".main-header");
    mainHeader.classList.add("text-success", "fs-5");
    mainHeader.classList.remove("text-dark");
    const filterWrapper = document.querySelector(".filter-wrapper");
    filterWrapper.classList.add("flex-sm-column", "align-items-sm-center");
    const buttonWrapper = document.querySelector(".button-wrapper");
    buttonWrapper.classList.add("justify-content-sm-center");
    mainHeader.innerHTML = `${allResults.length} results for ${query}`;

    return allResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

async function handleSearch(event) {
  event.preventDefault();
  const queryInput = document.querySelector('input[name="searchQuery"]');
  const query = queryInput.value.toLowerCase(); // Convert the query to lowercase for case-insensitive search
  const spinner = document.querySelector(".spinner-border");
  spinner.classList.remove("d-none");
  spinner.classList.add("mt-4");
  const showSearching = document.getElementById("searching");
  showSearching.classList.add("d-block", "mt-3");
  showSearching.classList.remove("d-none");

  try {
    // Reset the postsLeft counter to zero for a new search
    postsLeft = 0; // Update the outer variable

    if (window.location.pathname.includes("/profile/")) {
      // Search is on the profile page
      filterProfilePosts(query);
    } else {
      // Search is on other pages
      console.log(`Search is on feed page: ${query}`);

      const searchResults = await fetchAllSearchResults(searchURL, query);
      displaySearchResults(searchResults, query);
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

function filterProfilePosts(query) {
  const profilePosts = document.querySelectorAll(".post-card");

  // Filter and hide cards that do not match my search query
  Array.from(profilePosts).forEach((post) => {
    const titleElement = post.querySelector(".card-title");
    const bodyElement = post.querySelector(".card-text");
    const tagsElement = post.querySelector(".post-tags");

    let searchString = "";

    // Add title to the search string if available
    if (titleElement) {
      searchString += titleElement.textContent.toLowerCase();
    }

    // Add body to the search string if available
    if (bodyElement) {
      searchString += bodyElement.textContent.toLowerCase();
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
      postsLeft++; // Increment the postsLeft counter

      const mainHeader = document.querySelector(".main-header");
      const query = document.querySelector('input[name="searchQuery"]').value;
      const mainHeaderTitle = query ? `${postsLeft} results for ${query}` : "Search results";
      console.log("mainHeaderTitle:", mainHeaderTitle);
      const title = query ? `${postsLeft} search results for ${query}` : "Search results";
      document.title = title;
      mainHeader.innerHTML = mainHeaderTitle;

      console.log(`query: ${query}`);
      console.log("looks fine: ", postsLeft, " match your search ", searchString);
      console.log("Boom ");
    }
  });
}

function displaySearchResults(results) {
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
    // Display a message when there are no results
    feedPosts.innerHTML = "<p>No results found.</p>";
  } else {
    // Create and append post cards for each search result
    results.forEach((result) => {
      const postCard = createPostCard(result);
      feedPosts.appendChild(postCard);
    });
  }
}

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleSearch);
