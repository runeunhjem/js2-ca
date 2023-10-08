import { fetchOptions, searchURL } from "./variables/consts.mjs";
import { createPostCard } from "./utils/feed.mjs";

let postsLeft = 0;

async function fetchAllSearchResults(url, query) {
  const limit = 100;
  let allResults = [];
  let nextPage = 1;
  let totalFetched = 0; // Track the total number of posts fetched

  try {
    while (totalFetched < 1000) { // Limit the search to the first 1000 posts

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

    return allResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

//***********************************************************
// I SEEM TO GET ONLY ONE RESULT NO MATTER WHAT I SEARCH FOR
// ON PROFILE - TAGS ARE NOT DISPLAYED/SEARCHED?
//***********************************************************

async function handleSearch(event) {
  event.preventDefault();
  const queryInput = document.querySelector('input[name="searchQuery"]');
  const query = queryInput.value.toLowerCase(); // Convert the query to lowercase for case-insensitive search
  const spinner = document.querySelector(".spinner-border");
  spinner.classList.remove("d-none");

  try {
    // Reset the postsLeft counter to zero for a new search
    let postsLeft = 0;

    // Determine whether to search in API results or displayed posts based on the page URL
    if (window.location.pathname.includes("/profile/")) {
      // Gather the posts displayed on the profile page (modify this based on your page structure)
      const profilePosts = document.querySelectorAll(".post-card"); // Adjust the selector as needed

      // Filter and hide cards that do not match the search query
      Array.from(profilePosts).forEach((post) => {
        const titleElement = post.querySelector(".card-title"); // Assuming .card-title contains the post title
        const bodyElement = post.querySelector(".card-text"); // Assuming .card-text contains the post body
        const tagsElement = post.querySelector(".post-tags"); // Assuming .post-tags contains the post tags

        // Build the search string
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
          searchString += tagsElement.textContent.toLowerCase();
        }

        // Check if the search query is not found in the searchString
        if (!searchString.includes(query.toLowerCase())) {
          post.style.display = "none"; // Hide the card
        } else {
          post.style.display = "block"; // Show the card
          postsLeft++; // Increment the postsLeft counter
          console.log(`query: ${query}`);
          console.log("looks fine: ", postsLeft, " match your search ", searchString);
          console.log("Boom ");

        }
      });
    } else {
      // Fetch search results from the API using your existing code
      const searchResults = await fetchAllSearchResults(searchURL, query);
      displaySearchResults(searchResults, query); // Pass the query and search results to the displaySearchResults function
    }
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
  } finally {
    spinner.classList.add("d-none");
    queryInput.value = ""; // Clear the input field
  }
}


function displaySearchResults(results, query) {
  console.log(`postsLeft: ${postsLeft}`);
  const mainHeader = document.querySelector(".main-header");
  const mainHeaderTitle = query ? `${results.length} results for ${query}` : "Search results";
  mainHeader.style.fontSize = "1rem";
  mainHeader.classList.add("text-primary");
  mainHeader.classList.remove("text-dark");
  const title = query ? `${results.length} search results for ${query}` : "Search results";
  document.title = title;
  mainHeader.innerHTML = mainHeaderTitle;

  let feedPosts;
  if (window.location.pathname.includes("/post.html")) {
    feedPosts = document.getElementById("view-post");
  } else {
    feedPosts = document.getElementById("feed-posts");
  }
  feedPosts.innerHTML = "";
  console.log(`postsLeft: ${postsLeft}`);
  if (results.length === 0 || postsLeft === 0) {
    feedPosts.innerHTML = "<p>No results found.</p>";
  } else {
    results.forEach((result) => {
      const postCard = createPostCard(result);
      feedPosts.appendChild(postCard);
    });
  }


}

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleSearch);
