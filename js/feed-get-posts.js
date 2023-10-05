import { createPostCard } from "./utils/feed.mjs";
import { loggedInUserData, postsURL, fetchOptions } from "./variables/consts.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postIdParam = urlParams.get("postId");
const profileImageElement = document.querySelector(".profile-image");
profileImageElement.src = loggedInUserData.avatar
  ? loggedInUserData.avatar
  : `https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg`;

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

          posts.forEach((post) => {
            if (postIdParam && post.id === postIdParam) {
              // Display only the post with the matching postId
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
              // let reactionsCount = 0;
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
    console.error(error);
  }
}

getFeedPostsWithToken(postsURL, fetchOptions);