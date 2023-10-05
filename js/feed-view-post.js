import { createPostCard } from "./utils/feed.mjs";
import { createPostURL, fetchOptions, getSinglePostURL, searchURL } from "./variables/consts.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postIdToDisplay = urlParams.get("postId");

export async function getSinglePost(url, options, id) {
  try {
    const fetchURL = `${url}/${id}?_comments=true&_author=true&_reactions=true`;
    // const fetchURL = `${url}/${id}`;
    console.log("fetchURL is:", fetchURL);
    const response = await fetch(fetchURL, options);

    if (response.ok) {
      const post = await response.json();

      if (post) {
        // const postCard = createPostCard(post);
        // console.log("postCard: ", postCard);
        // feedPosts.appendChild(postCard);

        const singlePostContainer = document.getElementById("view-post");
        const singlePostCard = createPostCard(post);
        singlePostContainer.innerHTML = ""; // Clear the existing content
        singlePostContainer.appendChild(singlePostCard);

        const feedPosts = document.getElementById("feed-posts");
        if (feedPosts) {
          feedPosts.innerHTML = ""; // Clear the existing content
        }
      } else {
        console.error("Post with ID not found.");
      }
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    if (!error.message.includes("https://picsum.photos")) {
      console.error("Error:", error);
    }
  }
}

getSinglePost(createPostURL, fetchOptions, postIdToDisplay);

// export async function getSinglePost(url, options, id) {
//   try {
//     const fetchURL = `${url}/${id}?_comments=true&_author=true&_reactions=true`;

//     const response = await fetch(fetchURL, options);
//     console.log("response: ", response);
//     if (response.ok) {
//       const post = await response.json();
//       console.log("Post: ", post);

//       if (post) {
//         const feedPosts = document.getElementById("view-post");
//         const postCard = createPostCard(post);
//         feedPosts.innerHTML = ""; // Clear the existing content
//         console.log("postCard: ", postCard);
//         feedPosts.appendChild(postCard);
//       } else {
//         console.error("Post with ID not found.");
//       }
//     } else {
//       console.error("Failed to fetch data");
//     }
//   } catch (error) {
//     if (!error.message.includes("https://picsum.photos")) {
//       console.error("Error:", error);
//     }
//   }
// }
// ...
