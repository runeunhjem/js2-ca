import { createPostCard } from "./utils/feed.mjs";
import { createPostURL, fetchOptions, allPostsTags } from "./variables/consts.mjs";
import { populateTagsSelector, filterUserTagsSelector } from "./feed-get-posts.js";

const urlParams = new URLSearchParams(window.location.search);
export const postIdParam = urlParams.get("postId");

/**
 * Fetch a single post by ID and display it in the "view-post" container.
 * @param {string} url - The URL for fetching the post.
 * @param {object} options - The fetch options.
 * @param {string} id - The ID of the post to fetch.
 */
export async function getSinglePost(url, options, id) {
  try {
    if (!id) {
      return;
    } else {
      const fetchURL = `${url}/${id}?_comments=true&_author=true&_reactions=true`;
      const response = await fetch(fetchURL, options);

      if (response.ok) {
        const post = await response.json();

        if (post) {
          const singlePostContainer = document.getElementById("view-post");
          const singlePostCard = createPostCard(post);

          // Get the tags from each post and add them to the allPostsTags array
          const tags = post.tags || [];
          // Loop through the tags in the current post
          tags.forEach((tag) => {
            // Check if the tag is not already in the allPostsTags array
            if (!allPostsTags.includes(tag)) {
              // Add the tag to the allPostsTags array
              allPostsTags.push(tag);
            }
          });
          populateTagsSelector(allPostsTags, filterUserTagsSelector);

          // Check if there's content in the singlePostContainer and feedPosts container
          if (singlePostContainer && singlePostContainer.hasChildNodes()) {
            singlePostContainer.innerHTML = "";
          }

          const feedPosts = document.getElementById("feed-posts");
          if (feedPosts) {
            feedPosts.innerHTML = "";
            feedPosts.classList.add("d-none");
          }

          singlePostContainer.appendChild(singlePostCard);
        } else {
          console.error("Post with ID not found.");
        }
      } else {
        console.error("Failed to fetch data");
      }
    }
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
  }
}

getSinglePost(createPostURL, fetchOptions, postIdParam);
