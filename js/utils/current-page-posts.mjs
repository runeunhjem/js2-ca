// current-page-posts.mjs
// Function to capture and store the posts currently displayed on the page
export function captureCurrentPagePosts() {
  // Select the posts that are currently displayed on the page (adjust the selector as needed)
  const currentPagePosts = document.querySelectorAll(".post-card");
  console.log("Current Page Posts:", currentPagePosts.length);

  if (!currentPagePosts || currentPagePosts.length === 0) {
    console.warn("No posts found on the current page.");
    return;
  }

  // Convert the NodeList to an array of post data (you can customize this based on your post structure)
  const postsData = Array.from(currentPagePosts).map((post) => {
    const titleElement = post.querySelector(".card-title");
    const bodyElement = post.querySelectorAll(".card-text");
    const tagsElement = post.querySelector(".post-tags");

    const postTitle = titleElement ? titleElement.textContent : "";
    const postBody = bodyElement ? Array.from(bodyElement).map((body) => body.textContent).join(" ") : "";
    const postTags = tagsElement ? tagsElement.textContent.split(", ") : [];

    return {
      title: postTitle.toLowerCase(),
      body: postBody.toLowerCase(),
      tags: postTags.map((tag) => tag.toLowerCase()),
    };
  });

  if (window.location.pathname.includes("/profile/")) {
    const cuurentProfilePosts = localStorage.getItem("currentProfilePosts");
    localStorage.setItem("currentPagePosts", cuurentProfilePosts);
    postsData = JSON.parse(cuurentProfilePosts);
    console.log("postsData: ", postsData);
    return;
  }
  // Store the captured post data in localStorage as "currentPagePosts"
  localStorage.setItem("currentPagePosts", JSON.stringify(postsData));

  // Log the captured posts for debugging purposes
  console.log("Captured Current Page Posts:", postsData);

}

export function waitForPosts() {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // Posts have been added to the DOM
        observer.disconnect(); // Stop observing
        captureCurrentPagePosts(); // Call your function here
        break;
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Call waitForPosts when the page loads
document.addEventListener("DOMContentLoaded", waitForPosts);

// Add an event listener to run the function when the page has finished loading
// document.addEventListener("DOMContentLoaded", captureCurrentPagePosts);
