import { API_BASE_URL, loggedInUser, reactionOptions, token, fetchOptions } from "../variables/consts.mjs";
import { deletePost } from "./delete-posts.mjs";
import { editPost } from "./do-edit-posts.mjs";

/**
 * Create a post card element based on the given post data.
 *
 * @param {Object} post - The post data object.
 * @returns {HTMLElement} - The post card element.
 */
export function createPostCard(post) {
  // Hide the spinner when the cards start loading
  const spinner = document.querySelector(".spinner-border");
  spinner.classList.add("d-none");
  // Check if the post is created by the logged in user
  const isLoggedIn = post.author && post.author.name === loggedInUser;

  // Every post card on all my pages use this same HTML structure
  const card = document.createElement("div");
  card.classList.add("card", "post-card", "mx-0", "my-3", "bg-info", "shadow-sm", "smooth");
  card.setAttribute("data-post-id", post.id);
  card.addEventListener("mouseover", handlePostCardClick);
  card.addEventListener("mouseleave", handlePostCardMouseLeave);
  card.addEventListener("click", handlePostCardClick);
  // Content under the options button
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "container");
  // Info on the creator of the post
  const authorDiv = document.createElement("div");
  authorDiv.classList.add("d-flex", "align-items-start", "justify-content-center", "smooth");
  // Profile avater
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

  // Right of the avatar image - the card content
  const postContentDiv = document.createElement("div");
  postContentDiv.classList.add("col-8", "col-sm-10", "ms-sm-2", "justify-content-start");

  // Name and View profile link
  const authorInfoDiv = document.createElement("div");
  authorInfoDiv.classList.add("d-block", "d-sm-flex", "align-items-center");

  // Name of the author
  const authorName = document.createElement("h6");
  authorName.classList.add("d-block", "d-sm-flex", "card-title", "mb-0", "me-1", "ps-1");
  authorName.setAttribute("data-authorname", post.author.name);
  authorName.textContent = post.author.name;

  // Header / options button
  const moreButton = document.createElement("button");
  moreButton.classList.add(
    "btn",
    "btn-warning",
    "btn-sm",
    "mt-0",
    "pb-2",
    "align-items-center",
    "mx-auto",
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

  // Options menu
  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu", "bg-info", "shadow", "border-0", "smooth");
  dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton1");

  const menuItems = [];

  if (isLoggedIn) {
    // Only add "Edit" and "Delete" options if the user is logged in
    menuItems.push({ text: "Edit", className: "edit-button" }, { text: "Delete", className: "delete-button" });
  }

  // Always add the "Share" option
  menuItems.push({ text: "Share", className: "share-link", href: "https://www.websiteplanet.com/webtools/sharelink/" });
  // The menu items
  menuItems.forEach((menuItemData) => {
    const menuItem = document.createElement("li");

    if (menuItemData.className === "share-link") {
      const link = document.createElement("a");
      link.classList.add("dropdown-item", "share-button");
      link.href = menuItemData.href;
      link.target = "_blank";
      link.textContent = menuItemData.text;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(link.href, "_blank");
      });
      menuItem.appendChild(link);
    } else {
      const button = document.createElement("button");
      button.classList.add("dropdown-item", menuItemData.className);
      button.type = "button";
      button.textContent = menuItemData.text;
      menuItem.appendChild(button);
    }

    dropdownMenu.appendChild(menuItem);
  });
  // Only fires if the logged in user is the author of the post
  if (isLoggedIn) {
    const deleteButton = dropdownMenu.querySelector(".delete-button");
    deleteButton.addEventListener("click", (event) => {
      deletePost(post.id);
    });
    const editButton = dropdownMenu.querySelector(".edit-button");
    editButton.addEventListener("click", (event) => {
      editPostForm.classList.remove("d-none");
      editPostForm.classList.add("smooth");
      editPostForm.scrollIntoView({ behavior: "smooth" });
    });
  }

  moreButton.appendChild(dropdownMenu);

  // Create an empty div for the edit form with the default classes and hide it
  const editPostForm = document.createElement("div");
  editPostForm.classList.add(
    "edit-post",
    "d-none",
    "smooth",
    "w-75",
    "mx-auto",
    "border-bottom",
    "border-1",
    "border-secondary"
  );

  // Edit post header: const postId = card.getAttribute("data-post-id");
  const editHeader = document.createElement("h6");
  const postId = post.id;
  editHeader.classList.add("edit-title", "mt-4", "text-center");
  editHeader.textContent = "Edit Post # " + postId;

  // Create an input field for movie title
  const movieTitleInput = document.createElement("input");
  movieTitleInput.setAttribute("type", "text");
  movieTitleInput.setAttribute("placeholder", "Movie Title");
  movieTitleInput.classList.add("form-control", "my-2", "movie-title-input");
  movieTitleInput.value = post.title; // Get the initial value

  // Create an input field for movie cover
  const movieCoverInput = document.createElement("input");
  movieCoverInput.setAttribute("type", "text");
  movieCoverInput.setAttribute("placeholder", "Movie Cover URL");
  movieCoverInput.classList.add("form-control", "my-2", "movie-cover-input");
  movieCoverInput.value = post.media; // Get the initial value

  // Create an input field for tags
  const tagsInput = document.createElement("input");
  tagsInput.setAttribute("type", "text");
  tagsInput.setAttribute("placeholder", "Movie categories (Comma-separated)");
  tagsInput.classList.add("form-control", "my-2", "tags-input");
  tagsInput.value = post.tags.join(", "); // Get the initial value

  // Create a textarea for the new post body
  const newPostBodyTextarea = document.createElement("textarea");
  newPostBodyTextarea.setAttribute("placeholder", "Post Body");
  newPostBodyTextarea.classList.add("form-control", "my-2", "new-post-body-textarea");
  newPostBodyTextarea.value = post.body; // Get the initial value

  // The submit button
  const doEditButton = document.createElement("button");
  doEditButton.setAttribute("type", "button");
  doEditButton.classList.add("btn", "btn-warning", "btn-sm", "my-2", "ms-3", "do-edit-button");
  doEditButton.textContent = "Submit";
  // The close button
  const closeEditButton = document.createElement("button");
  closeEditButton.setAttribute("type", "button");
  closeEditButton.classList.add("btn", "btn-warning", "btn-sm", "my-2", "ms-3", "close-edit-button");
  closeEditButton.textContent = "Close";

  // Append input fields and buttons to the editPostForm
  editPostForm.appendChild(editHeader);
  editPostForm.appendChild(movieTitleInput);
  editPostForm.appendChild(movieCoverInput);
  editPostForm.appendChild(tagsInput);
  editPostForm.appendChild(newPostBodyTextarea);
  editPostForm.appendChild(doEditButton);
  editPostForm.appendChild(closeEditButton);

  // Close the edit form
  closeEditButton.addEventListener("click", () => {
    editPostForm.classList.add("d-none");
    card.scrollIntoView({ behavior: "smooth" });
  });

  // Submit the form
  doEditButton.addEventListener("click", async () => {
    // Get the values from the input fields
    const movieTitle = movieTitleInput.value;
    const movieCover = movieCoverInput.value;
    const tags = tagsInput.value;
    const newPostBody = newPostBodyTextarea.value;

    // Use the postId from the editPostForm directly
    const postId = post.id;
    const authorName = localStorage.getItem("authorName");
    editPost(editPostForm, postId, movieTitle, movieCover, tags, newPostBody, authorName);

    // Hide the edit form when i submit it
    editPostForm.classList.add("d-none");
  });

  card.appendChild(moreButton);
  // The form slides down under the header
  card.appendChild(editPostForm);

  // Post ID always top right of card
  const postIdElement = document.createElement("div");
  postIdElement.setAttribute("data-post-id", post.id);
  postIdElement.classList.add("post-id", "position-absolute", "top-0", "end-0", "p-2", "pt-1", "text-muted", "fs-0");
  postIdElement.textContent = `ID: ${post.id}`;
  if (isLoggedIn) {
    postIdElement.classList.add("text-success", "fw-bold");
    postIdElement.classList.remove("text-muted");
  }
  card.appendChild(postIdElement);

  // See post's author's profile
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

  // Creation date of the post
  const postDate = document.createElement("p");
  postDate.classList.add("card-subtitle", "mb-1", "text-muted", "ps-1");
  const createdDate = new Date(post.created);
  postDate.textContent = createdDate.toLocaleString();

  // View single post link
  const viewPostLink = document.createElement("a");
  viewPostLink.classList.add("d-flex", "nav-link", "text-primary", "m-0", "p-2", "flex-wrap", "align-items-start", "pt-2");

  // If the page is a profile page, add these classes
  if (window.location.href.includes("/profile/")) {
    viewPostLink.classList.add("d-block", "d-sm-flex", "align-items-center");
    viewPostLink.innerHTML = `<i class="bi bi-film me-1 mt-0 m-sm-1 mt-sm-1"></i>`;
  }

  // single post page URL
  const postPageURL = `../feed/post.html?postId=${post.id}`;
  viewPostLink.href = postPageURL;

  // Create a span for the post title with a custom class
  const titleSpan = document.createElement("span");
  titleSpan.classList.add("movie-title");
  titleSpan.appendChild(document.createTextNode(post.title));

  // Movie Title (post title)
  viewPostLink.appendChild(titleSpan);

  // If the page is the single post page, Disable the link and mute the text color
  if (window.location.pathname.includes("post.html")) {
    viewPostLink.classList.add(
      "d-block",
      "d-sm-flex",
      "align-items-center",
      "disabled-link",
      "text-muted",
      "fw-bold",
      "pt-0"
    );
    viewPostLink.innerHTML = `<i class="bi bi-film me-1 mt-0 m-sm-1 mt-sm-1"></i>`;
    // Create a span for the post title with a custom class
    const disabledTitleSpan = document.createElement("span");
    disabledTitleSpan.classList.add("movie-title", "text-muted");
    disabledTitleSpan.appendChild(document.createTextNode(post.title));

    // Append the disabledTitleSpan to the viewPostLink
    viewPostLink.appendChild(disabledTitleSpan);

    viewPostLink.removeAttribute("href");
    viewPostLink.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("You are already on the post page.");
    });
  }

  // Displaying categories (tags)
  const categoriesElement = document.createElement("p");
  categoriesElement.classList.add("post-tags", "my-0", "ps-1", "text-white", "bg-dark", "visible-content");

  if (post.tags && post.tags.length > 0) {
    // Create a string containing the tags with commas
    const tagsString = post.tags.join(", ");
    const categoriesText = document.createElement("strong");
    categoriesText.classList.add("text-white", "ps-0");
    categoriesText.textContent = "Categories:";
    categoriesElement.appendChild(categoriesText);
    categoriesElement.appendChild(document.createTextNode(` ${tagsString}`));
  } else {
    categoriesElement.innerHTML = "<strong>Categories:</strong> No categories available";
  }

  // Post body text
  const postText = document.createElement("p");
  postText.classList.add("card-text", "my-0", "ps-2", "visible-content");

  const maxWords = 4; // The maximum number of words to display before the "Show More" button
  const words = post.body ? post.body.split(" ") : [];
  const visibleContent = words.slice(0, maxWords).join(" ");
  const hiddenContent = words.slice(maxWords).join(" ");

  // Create the visible content
  const visibleContentElement = document.createTextNode(visibleContent);

  // Create a space element
  const spaceElement = document.createTextNode(" "); // A space

  // Create the hidden content
  const hiddenContentElement = document.createElement("span");
  hiddenContentElement.className = "hidden-content smooth";
  hiddenContentElement.textContent = hiddenContent;

  // Append elements to the postText
  postText.appendChild(visibleContentElement);
  postText.appendChild(spaceElement); // Add a space between the visible and hidden content
  postText.appendChild(hiddenContentElement);

  const postMedia = document.createElement("img");
  postMedia.classList.add("card-media", "m-1", "p-2", "rounded", "shadow");
  postMedia.alt = "Post Image";
  postMedia.style.width = "100%";
  postMedia.style.maxHeight = "100%";
  postMedia.style.maxWidth = "100%";
  postMedia.onerror = (event) => {
    event.preventDefault();
    // Image failed to load, load a fallback image
    const uniqueQueryParam = Math.floor(Math.random() * (500 - 200 + 1) + 100);
    if (postMedia.src !== `https://picsum.photos/id/${uniqueQueryParam}/200/300`) {
      postMedia.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
    } else if (postMedia.src !== `https://picsum.photos/id/${uniqueQueryParam}/200/300`) {
      postMedia.src = `https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80.jpg`;
    }
  };
  // If the post has a media property, use it as the image source
  if (post.media) {
    postMedia.src = post.media;
    // If not, load a random image from picsum
  } else {
    const uniqueQueryParam = Math.floor(Math.random() * (500 - 200 + 1) + 100);
    if (postMedia.src !== `https://picsum.photos/id/${uniqueQueryParam}/200/300`) {
      postMedia.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
    }
    if (postMedia.src !== `https://picsum.photos/id/${uniqueQueryParam}/200/300`) {
      postMedia.src = `https://picsum.photos/id/${uniqueQueryParam}/200/300`;
    }
  }
  // If the page is the single post page, change the image size
  if (window.location.href.includes("/feed/") && !window.location.href.includes("post.html")) {
    postMedia.style.width = "100px";
    postMedia.classList.add("ms-3");
    viewPostLink.style.setProperty("class", "align-items-start");
    viewPostLink.classList.add("align-items-start", "ps-2");
  }

  // Show more button
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

  // Append the elements to the card in the right order
  authorDiv.appendChild(avatarDiv);
  authorDiv.appendChild(postContentDiv);
  postContentDiv.appendChild(authorInfoDiv);
  postContentDiv.appendChild(postDate);
  viewPostLink.appendChild(postMedia);
  postContentDiv.appendChild(viewPostLink);
  postContentDiv.appendChild(postText);
  postText.appendChild(showMoreButton);
  postContentDiv.appendChild(postText);

  // Append the categories to the divider (Same color so it looks like it's part of the categories)
  const hr = document.createElement("hr");
  hr.classList.add("p-0");
  hr.appendChild(categoriesElement);

  // Likes & comments section
  const reactionCountElement = document.createElement("div");
  reactionCountElement.classList.add("reaction-count", "text-primary", "ms-1", "pb-1");
  let commentsCount = post._count.comments;
  let reactionsCount = 0;
  if (post.reactions && post.reactions.length > 0) {
    reactionsCount = post.reactions[0].count;
  }
  reactionCountElement.textContent = `${reactionsCount} Likes, ${commentsCount} Comments`;
  reactionCountElement.innerHTML = `<i class="me-1 bi bi-hand-thumbs-up"></i> ${reactionsCount} Likes <i class="ms-5 me-1 bi bi-chat-dots"></i> ${commentsCount} Comments `;

  const buttonLikesRow = document.createElement("div");
  buttonLikesRow.classList.add("d-flex", "justify-content-between");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("card-text", "col-sm-5");

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
  likesRepliesContainer.classList.add("col-sm-5", "d-flex", "ps-0", "col-sm-7", "justify-content-sm-end");

  const likesRepliesDiv = document.createElement("div");
  likesRepliesDiv.classList.add("d-flex", "gap-3", "ms-3", "pt-2", "align-items-center");

  const likesCount = document.createElement("div");
  likesCount.classList.add("card-text", "text-muted", "py-0");
  likesCount.innerHTML = `<i class="bi bi-hand-thumbs-up-fill text-primary "></i> ${reactionsCount} likes`;

  const repliesCount = document.createElement("div");
  repliesCount.classList.add("card-text", "text-muted", "py-0", "cursor-pointer", "comments-count");
  repliesCount.innerHTML = `<i class="bi bi-chat-dots text-primary"></i> ${commentsCount} comments`;

  // Comments section
  repliesCount.addEventListener("click", async () => {
    repliesCount.classList.add("d-none");
    const postId = post.id;
    if (commentsCount > 0) {
      try {
        const getSinglePostURL = `${API_BASE_URL}/social/posts/${postId}?_comments=true&_author=true&_reactions=true`;
        const commentsResponse = await fetch(getSinglePostURL, fetchOptions);

        if (commentsResponse.ok) {
          const singlePost = await commentsResponse.json();
          const comments = singlePost.comments;

          // Create a container for comments
          const commentsContainer = document.createElement("div");
          commentsContainer.classList.add(
            "comments-container",
            "mt-3",
            "bg-warning",
            "p-2",
            "text-dark",
            "rounded-3",
            "h-100"
          );
          commentsContainer.style.display = "none";
          commentsContainer.style.maxHeight = "500px";
          commentsContainer.style.overflowY = "auto";
          commentsContainer.style.position = "relative";
          // Close button
          const closeButton = document.createElement("div");
          closeButton.classList.add("text-danger", "p-1", "cursor-pointer", "d-block");
          closeButton.style.top = "10px";
          closeButton.style.right = "10px";
          const closeIcon = document.createElement("i");
          closeIcon.classList.add(
            "bi",
            "bi-x",
            "fs-5",
            "text-center",
            "cursor-pointer",
            "shadow",
            "rounded-circle",
            "px-1",
            "py-0",
            "bg-warning"
          );

          closeButton.appendChild(closeIcon);

          // Append the close button to the comments container
          likesCount.appendChild(closeButton);

          // Iterate through the comments and create elements to display them
          comments.forEach((comment) => {
            const commentCard = document.createElement("div");
            commentCard.classList.add("comment-card", "bg-info", "p-2", "mb-2", "text-dark");
            commentCard.setAttribute("data-comment-id", comment.id); // Attach comment ID to the card so i can reply to it

            const commentOwner = document.createElement("div");
            commentOwner.classList.add("text-muted");
            commentOwner.textContent = `User: ${comment.owner}`; // Display the owner's name

            const commentText = document.createElement("div");
            commentText.classList.add("comment-text");
            commentText.textContent = comment.body;

            // *** ADD IF TIME *** // (Added in my notebook)
            const commentLink = document.createElement("a");
            commentLink.classList.add("text-primary", "d-block", "disabled-link", "text-decoration-none");
            commentLink.href = "#";
            commentLink.textContent = "Reply (Coming soon)";
            commentLink.style.pointerEvents = "none";

            // Append the comment owner, comment text, and comment reply link to the comment card
            commentCard.appendChild(commentOwner);
            commentCard.appendChild(commentText);
            commentCard.appendChild(commentLink);

            // Append the comment card to the comments container
            commentsContainer.appendChild(commentCard);
          });

          // Append the comments container to the cardBody
          cardBody.appendChild(commentsContainer);

          // Close the comments container
          closeButton.addEventListener("click", () => {
            if (commentsContainer.style.display === "none") {
              commentsContainer.style.display = "block";
            } else {
              commentsContainer.innerHTML = "";
              commentsContainer.style.display = "none";
              repliesCount.classList.remove("d-none");
              closeButton.classList.add("d-none");
            }
          });

          // Show the comments container (which now includes the comments)
          commentsContainer.style.display = "block";
        } else {
          alert("Something went wrong.");
          console.error("Failed to fetch comments for the post.");
        }
      } catch (error) {
        alert("Something went wrong.", error);
        console.error("An error occurred while fetching comments:", error);
      }
    } else {
      // If there are no comments, display a message
      const noCommentsMessage = document.createElement("p");
      noCommentsMessage.classList.add("text-muted", "text-center", "mt-3");
      noCommentsMessage.textContent = "No comments yet.";
      cardBody.appendChild(noCommentsMessage);
      likesCount.innerHTML = `<i class="bi bi-x-circle text-danger fw-bold"></i>`;
      likesCount.addEventListener("click", () => {
        if (noCommentsMessage.style.display === "none") {
          noCommentsMessage.style.display = "block";
        } else {
          noCommentsMessage.style.display = "none";
          repliesCount.classList.remove("d-none");
          likesCount.innerHTML = `<i class="bi bi-hand-thumbs-up-fill text-primary "></i> ${reactionsCount} likes`;
        }
      });
    }
  });

  likesRepliesDiv.appendChild(likesCount);
  likesRepliesDiv.appendChild(repliesCount);
  likesRepliesContainer.appendChild(likesRepliesDiv);

  cardBody.appendChild(authorDiv);
  cardBody.appendChild(hr);
  cardBody.appendChild(buttonLikesRow);
  buttonLikesRow.appendChild(buttonContainer);
  buttonLikesRow.appendChild(likesRepliesContainer);

  // Create a comment form
  const commentForm = document.createElement("div");
  commentForm.classList.add("comment-form");
  commentForm.style.display = "none"; // Initially hide the form

  // Comment body textarea
  const commentTextArea = document.createElement("textarea");
  commentTextArea.classList.add("form-control", "my-2");
  commentTextArea.placeholder = "Write a comment...";

  // Send button
  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-warning", "btn-sm");
  submitButton.textContent = "Send it!";

  commentForm.appendChild(commentTextArea);
  commentForm.appendChild(submitButton);

  // Append the comment form at the bottom of the card body
  cardBody.appendChild(commentForm);

  // Show the comment form when the comment button is clicked
  commentButton.addEventListener("click", () => {
    if (commentForm.style.display === "none") {
      commentForm.style.display = "block"; // Show the comment form
    } else {
      commentForm.style.display = "none"; // Hide the comment form
    }
  });

  // Submit the comment to the API
  submitButton.addEventListener("click", async () => {
    const commentText = commentTextArea.value; // Get the comment text

    try {
      const addNewCommentURL = `${API_BASE_URL}/social/posts/${postId}/comment`; // Replace postId with the actual post ID
      const newCommentOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Replace token with the actual user token
        },
        body: JSON.stringify({ body: commentText }), // Send the comment text in the request body
      };

      const response = await fetch(addNewCommentURL, newCommentOptions);

      if (response.ok) {
        // Comment submitted successfully
        commentTextArea.value = ""; // Clear the text area
        commentForm.style.display = "none"; // Hide the comment form
        commentsCount++; // Increment the comments count

        // Update the comments count within the post
        const commentsCountElement = card.querySelector(".comments-count");
        if (commentsCountElement) {
          commentsCountElement.textContent = `${commentsCount} Comments`;
        }
      } else {
        alert("Failed to add a new comment.");
        console.error("Failed to add a new comment.");
      }
    } catch (error) {
      alert("Something went wrong.", error);
      console.error("An error occurred while adding a comment:", error);
    }
  });

  card.appendChild(cardBody);

  return card;
}

// Options menu
document.addEventListener("click", (event) => {
  if (!event.target.classList.contains("more-button")) {
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");
    dropdownMenus.forEach((menu) => {
      menu.classList.remove("show");
    });
  }
});

// Sets the post ID and author name in localStorage and checks if it is the logged in user when a post card is clicked
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

// Changes the isLoggedIn value in localStorage if needed when the mouse leaves a post card
function handlePostCardMouseLeave(event) {
  const card = event.currentTarget;
  const authorName = card.querySelector(".view-profile-link").dataset.authorname; // Get the author"s name from the data attribute

  if (authorName !== loggedInUser) {
    localStorage.setItem("isLoggedIn", false);
  } else if (authorName === loggedInUser) {
    localStorage.setItem("isLoggedIn", true);
  }
}

// Deletes a post
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("dropdown-item")) {
    handleDeleteClick(event);
  }
});

// Opens and closes the create new post form
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
