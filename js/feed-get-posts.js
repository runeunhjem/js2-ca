import { createPostCard } from "./utils/feed.mjs";
import { loggedInUserData, API_BASE_URL, fetchOptions } from "./variables/consts.mjs";

const allPostsTags = [];
const urlParams = new URLSearchParams(window.location.search);
const postIdParam = urlParams.get("postId");
const profileImageElement = document.querySelector(".profile-image");
profileImageElement.src = loggedInUserData.avatar
  ? loggedInUserData.avatar
  : `https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg`;

let currentPage = 1;
let limit = 10;
let offset = 0;
let sort = "created";
let sortOrder = "desc";
let basePostsURL = getBasePostsURL();
// console.log("basePostsURL: ", basePostsURL);
function getBasePostsURL() {
  return `${API_BASE_URL}/social/posts?limit=${limit}&offset=${offset}&_comments=true&_author=true&_reactions=true&_count=true&sort=${sort}&sortOrder=${sortOrder}`;
}

document.querySelector(".sort-by-date-button").addEventListener("click", () => {
  sort = "created";
  togglesortOrder();
  basePostsURL = getBasePostsURL();
  getFeedPostsWithToken(basePostsURL, fetchOptions);
  console.log("sort by date button basePostsURL: ", basePostsURL);
});

document.querySelector(".sort-by-name-button").addEventListener("click", () => {
  sort = "owner";
  togglesortOrder();
  basePostsURL = getBasePostsURL();
  getFeedPostsWithToken(basePostsURL, fetchOptions);
  console.log("sort by name basePostsURL: ", basePostsURL);
});

export async function updateLimitAndRefresh(value) {
  console.log("updateLimitAndRefresh called"); // Add this line for debugging

  limit = parseInt(value, 10);
  const itemsPerPageSelector = document.getElementById("itemsPerPageSelector");
  limit = parseInt(itemsPerPageSelector.value);
  offset = 0; // Reset the offset when changing the limit
  basePostsURL = getBasePostsURL(); // Define basePostsURL after updating limit and offset
  getFeedPostsWithToken(basePostsURL, fetchOptions);
  console.log("updateLimitAndRefresh basePostsURL: ", basePostsURL);
}

document.querySelector("#itemsPerPageSelector").addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  console.log(`selectedValue: ${selectedValue}`);
  updateLimitAndRefresh(selectedValue);
});

export async function getFeedPostsWithToken(url, options) {

  try {
    if (!window.location.href.includes("post.html")) {
      const response = await fetch(url, options);

      if (response.ok) {
        const posts = await response.json();
        console.log("Current page Posts: ", posts);
        localStorage.setItem("currentPagePosts", JSON.stringify(posts));

        if (Array.isArray(posts)) {
          const feedPosts = document.getElementById("feed-posts");
          const singlePostContainer = document.getElementById("view-post");
          // Clear the existing content
          feedPosts.innerHTML = "";

          // Get the tags from each post and add them to the allPostsTags array
          posts.forEach((post) => {

            const tags = post.tags || []; // Assuming tags is an array in each post

            // Loop through the tags in the current post
            tags.forEach((tag) => {
              // Check if the tag is not already in the allPostsTags array
              if (!allPostsTags.includes(tag)) {
                // Add the tag to the allPostsTags array
                allPostsTags.push(tag);
              }
            });
          });

          // Now, allPostsTags will contain all unique tags from the posts
          console.log("All Posts Tags: ", allPostsTags);

          posts.forEach((post) => {
            if (postIdParam && post.id === postIdParam) {
              const postCard = createPostCard(post);
              if (singlePostContainer) {
                singlePostContainer.appendChild(postCard);
              } else {
                feedPosts.appendChild(postCard);
              }
            }

            if (post.reactions && post.reactions.length > 0) {
              const postCard = createPostCard(post);
              if (singlePostContainer) {
                singlePostContainer.appendChild(postCard);
              } else {
                feedPosts.appendChild(postCard);
              }
            } else {
              const postCard = createPostCard(post);
              if (singlePostContainer) {
                singlePostContainer.appendChild(postCard);
              } else {
                feedPosts.appendChild(postCard);
              }
            }
          });
        } else {
          console.error("Data is not in the expected format.");
        }
      } else {
        console.error("Failed to fetch data");
      }
    }
  } catch (error) {
    console.error("Catch error is", error);
  }
}

// Function to clean and populate tags in the selector, including an option for posts with no tags
export async function populateTagsSelector(tags, selectorElement) {
  selectorElement.innerHTML = ""; // Clear the existing options

  // Create the "By user tags" default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "By user tag";
  selectorElement.appendChild(defaultOption);

  // Create an option for posts with no tags
  const noTagOption = document.createElement("option");
  noTagOption.value = "NoTags";
  noTagOption.text = "Posts with No Tags";
  selectorElement.appendChild(noTagOption);

  // Clean and format the tags
  const validTags = tags.map((tag) => {
    // Remove leading spaces, convert to lowercase, and capitalize the first letter or number
    return tag.replace(/^[\s#]+/, '').toLowerCase().replace(/^[a-z0-9]/, (match) => match.toUpperCase());
  });

  // Remove duplicates
  const uniqueValidTags = [...new Set(validTags)];

  // Add individual tag options
  uniqueValidTags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.text = tag;
    selectorElement.appendChild(option);
  });
}

console.log("All Posts Tags Array: ", allPostsTags);
// Call the populateTagsSelector function with allPostsTags and filterUserTagsSelector
// Fetch and populate allPostsTags
getFeedPostsWithToken(basePostsURL, fetchOptions).then(() => {
  // Now that allPostsTags is populated, call populateTagsSelector
  const filterUserTagsSelector = document.getElementById("filterUserTagsSelector");
  populateTagsSelector(allPostsTags, filterUserTagsSelector);
});


function togglesortOrder() {
  sortOrder = sortOrder === "asc" ? "desc" : "asc";
}

document.querySelector("#sortFeedSelector").addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  if (selectedValue === "newest") {
    // Update the sorting field for newest first
    sort = "created";
    sortOrder = "desc";
  } else if (selectedValue === "oldest") {
    // Update the sorting field for oldest first
    sort = "created";
    sortOrder = "asc";
  }

  basePostsURL = getBasePostsURL();
  // console.log("sortFeedSelector before getfeedpostswithtoken basePostsURL: ", basePostsURL);
  getFeedPostsWithToken(basePostsURL, fetchOptions);
  // console.log("sortFeedSelector basePostsURL: ", basePostsURL);
});

getFeedPostsWithToken(basePostsURL, fetchOptions);

// Next & Previous links
// Update the current page number based on the offset
function updateCurrentPage() {
  const currentPageElement = document.getElementById("currentPageInfo");
  currentPage = `Page ${Math.floor(offset / limit) + 1}`;
  currentPageElement.textContent = currentPage;
}

// Previous Page link click event
document.querySelector("#prevPageLink").addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    updateCurrentPage();
    basePostsURL = getBasePostsURL();
    getFeedPostsWithToken(basePostsURL, fetchOptions);
  }
});

// Next Page link click event
document.querySelector("#nextPageLink").addEventListener("click", () => {
  offset += limit;
  updateCurrentPage();
  basePostsURL = getBasePostsURL();
  getFeedPostsWithToken(basePostsURL, fetchOptions);
});
