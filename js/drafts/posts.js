const API_BASE_URL = "https://api.noroff.dev";
const postsURL = `${API_BASE_URL}/api/v1/social/posts?_comments=true&_author=true&_reactions=true&_count=true&_limit=20&_sort=createdAt:desc`;
const token = localStorage.getItem("accessToken");
const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

async function getWithToken(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();

      if (Array.isArray(data)) {
        // Filter the posts where the comments count is greater than 0
        const commentsPosts = data.filter((post) => post._count.comments > 0);
        const reactionsPosts = data.filter((post) => post._count.reactions > 0);

        console.log("commentsPosts Posts: ", commentsPosts);
        console.log("reactionsPosts Posts: ", reactionsPosts);
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

getWithToken(postsURL, fetchOptions);
