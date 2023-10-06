import {
  API_BASE_URL,
  currentProfileName,
  authorUserData,
  loggedInUser,
  postsURL,
  reactionOptions,
} from "../variables/consts.mjs";
// export const urlParams = new URLSearchParams(window.location.search);
// const URLProfilename = urlParams.get("name");
import { deletePost } from "./delete-posts.mjs";

export function createPostCard(post) {
  const spinner = document.querySelector(".spinner-border");
  spinner.classList.add("d-none");

  const card = document.createElement("div");
  card.classList.add("card", "mx-0", "my-3", "bg-info", "shadow-sm");
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
    // Replace the failed image with a default placeholder image
    // const uniqueQueryParam = Math.floor(Math.random() * (500 - 200 + 1) + 100);
    avatarImg.src = `https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg`;
    // avatarImg.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
  };

  // Check if the author"s avatar exists and set the src attribute
  if (post.author && post.author.avatar) {
    // avatarImg.src = post.author.avatar;
    avatarImg.src = post.author.avatar;
    // console.log(`post.media (Avatar): ${post.media}`);
  } else {
    // Use Picsum placeholder if avatar isn"t there
    // const uniqueQueryParam = Math.floor(Math.random() * (500 - 200 + 1) + 100);
    avatarImg.src = `https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg`;
    // avatarImg.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
  }

  avatarDiv.appendChild(avatarImg);

  const postContentDiv = document.createElement("div");
  postContentDiv.classList.add("col-8", "col-sm-10", "ms-sm-2", "justify-content-start");

  const authorInfoDiv = document.createElement("div");
  authorInfoDiv.classList.add("d-block", "d-sm-flex", "align-items-center");

  const authorName = document.createElement("h6");
  authorName.classList.add("d-block", "d-sm-flex", "card-title", "mb-0", "me-1", "ps-1");

  authorName.setAttribute("data-authorname", post.author.name); // Set the actual author"s name as the attribute value
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
    "justify-content-start"
    // "position-absolute",
    // "top-0",
    // "start-0"
  );
  moreButton.style.textAlign = "left";
  moreButton.setAttribute("data-bs-toggle", "dropdown");
  moreButton.setAttribute("aria-expanded", "false");
  moreButton.innerHTML = `<i class="bi bi-three-dots-vertical"></i> More`;
  // The button dropdown menu

  // Attach event listener to the "More" button
  moreButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the event from reaching the document click event

    const dropdownMenu = event.target.nextElementSibling; // Get the dropdown menu
    dropdownMenu.classList.toggle("show"); // Toggle the dropdown menu"s visibility
  });

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu", "bg-info", "shadow", "border-0");

  // Menu items
  const menuItems = ["Edit", "Delete", "Share"];

  menuItems.forEach((itemText) => {
    const menuItem = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.type = "button";
    button.textContent = itemText;
    menuItem.appendChild(button);
    dropdownMenu.appendChild(menuItem);
  });

  moreButton.appendChild(dropdownMenu);
  card.appendChild(moreButton);

  // Create an element for the post ID
  const postIdElement = document.createElement("div");
  postIdElement.setAttribute("data-post-id", post.id);
  postIdElement.classList.add("post-id", "position-absolute", "top-0", "end-0", "p-2", "text-muted", "fs-0");
  postIdElement.textContent = `ID: ${post.id}`;

  // Append the post ID element to the card
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

    // Get author"s name in the link"s data attribute
    const authorName = viewProfileLink.dataset.authorname;
    console.log(authorName);

    // Store the author"s name in localStorage
    localStorage.setItem("currentProfileName", authorName);
    console.log(`currentProfileName: ${authorName}`);

    // Redirect to the profile page
    // const urlParams = new URLSearchParams(window.location.search);
    // const URLProfilename = urlParams.get("name");
    window.location.href = `../profile/index.html?name=${encodeURIComponent(post.author.name)}`;
  });

  authorInfoDiv.appendChild(authorName);
  authorInfoDiv.appendChild(viewProfileLink);

  const postDate = document.createElement("p");
  postDate.classList.add("card-subtitle", "mb-1", "text-muted", "ps-1");
  const createdDate = new Date(post.created);
  postDate.textContent = createdDate.toLocaleString();

  const viewPostLink = document.createElement("a");
  viewPostLink.classList.add("nav-link", "text-primary", "m-0", "p-2", "view-post-link", "align-items-start", "d-block");
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

  // Check if the current page is "post.html"
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

  const maxWords = 4; // Adjust the maximum number of words to display

  const words = post.body ? post.body.split(" ") : [];
  const visibleContent = words.slice(0, maxWords).join(" ");
  // console.log(`Visible Content: ${visibleContent}`);
  const hiddenContent = words.slice(maxWords).join(" ");

  postText.innerHTML = `${visibleContent} <span class="hidden-content">${hiddenContent}</span>`;

  // Create an image element
  const postMedia = document.createElement("img");
  postMedia.classList.add("card-media", "m-1", "p-2", "rounded", "shadow");
  postMedia.src = post.media; // Set the image source URL
  // console.log(`post.media: ${post.media}`);
  postMedia.alt = "Post Image"; // Set the image alt attribute
  postMedia.style.width = "100%"; // Set the image width
  // postMedia.style.height = "50%"; // Set the image width
  // postMedia.style.maxHeight = "200px"; // Set the image width
  postMedia.onerror = () => {
    // Replace the failed image with a default placeholder image
    const uniqueQueryParam = Math.floor(Math.random() * (500 - 200 + 1) + 100);
    postMedia.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
  };

  if (window.location.href.includes("/feed/index.html")) {
    postMedia.style.width = "100px";
    postMedia.classList.add("ms-3");
    viewPostLink.style.setProperty("class", "align-items-start", "important");
    viewPostLink.classList.add("align-items-start", "ps-2");
  }

  const showMoreButton = document.createElement("button");
  if (words.length > maxWords) {
    // const showMoreButton = document.createElement("button");
    showMoreButton.classList.add(
      "btn",
      "btn-none",
      "btn-sm",
      "m-0",
      // "shadow-sm",
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

  // Add an event listener to the "Like" button
  likeButton.addEventListener("click", async () => {
    try {
      console.log(`postId: ${post.id}`);
      const reactToPostURL = `${API_BASE_URL}/social/posts/${post.id}/react/👍`; // REMEMBER the icon itself
      console.log(`reactToPostURL: ${reactToPostURL}`);
      // Make an API request to add the reaction
      const response = await fetch(reactToPostURL, reactionOptions);
      if (response.ok) {
        reactionsCount++; // Increment the reactions count
        likesCount.innerHTML = `<i class="bi bi-hand-thumbs-up-fill text-primary"></i> ${reactionsCount} Likes`; // Update the UI
        likeButton.disabled = true;
      } else {
        // Handle error response from the API
        console.error("Failed to add like to the post.");
      }
    } catch (error) {
      // Handle any network or API request errors
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

// Attach a click event listener to the document to handle clicks on dropdown items
document.addEventListener("click", (event) => {
  if (!event.target.classList.contains("more-button")) {
    // Check if the clicked element is not the "More" button
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");
    dropdownMenus.forEach((menu) => {
      menu.classList.remove("show"); // Close all open dropdown menus
    });
  }
});

// Function to handle the "Delete" action
function handleDeleteClick(event) {
  console.log(event);
  const menuItem = event.target.textContent;
  if (menuItem === "Delete") {
    const postElement = event.target.closest(".post");
    if (postElement) {
      const postId = postElement.getAttribute("data-post-id");
      localStorage.setItem("postId", postId);
      // Call your deletePost function here if needed
      deletePost(postId);
    }
  }
}
// // handleDeleteClick();

async function handlePostCardClick(event) {
  const card = event.currentTarget; // Get the clicked postCard element
  // console.log("card is: ", card );
  const postId = card.getAttribute("data-post-id"); // Extract postId from data attribute
  const authorName = card.querySelector(".view-profile-link").dataset.authorname; // Get the author"s name from the data attribute

  // Store postId in localStorage
  localStorage.setItem("postId", postId);
  localStorage.setItem("authorName", authorName);

  if (authorName !== loggedInUser) {
    localStorage.setItem("isLoggedIn", false);
  } else if (authorName === loggedInUser) {
    localStorage.setItem("isLoggedIn", true);
  }
}
function handlePostCardMouseLeave(event) {
  const card = event.currentTarget; // Get the clicked postCard element
  const authorName = card.querySelector(".view-profile-link").dataset.authorname; // Get the author"s name from the data attribute
  // const postId = card.getAttribute("data-post-id"); // Extract postId from data attribute
  // Remove postId in localStorage
  // localStorage.removeItem("postId");
  // localStorage.removeItem("authorName");

  if (authorName !== loggedInUser) {
    localStorage.setItem("isLoggedIn", false);
  } else if (authorName === loggedInUser) {
    localStorage.setItem("isLoggedIn", true);
  }
}

// // Attach the event listener to a common parent element or document
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("dropdown-item")) {
    handleDeleteClick(event);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Check if the current page is within the /feed/ folder
  if (window.location.pathname.includes("/feed/")) {
    const createPostForm = document.getElementById("createPostForm");
    const createPostLink = document.querySelector('[data-bs-target="#createPostForm"]');
    const createButton = document.getElementById("createButton");
    const createButtonLeft = document.getElementById("createButtonLeft");
    const chevronUp = createPostLink.querySelector(".bi-chevron-up");
    const chevronDown = createPostLink.querySelector(".bi-chevron-down");

    let isFormExpanded = false;

    // Toggle the collapse state when the link is clicked
    createPostLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the link from navigating

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
