import { createPostCard } from "./utils/feed.mjs";
import { postsURL, fetchOptions } from "./variables/consts.mjs";

export async function getFeedPostsWithToken(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const posts = await response.json();
      console.log("Posts: ", posts);

      if (Array.isArray(posts)) {
        const feedPosts = document.getElementById("feed-posts");
        // Check if the URL includes "post"
        const urlIncludesPost = window.location.href.includes("post");
        posts.forEach((post) => {

          if (urlIncludesPost && index === 0) {
            // Display only the first post when the URL includes "post"
            const postCard = createPostCard(post);
            feedPosts.appendChild(postCard);
          } else if (!urlIncludesPost) {
            // Display all posts when the URL does not include "post"
            const postCard = createPostCard(post);
            feedPosts.appendChild(postCard);
          }
          
          if (post.reactions && post.reactions.length > 0) {
            // if (post.reactions && post.reactions.length > 0) {
            // Now you can use reactionsCount as needed
            const postCard = createPostCard(post);
            // let reactionsCount = post.reactions[0].count;

            // // Display comments
            // const comments = post.comments || {};
            // const commentsContainer = document.createElement("div");
            // commentsContainer.className = "post-comments";

            // for (const commentId in comments) {
            //   if (comments.hasOwnProperty(commentId)) {
            //     const comment = comments[commentId];
            //     const commentElement = document.createElement("div");
            //     commentElement.textContent = comment.text;
            //     commentsContainer.appendChild(commentElement);
            //   }
            // }

            // // Display reactions
            // const reactions = post.reactions || {};
            // const reactionsContainer = document.createElement("div");
            // reactionsContainer.className = "post-reactions";

            // for (const reactionId in reactions) {
            //   if (reactions.hasOwnProperty(reactionId)) {
            //     const reaction = reactions[reactionId];
            //     const reactionElement = document.createElement("div");
            //     reactionElement.textContent = reaction.type;
            //     reactionsContainer.appendChild(reactionElement);
            //   }
            // }

            // // Append comments and reactions to the postCard
            // postCard.appendChild(commentsContainer);
            // postCard.appendChild(reactionsContainer);

            // Append the postCard to the feedPosts container
            feedPosts.appendChild(postCard);
          } else {
            const postCard = createPostCard(post);
            let reactionsCount = 0;
            feedPosts.appendChild(postCard);
          }
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
