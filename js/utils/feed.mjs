import {
  API_BASE_URL,
  currentProfileName,
  authorUserData,
  loggedInUser,
  postsURL,
  reactionOptions,
} from "../variables/consts.mjs";
import { deletePost } from "./delete-posts.mjs";
import { editPost } from "./edit-posts.mjs";

export function createPostCard(post) {
  const spinner = document.querySelector(".spinner-border");
  spinner.classList.add("d-none");
  const isLoggedIn = post.author && post.author.name === loggedInUser;
  const card = document.createElement("div");
  // card.classList.add("card", "post-card", "mx-0", "my-3", "bg-info", "shadow-sm", "d-md-flex");
  card.classList.add("card", "post-card", "mx-0", "my-3", "bg-info", "shadow-sm");
  card.setAttribute("data-post-id", post.id);
  card.addEventListener("mouseover", handlePostCardClick);
  card.addEventListener("mouseleave", handlePostCardMouseLeave);
  card.addEventListener("click", handlePostCardClick);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "container");

  const authorDiv = document.createElement("div");
  authorDiv.classList.add("d-flex", "align-items-start", "justify-content-center");

  const avatarDiv = document.createElement("div");
  avatarDiv.classList.add("col-4", "col-sm-2", "position-relative", "z-3", "me-2");
  const avatarImg = document.createElement("img");
  avatarImg.alt = "Author Avatar";
  avatarImg.classList.add("movie-poster", "img-fluid", "me-2", "mb-0", "rounded", "shadow");

  avatarImg.onerror = () => {
    avatarImg.src = `https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg`;
  };

  if (post.author && post.author.avatar) {
    avatarImg.src = post.author.avatar;
  } else {
    avatarImg.src = `https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg`;
  }

  avatarDiv.appendChild(avatarImg);

  const postContentDiv = document.createElement("div");
  postContentDiv.classList.add("col-8", "col-sm-10", "ms-sm-2", "justify-content-start");

  const authorInfoDiv = document.createElement("div");
  authorInfoDiv.classList.add("d-block", "d-sm-flex", "align-items-center");

  const authorName = document.createElement("h6");
  authorName.classList.add("d-block", "d-sm-flex", "card-title", "mb-0", "me-1", "ps-1");
  authorName.setAttribute("data-authorname", post.author.name);
  authorName.textContent = post.author.name;

  const moreButton = document.createElement("button");
  moreButton.classList.add(
    "btn",
    "btn-warning",
    "btn-sm",
    "my-1",
    "mx-1",
    "dropdown-toggle",
    "more-button",
    "justify-content-start",
    "w-100"
  );
  moreButton.style.textAlign = "left";
  moreButton.setAttribute("data-bs-toggle", "dropdown");
  moreButton.setAttribute("aria-expanded", "false");
  moreButton.innerHTML = `<i class="bi bi-three-dots-vertical"></i> Options`;

  moreButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const dropdownMenu = event.target.nextElementSibling;
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
  });



  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu", "bg-info", "shadow", "border-0");
  dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton1");

  const menuItems = [];

  if (isLoggedIn) {
    // Only add "Edit" and "Delete" options if the user is logged in
    menuItems.push({ text: "Edit", className: "edit-button" }, { text: "Delete", className: "delete-button" });
  }

  // Always add the "Share" option
  menuItems.push({ text: "Share", className: "share-button" });

  menuItems.forEach((menuItemData) => {
    const menuItem = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("dropdown-item", menuItemData.className);
    button.type = "button";
    button.textContent = menuItemData.text;
    menuItem.appendChild(button);
    dropdownMenu.appendChild(menuItem);
  });
  if (isLoggedIn) {
    const deleteButton = dropdownMenu.querySelector(".delete-button");
    deleteButton.addEventListener("click", (event) => {
      deletePost(post.id);
    });
    const editButton = dropdownMenu.querySelector(".edit-button");
    editButton.addEventListener("click", (event) => {
      editPost(post.id);
    });
  }

  moreButton.appendChild(dropdownMenu);
  card.appendChild(moreButton);

  const postIdElement = document.createElement("div");
  postIdElement.setAttribute("data-post-id", post.id);
  postIdElement.classList.add("post-id", "position-absolute", "top-0", "end-0", "p-2", "text-muted", "fs-0");
  postIdElement.textContent = `ID: ${post.id}`;
  if (isLoggedIn) {
    postIdElement.classList.add("text-primary", "fw-bold");
    postIdElement.classList.remove("text-muted");
  }
  card.appendChild(postIdElement);

  const viewProfileLink = document.createElement("a");
  viewProfileLink.classList.add(
    "nav-link",
    "text-primary",
    "px-2",
    "m-0",
    "pt-1",
    "pb-1",
    "text-nowrap",
    "view-profile-link"
  );
  viewProfileLink.setAttribute("data-authorname", post.author.name); // Set the actual author"s name as the attribute value
  const currentProfileURL = `../profile/index.html?name=${encodeURIComponent(post.author.name)}`;
  viewProfileLink.href = currentProfileURL;
  viewProfileLink.innerHTML = "<i class='bi bi-person-fill'></i> View profile";

  viewProfileLink.addEventListener("click", function (event) {
    event.preventDefault();
    const authorName = viewProfileLink.dataset.authorname;
    localStorage.setItem("currentProfileName", authorName);
    window.location.href = `../profile/index.html?name=${encodeURIComponent(post.author.name)}`;
  });

  authorInfoDiv.appendChild(authorName);
  authorInfoDiv.appendChild(viewProfileLink);

  const postDate = document.createElement("p");
  postDate.classList.add("card-subtitle", "mb-1", "text-muted", "ps-1");
  const createdDate = new Date(post.created);
  postDate.textContent = createdDate.toLocaleString();

  const viewPostLink = document.createElement("a");
  viewPostLink.classList.add(
    "d-flex",
    "nav-link",
    "text-primary",
    "m-0",
    "p-2",
    "view-post-link",
    "flex-wrap",
  );
  if (window.location.href.includes("/profile/") || window.location.href.includes("/post.html")) {
    viewPostLink.classList.add("d-block");
  } else {
    viewPostLink.classList.add("d-sm-flex");
  }
  viewPostLink.style.setProperty("class", "align-items-start", "important");
  const postPageURL = `../feed/post.html?postId=${post.id}`;
  viewPostLink.href = postPageURL;
  viewPostLink.innerHTML = `<i class="bi bi-film me-1 mt-1"></i>`;
  viewPostLink.appendChild(document.createTextNode(post.title));

  if (window.location.pathname.includes("post.html")) {
    viewPostLink.classList.add("disabled-link", "text-muted", "fw-bold");
    viewPostLink.removeAttribute("href");
    viewPostLink.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("You are already on the post page.");
    });
  }

  const postText = document.createElement("p");
  postText.classList.add("card-text", "my-0", "ps-2", "visible-content");

  const maxWords = 4;
  const words = post.body ? post.body.split(" ") : [];
  const visibleContent = words.slice(0, maxWords).join(" ");
  const hiddenContent = words.slice(maxWords).join(" ");

  postText.innerHTML = `${visibleContent} <span class="hidden-content">${hiddenContent}</span>`;

  const postMedia = document.createElement("img");
  postMedia.classList.add("card-media", "m-1", "p-2", "rounded", "shadow");

  postMedia.alt = "Post Image";
  postMedia.style.width = "100%";
  postMedia.style.maxHeight = "100%";
  postMedia.style.maxWidth = "100%";
  postMedia.onerror = () => {
    const uniqueQueryParam = Math.floor(Math.random() * (500 - 200 + 1) + 100);
    if ((postMedia.src != `https://picsum.photos/id/${uniqueQueryParam}/200/300`)) {
      postMedia.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
    }
  };
  if (post.media) {
    postMedia.src = post.media;
  } else {
    const uniqueQueryParam = Math.floor(Math.random() * (500 - 200 + 1) + 100);
    if (postMedia.src != `https://picsum.photos/id/${uniqueQueryParam}/200/300`) {
      postMedia.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
    }
  }
  if (window.location.href.includes("/feed/") && !window.location.href.includes("post.html")) {
    postMedia.style.width = "100px";
    postMedia.classList.add("ms-3");
    viewPostLink.style.setProperty("class", "align-items-start");
    viewPostLink.classList.add("align-items-start", "ps-2");
  }

  const showMoreButton = document.createElement("button");
  if (words.length > maxWords) {
    showMoreButton.classList.add(
      "btn",
      "btn-none",
      "btn-sm",
      "m-0",
      "show-more-button",
      "border-0",
      "text-primary",
      "fw-semibold"
    );
    showMoreButton.setAttribute("id", "show-more-button");
    showMoreButton.textContent = "... Show More";
    showMoreButton.addEventListener("click", function () {
      const hiddenContentElement = postText.querySelector(".hidden-content");
      if (hiddenContentElement.style.display === "none" || hiddenContentElement.style.display === "") {
        hiddenContentElement.style.display = "inline";
        showMoreButton.textContent = "... Show Less";
      } else {
        hiddenContentElement.style.display = "none";
        showMoreButton.textContent = "... Show More";
      }
    });
    postText.appendChild(showMoreButton);
  } else {
    showMoreButton.classList.add("d-none");
  }

  authorDiv.appendChild(avatarDiv);
  authorDiv.appendChild(postContentDiv);
  postContentDiv.appendChild(authorInfoDiv);
  postContentDiv.appendChild(postDate);
  viewPostLink.appendChild(postMedia);
  postContentDiv.appendChild(viewPostLink);
  postContentDiv.appendChild(postText);
  postText.appendChild(showMoreButton);
  postContentDiv.appendChild(postText);

  const hr = document.createElement("hr");

  const reactionCountElement = document.createElement("div");
  reactionCountElement.classList.add("reaction-count", "text-primary", "ms-1", "pb-1");
  const commentsCount = post._count.comments;
  let reactionsCount = 0;
  if (post.reactions && post.reactions.length > 0) {
    reactionsCount = post.reactions[0].count;
  }
  reactionCountElement.textContent = `${reactionsCount} Likes, ${commentsCount} Comments`;
  reactionCountElement.innerHTML = `<i class="me-1 bi bi-hand-thumbs-up"></i> ${reactionsCount} Likes <i class="ms-5 me-1 bi bi-chat-dots"></i> ${commentsCount} Comments `;

  const buttonLikesRow = document.createElement("div");
  buttonLikesRow.classList.add("d-flex", "justify-content-between");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("card-text");

  const likeButton = document.createElement("button");
  likeButton.classList.add("btn", "btn-warning", "btn-sm", "my-1", "mx-1");
  likeButton.innerHTML = `<i class="bi bi-hand-thumbs-up"></i> Like`;

  likeButton.addEventListener("click", async () => {
    try {
      const reactToPostURL = `${API_BASE_URL}/social/posts/${post.id}/react/👍`;

      const response = await fetch(reactToPostURL, reactionOptions);
      if (response.ok) {
        reactionsCount++;
        likesCount.innerHTML = `<i class="bi bi-hand-thumbs-up-fill text-primary"></i> ${reactionsCount} Likes`; // Update the UI
        likeButton.disabled = true;
      } else {
        console.error("Failed to add like to the post.");
      }
    } catch (error) {
      console.error("An error occurred while adding a like:", error);
    }
  });

  const commentButton = document.createElement("button");
  commentButton.classList.add("btn", "btn-warning", "btn-sm", "my-1", "mx-1");
  commentButton.innerHTML = `<i class="bi bi-chat-dots"></i> Comment`;

  buttonContainer.appendChild(likeButton);
  buttonContainer.appendChild(commentButton);

  const likesRepliesContainer = document.createElement("div");
  likesRepliesContainer.classList.add("col-sm-5", "d-flex", "ps-0", "justify-content-sm-end");

  const likesRepliesDiv = document.createElement("div");
  likesRepliesDiv.classList.add("d-flex", "gap-3", "ms-3", "pt-2", "align-items-center");

  const likesCount = document.createElement("div");
  likesCount.classList.add("card-text", "text-muted", "py-0");
  likesCount.innerHTML = `<i class="bi bi-hand-thumbs-up-fill text-primary"></i> ${reactionsCount} likes`;

  const repliesCount = document.createElement("div");
  repliesCount.classList.add("card-text", "text-muted", "py-0");
  repliesCount.innerHTML = `<i class="bi bi-chat-dots text-primary"></i> ${commentsCount} comments`;

  likesRepliesDiv.appendChild(likesCount);
  likesRepliesDiv.appendChild(repliesCount);
  likesRepliesContainer.appendChild(likesRepliesDiv);

  cardBody.appendChild(authorDiv);
  cardBody.appendChild(hr);
  cardBody.appendChild(buttonLikesRow);
  buttonLikesRow.appendChild(buttonContainer);
  buttonLikesRow.appendChild(likesRepliesContainer);

  card.appendChild(cardBody);

  return card;
}

document.addEventListener("click", (event) => {
  if (!event.target.classList.contains("more-button")) {
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");
    dropdownMenus.forEach((menu) => {
      menu.classList.remove("show");
    });
  }
});

async function handlePostCardClick(event) {
  const card = event.currentTarget;

  const postId = card.getAttribute("data-post-id");
  const authorName = card.querySelector(".view-profile-link").dataset.authorname;

  localStorage.setItem("postId", postId);
  localStorage.setItem("authorName", authorName);

  if (authorName !== loggedInUser) {
    localStorage.setItem("isLoggedIn", false);
  } else if (authorName === loggedInUser) {
    localStorage.setItem("isLoggedIn", true);
  }
}

function handlePostCardMouseLeave(event) {
  const card = event.currentTarget;
  const authorName = card.querySelector(".view-profile-link").dataset.authorname; // Get the author"s name from the data attribute

  if (authorName !== loggedInUser) {
    localStorage.setItem("isLoggedIn", false);
  } else if (authorName === loggedInUser) {
    localStorage.setItem("isLoggedIn", true);
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("dropdown-item")) {
    handleDeleteClick(event);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("/feed/")) {
    const createPostForm = document.getElementById("createPostForm");
    const createPostLink = document.querySelector('[data-bs-target="#createPostForm"]');
    const createButton = document.getElementById("createButton");
    const createButtonLeft = document.getElementById("createButtonLeft");
    const chevronUp = createPostLink.querySelector(".bi-chevron-up");
    const chevronDown = createPostLink.querySelector(".bi-chevron-down");
    let isFormExpanded = false;

    createPostLink.addEventListener("click", function (event) {
      event.preventDefault();

      if (isFormExpanded) {
        // Form is currently open, so hide it
        createButton.classList.remove("bg-warning");
        createButtonLeft.classList.remove("bg-warning");
        createPostForm.classList.remove("show");
        chevronUp.style.display = "none";
        chevronDown.style.display = "inline"; // Show the down chevron
      } else {
        // Form is closed, so show it
        createButton.classList.add("bg-warning");
        createButtonLeft.classList.add("bg-warning");
        createPostForm.classList.add("show");
        chevronUp.style.display = "inline"; // Show the up chevron
        chevronDown.style.display = "none";
      }

      isFormExpanded = !isFormExpanded;
    });

  }
});
