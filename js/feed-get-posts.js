import { createPostCard } from "./utils/feed.mjs";
import { loggedInUserData, API_BASE_URL, fetchOptions } from "./variables/consts.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postIdParam = urlParams.get("postId");
const profileImageElement = document.querySelector(".profile-image");
profileImageElement.src = loggedInUserData.avatar
  ? loggedInUserData.avatar
  : `https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg`;
let limit = 10;
let offset = 0;
let sort = "created";
let sortOrder = "desc";
let basePostsURL = getBasePostsURL();
console.log("basePostsURL: ", basePostsURL);
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

function updateLimitAndRefresh(value) {
  limit = parseInt(value, 10);
  offset = 0; // Reset the offset when changing the limit
  basePostsURL = getBasePostsURL(); // Define basePostsURL after updating limit and offset
  getFeedPostsWithToken(basePostsURL, fetchOptions);
  console.log("updateLimitAndRefresh basePostsURL: ", basePostsURL);
}

document.querySelector("#itemsPerPageSelector").addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  updateLimitAndRefresh(selectedValue);
});

export async function getFeedPostsWithToken(url, options) {
  try {
    if (!window.location.href.includes("post.html")) {
      const response = await fetch(url, options);

      if (response.ok) {
        const posts = await response.json();
        console.log("Posts: ", posts);

        if (Array.isArray(posts)) {
          const feedPosts = document.getElementById("feed-posts");
          const singlePostContainer = document.getElementById("view-post");
          // Clear the existing content
          feedPosts.innerHTML = "";
          // singlePostContainer.innerHTML = "";

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

function togglesortOrder() {
  sortOrder = sortOrder === "asc" ? "desc" : "asc";
}

document.querySelector("#sortFeedSelector").addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  if (selectedValue === "date") {
    // Update the sorting field for newest first
    sort = "created";
    togglesortOrder();
  } else if (selectedValue === "oldest") {
    // Update the sorting field for oldest first
    sort = "created";
    sortOrder = "asc";
  }
  // Define basePostsURL after changing the sort
  basePostsURL = getBasePostsURL();
  console.log("sortFeedSelector before getfeedpostswith token basePostsURL: ", basePostsURL);
  getFeedPostsWithToken(basePostsURL, fetchOptions);
  console.log("sortFeedSelector basePostsURL: ", basePostsURL);
});

getFeedPostsWithToken(basePostsURL, fetchOptions);
