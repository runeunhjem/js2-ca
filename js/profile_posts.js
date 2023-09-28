import { urlParams } from "./variables/consts.mjs";
import { getProfilePosts } from "./populate_profile.js";
// import { loggedInUserPosts } from "./variables/consts.mjs";
const currentUserName = urlParams.get("name");

document.addEventListener("DOMContentLoaded", async function () {
  // Display a loading indicator while data is being fetched
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.textContent = "Loading...";

  try {
    // Await the data loading functions
    const profilePostsData = await getProfilePosts();
    loadingIndicator.textContent = "";
    // console.log(profilePostsData.length);
    // Check if data is available and has posts
    if (profilePostsData && Array.isArray(profilePostsData) && profilePostsData.length > 0) {
      const profilePosts = document.getElementById("feed-posts");
      // const profilePosts = document.getElementById("profilePosts");

      profilePostsData.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title", "loggedInProfileName");

        if (post.id) {
          const cardTitleContainer = document.createElement("div");
          cardTitleContainer.classList.add("d-flex", "justify-content-between", "align-items-center");

          const nameDiv = document.createElement("div");
          nameDiv.textContent = post.author.name || currentUserName;

          const postIdDiv = document.createElement("div");
          postIdDiv.textContent = `Post ID: ${post.id}`;
          postIdDiv.classList.add("text-end", "text-muted", "fs-6");

          cardTitleContainer.appendChild(nameDiv);
          cardTitleContainer.appendChild(postIdDiv);

          cardTitle.appendChild(cardTitleContainer);
        } else {
          cardTitle.textContent = post.name || currentUserName;
        }

        const cardSubtitle = document.createElement("p");
        cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted");
        const postDate = new Date(post.created);
        cardSubtitle.textContent = `Posted ${postDate.toLocaleDateString()} ${postDate.toLocaleTimeString()}`;

        const img = document.createElement("img");
        img.classList.add("movie-poster", "img-fluid", "rounded", "shadow", "d-md-block", "loggedInProfilePoster");
        img.id = "loggedInProfilePoster";
        const uniqueQueryParam = Math.floor(Math.random() * (500 - 200 + 1) + 100);
        if (post.media) {
          img.src = post.media;
          img.alt = "Movie Poster";
        } else {
          // Use Picsum placeholder if 'media' is empty
          img.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
          img.alt = "Post Image";
        }

        const titleContainer = document.createElement("div");
        titleContainer.classList.add("d-flex", "py-2", "align-items-center");

        const postTitle = document.createElement("h5");
        postTitle.classList.add("card-title", "me-2", "my-0");
        if (post.title) {
          postTitle.textContent = post.title;
        } else {
          postTitle.textContent = "Test Movie Title Because Post Title is Empty";
        }

        const imdbLink = document.createElement("a");
        imdbLink.classList.add("nav-link", "text-primary", "mx-0", "p-2", "text-nowrap");
        imdbLink.target = "_blank";
        const randomImdbNumber = Math.floor(Math.random() * (10160976 - 7160976 + 1) + 100);
        if (post.imdbLink) {
          imdbLink.href = post.imdbLink;
        } else {
          imdbLink.href = `https://www.imdb.com/title/tt${randomImdbNumber}/`;
        }
        imdbLink.innerHTML = `<i class="bi bi-film me-1"></i>IMDb`;

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = post.body;

        const likesInfo = document.createElement("i");
        likesInfo.classList.add("bi", "bi-hand-thumbs-up-fill", "text-primary");
        likesInfo.textContent = " Movie Buff, Superhero Fan & 6 others like this";

        const hr = document.createElement("hr");

        const reactionCountElement = document.createElement("div");
        reactionCountElement.classList.add("reaction-count", "text-primary", "ms-1", "pb-1"); // Add a class for easy selection
        let commentsCount = 0;
        if (post._count && post._count.comments) {
          commentsCount = post._count.comments;
        }

        let reactionsCount = 0;
        if (post._count && post._count.reactions) {
          reactionsCount = post._count.reactions;
        }
        reactionCountElement.textContent = `${reactionsCount} Likes, ${commentsCount} Comments`;

        const hr2 = document.createElement("hr2");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("card-text");

        const likeButton = document.createElement("button");
        likeButton.classList.add("btn", "btn-warning", "btn-sm", "my-1", "mx-1");
        likeButton.innerHTML = `<i class="bi bi-hand-thumbs-up"></i> Like`;

        const shareButton = document.createElement("button");
        shareButton.classList.add("btn", "btn-warning", "btn-sm", "my-1", "mx-1");
        shareButton.innerHTML = `<i class="bi bi-share"></i> Share`;

        const commentButton = document.createElement("button");
        commentButton.classList.add("btn", "btn-warning", "btn-sm", "my-1", "mx-1");
        commentButton.innerHTML = `<i class="bi bi-chat-dots"></i> Comment`;

        // Append elements to their respective parents
        titleContainer.appendChild(postTitle);
        titleContainer.appendChild(imdbLink);

        buttonContainer.appendChild(likeButton);
        buttonContainer.appendChild(shareButton);
        buttonContainer.appendChild(commentButton);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardSubtitle);
        cardBody.appendChild(img);
        cardBody.appendChild(titleContainer);
        cardBody.appendChild(cardText);
        cardBody.appendChild(likesInfo); // Decide to keep this or the other one
        cardBody.appendChild(hr);
        cardBody.appendChild(reactionCountElement); // Decide to keep this or the other one
        cardBody.appendChild(hr2);
        cardBody.appendChild(buttonContainer);

        card.appendChild(cardBody);

        profilePosts.appendChild(card);
      });
    } else {
      // Handle the case when there are no posts to display or an error occurred.
      // You can add code here to show a message or take appropriate action.
    }
  } catch (error) {
    console.error("Error initializing the profile page:", error);
  }
});
