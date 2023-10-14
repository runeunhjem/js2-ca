import { createPostCard } from "./utils/feed.mjs";
import {
  loggedInUserData,
  API_BASE_URL,
  fetchOptions,
  profilePostsURL,
  createPostURL,
  allPostsTags,
  followingURL,
  followingButtons
} from "./variables/consts.mjs";
import { getSinglePost } from "./feed-view-post.js";

const urlParams = new URLSearchParams(window.location.search);
const postIdParam = urlParams.get("postId");

const profileImageElement = document.querySelector(".profile-image");

if (profileImageElement) {
  profileImageElement.src = loggedInUserData.avatar
    ? loggedInUserData.avatar
    : `https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg`;
}

let currentPage = 1;
let limit = 10;
let offset = 0;
let sort = "created";
let sortOrder = "desc";
let basePostsURL = getBasePostsURL();

function getBasePostsURL() {
  return `${API_BASE_URL}/social/posts?limit=${limit}&offset=${offset}&_comments=true&_author=true&_reactions=true&_count=true&sort=${sort}&sortOrder=${sortOrder}`;
}

if (!window.location.href.includes("/profile/")) {
  document.querySelector(".sort-by-date-button").addEventListener("click", () => {
    sort = "created";
    togglesortOrder();
    basePostsURL = getBasePostsURL();
    getFeedPostsWithToken(basePostsURL, fetchOptions);
  });

  document.querySelector(".sort-by-name-button").addEventListener("click", () => {
    sort = "owner";
    togglesortOrder();
    basePostsURL = getBasePostsURL();
    getFeedPostsWithToken(basePostsURL, fetchOptions);
  });

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
    getFeedPostsWithToken(basePostsURL, fetchOptions);
  });
}

export async function updateLimitAndRefresh(value) {
  limit = parseInt(value, 10);
  const itemsPerPageSelector = document.getElementById("itemsPerPageSelector");
  limit = parseInt(itemsPerPageSelector.value);
  offset = 0; // Reset the offset when changing the limit
  basePostsURL = getBasePostsURL(); // Define basePostsURL after updating limit and offset
  getFeedPostsWithToken(basePostsURL, fetchOptions);
}

document.querySelector("#itemsPerPageSelector").addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  updateLimitAndRefresh(selectedValue);
});

let shouldFetchAndPopulateTags = true;

// **** NOT TO SHURE IF I WANT THIS (Update - i didnt - So set to true - works better with tags on profile) ****
if (window.location.href.includes("/profile") || window.location.href.includes("/post.html")) {
  shouldFetchAndPopulateTags = true; // Don't fetch and populate tags on the profile page
}

export async function getFeedPostsWithToken(url, options) {
  if (shouldFetchAndPopulateTags) {
    try {
      if (!window.location.href.includes("post.html")) {
        const response = await fetch(url, options);

        if (response.ok) {
          const posts = await response.json();
          localStorage.setItem("currentPagePosts", JSON.stringify(posts));

          if (Array.isArray(posts)) {
            allPostsTags.length = 0; // Clear the allPostsTags array
            let feedPosts = document.getElementById("feed-posts");

            // Clear the existing content
            if (feedPosts) {
              feedPosts.innerHTML = "";
            }
            const singlePostContainer = document.getElementById("view-post");

            // Get the tags from each post and add them to the allPostsTags array
            posts.forEach((post) => {
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
            populateTags(posts);
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
}

// Function to clean and populate tags in the selector, including an option for posts with no tags
export async function populateTagsSelector(tags, selectorElement) {
  selectorElement.innerHTML = ""; // Clear the existing options

  // Create the "By user tags" default option
  const defaultOption = document.createElement("option");
  defaultOption.value = ""; // Also filters empty strings if selected i guess
  defaultOption.text = "By user tag";
  selectorElement.appendChild(defaultOption);

  // Create an option for posts with no tags
  const noTagOption = document.createElement("option");
  noTagOption.value = "notags";
  noTagOption.text = "Posts with No Tags";
  selectorElement.appendChild(noTagOption);

  // Clean and format the tags
  const validTags = tags
    .map((tag) => {
      // Check if tag is a string before applying replace
      if (typeof tag === "string") {
        // Remove leading spaces, convert to lowercase, and capitalize the first letter or number
        return tag
          .replace(/^[\s#]+/, "")
          .toLowerCase()
          .replace(/^[a-z0-9]/, (match) => match.toUpperCase());
      } else {
        // Handle the case where tag is not a string, for example, by returning an empty string
        return "notags";
      }
    })
    .filter((tag) => tag); // Remove empty strings

  // Sort the tags alphabetically
  validTags.sort();

  // Remove duplicates
  const uniqueValidTags = [...new Set(validTags)];

  // Add individual tag options
  uniqueValidTags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.text = tag;
    selectorElement.appendChild(option);
  });

  // Without this, the selector will not show the updated options
  // But it does not work on the profile page, sometimes!:
  // return Promise.resolve(); // Resolve the Promise when done (Update - i thinkk this is not nessesary anymore after setting shouldFetchAndPopulateTags to true)
}

export const filterUserTagsSelector = document.getElementById("filterUserTagsSelector");
export const populateTags = () => {
  if (Array.isArray(allPostsTags)) {
    const filterUserTagsSelector = document.getElementById("filterUserTagsSelector");
    filterUserTagsSelector.innerHTML = ""; // Clear the existing options
    populateTagsSelector(allPostsTags, filterUserTagsSelector);
  }
};

// Determine the page type
if (
  window.location.href.includes("/feed/") &&
  !window.location.href.includes("/post.html") &&
  !window.location.href.includes("/profile/")
) {
  getFeedPostsWithToken(basePostsURL, fetchOptions).then(populateTags);
} else if (
  !window.location.href.includes("/feed/") &&
  window.location.href.includes("/post.html") &&
  !window.location.href.includes("/profile/")
) {
  getSinglePost(createPostURL, fetchOptions, postIdParam).then(populateTags);
} else if (
  !window.location.href.includes("/feed/") &&
  !window.location.href.includes("/post.html") &&
  window.location.href.includes("/profile/")
) {
  getFeedPostsWithToken(profilePostsURL, fetchOptions).then(populateTags);
}

function togglesortOrder() {
  sortOrder = sortOrder === "asc" ? "desc" : "asc";
}

getFeedPostsWithToken(basePostsURL, fetchOptions);

// Next & Previous links
// Update the current page number based on the offset
function updateCurrentPage() {
  const currentPageElement = document.getElementById("currentPageInfo");
  currentPage = `Page ${Math.floor(offset / limit) + 1}`;
  currentPageElement.textContent = currentPage;
  populateTags(); // Update the tags selector
}

// Previous Page link click event
document.querySelector("#prevPageLink").addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    updateCurrentPage();
    basePostsURL = getBasePostsURL();
    getFeedPostsWithToken(basePostsURL, fetchOptions);
    populateTags(); // Update the tags selector
  }
});

// Next Page link click event
document.querySelector("#nextPageLink").addEventListener("click", () => {
  offset += limit;
  updateCurrentPage();
  basePostsURL = getBasePostsURL();
  getFeedPostsWithToken(basePostsURL, fetchOptions);
  populateTags(); // Update the tags selector
});

// Attach the event listener to each "following-button"
followingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    getFeedPostsWithToken(followingURL, fetchOptions);
    updateCurrentPage();
  });
});