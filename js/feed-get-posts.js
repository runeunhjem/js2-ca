// import createPostCard from "./feed-post-card.js";
import { createPostCard } from "./utils/feed.js";
// import { API_BASE_URL } from "./consts.js";
import { postsURL } from "./variables/consts.js";
// import { token } from "./consts.js";
import { fetchOptions } from "./variables/consts.js";
// const postsURL = `${API_BASE_URL}/api/v1/social/posts?limit=10&offset=125&_comments=true&_author=true&_reactions=true&_count=true`;
// const token = localStorage.getItem("accessToken");

// const fetchOptions = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// };

async function getFeedPostsWithToken(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const posts = await response.json();
      console.log("Posts: ", posts);

      if (Array.isArray(posts)) {
        const feedPosts = document.getElementById("feed-posts");
        posts.forEach((post) => {
          const postCard = createPostCard(post);

          // Display comments
          const comments = post.comments || {};
          const commentsContainer = document.createElement("div");
          commentsContainer.className = "post-comments";

          for (const commentId in comments) {
            if (comments.hasOwnProperty(commentId)) {
              const comment = comments[commentId];
              const commentElement = document.createElement("div");
              commentElement.textContent = comment.text;
              commentsContainer.appendChild(commentElement);
            }
          }

          // Display reactions
          const reactions = post.reactions || {};
          const reactionsContainer = document.createElement("div");
          reactionsContainer.className = "post-reactions";

          for (const reactionId in reactions) {
            if (reactions.hasOwnProperty(reactionId)) {
              const reaction = reactions[reactionId];
              const reactionElement = document.createElement("div");
              reactionElement.textContent = reaction.type;
              reactionsContainer.appendChild(reactionElement);
            }
          }

          // Append comments and reactions to the postCard
          postCard.appendChild(commentsContainer);
          postCard.appendChild(reactionsContainer);

          // Append the postCard to the feedPosts container
          feedPosts.appendChild(postCard);
        });

      } else {
        console.error("Data is not in the expected format.");
      }
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
  }
}

getFeedPostsWithToken(postsURL, fetchOptions);
