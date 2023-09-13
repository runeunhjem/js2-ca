// feed-get-posts.js
import createPostCard from "./feed-post-card.js";

const API_BASE_URL = "https://api.noroff.dev";
const postsURL = `${API_BASE_URL}/api/v1/social/posts?limit=10&offset=125&_comments=true&_author=true&_reactions=true&_count=true`;

const token = localStorage.getItem("accessToken");
const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

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