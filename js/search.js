import { fetchOptions, searchURL } from "./variables/consts.mjs";
import { createPostCard } from "./utils/feed.mjs";


// console.log(`queryString: ${queryString}`);
async function fetchAllSearchResults(url, query) {
  const limit = 100;
  let allResults = [];
  let nextPage = 1;
  let totalFetched = 0; // Track the total number of posts fetched

  try {
    while (totalFetched < 1000) { // Limit the search to the first 1000 posts
      console.log(`totalFetched: ${totalFetched}`);
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
      console.log(`allResults.length: ${allResults.length} - allResults:`, allResults);
      totalFetched += result.length; // Update the total count of fetched posts

      nextPage++;

      if (result.length < limit) {
        break; // No more matching results to fetch
      }
    }

    return allResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}



async function handleSearch(event) {
  event.preventDefault();
  const query = document.querySelector('input[name="searchQuery"]').value;
  const spinner = document.querySelector(".spinner-border");
  spinner.classList.remove("d-none");

  try {
    const searchResults = await fetchAllSearchResults(searchURL, query);
    displaySearchResults(searchResults);
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
  } finally {
    spinner.classList.add("d-none"); // Hide the spinner after the API call
  }
}

function displaySearchResults(results) {
  const mainHeader = document.querySelector(".main-header");
  const query = document.querySelector('input[name="searchQuery"]').value;
  const mainHeaderTitle = query ? `${results.length} results for ${query}` : "Search results";
  const title = query ? `${results.length} search results for ${query}` : "Search results";
  document.title = title;
  mainHeader.innerHTML = mainHeaderTitle;

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

const inputElement = document.getElementById("searchInput");
inputElement.addEventListener("keyup", (event) => {
  handleSearch(event);
  console.log("Key pressed:", event.key);
});

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleSearch);
