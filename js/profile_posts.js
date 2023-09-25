// let loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));
// let loggedInUser = localStorage.getItem("loggedInUser");
// import { loggedInUser } from "./variables/consts.mjs";
import { loggedInUserData } from "./variables/consts.mjs";
document.addEventListener("DOMContentLoaded", function () {
  if (loggedInUserData && Array.isArray(loggedInUserData.posts)) {
    const profilePosts = document.getElementById("profilePosts");

    loggedInUserData.posts.forEach((post) => {
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
        nameDiv.textContent = loggedInUserData.name;

        const postIdDiv = document.createElement("div");
        postIdDiv.textContent = `Post ID: ${post.id}`;
        postIdDiv.classList.add("text-end", "text-muted", "fs-6");

        cardTitleContainer.appendChild(nameDiv);
        cardTitleContainer.appendChild(postIdDiv);

        cardTitle.appendChild(cardTitleContainer);
      } else {
        cardTitle.textContent = loggedInUserData.name;
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
      // reactionCountElement.innerHTML = `<i class="me-1 bi bi-hand-thumbs-up"> 8 Likes</i> <i class="ms-5 me-1 bi bi-chat-dots"></i> 0 Comments `;
      // console.log("post.reactions :", post.reactions);
      // console.log("post.comments :", post.comments);
      let commentsCount = 0;
      if (post._count && post._count.comments) {
        commentsCount = post._count.comments;
      }

      let reactionsCount = 0;
      if (post._count && post._count.reactions) {
        reactionsCount = post._count.reactions;
      }
      // const commentsCount = post._count.comments;
      // console.log("post._count.comments :", post._count.comments);
      // const reactionsCount = post._count.reactions;
      // console.log("post._count.reactions :", post._count.reactions);
      reactionCountElement.textContent = `${reactionsCount} Likes, ${commentsCount} Comments`;
      reactionCountElement.innerHTML = `<i class="me-1 bi bi-hand-thumbs-up"></i> ${reactionsCount} Likes <i class="ms-5 me-1 bi bi-chat-dots"></i> ${commentsCount} Comments `;

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
    // fetchUserProfile();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
});