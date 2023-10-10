export const API_BASE_URL = "https://api.noroff.dev/api/v1";
export const registerURL = `${API_BASE_URL}/social/auth/register`;
export const loginURL = `${API_BASE_URL}/social/auth/login`;
export const loggedInUser = localStorage.getItem("loggedInUser");
export const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));
export const currentProfileName = localStorage.getItem("currentProfileName");
export const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
export const authorUserData = JSON.parse(localStorage.getItem("authorUserData"));
export const isFollowing = localStorage.getItem("isFollowing");
export const isLoggedIn = localStorage.getItem("isLoggedIn");
export const host = "api.noroff.dev";
export const postForm = document.getElementById("postForm");
export const createPostURL = `${API_BASE_URL}/social/posts`;
export const postsURL = `${API_BASE_URL}/social/posts?limit=10&offset=0&_comments=true&_author=true&_reactions=true&_count=true`;
// export const postsURL = `${API_BASE_URL}/social/posts?limit=10&offset=113&_comments=true&_author=true&_reactions=true&_count=true`;
export const followURL = `${API_BASE_URL}/social/profiles/${currentProfileName}/follow`;
export const unfollowURL = `${API_BASE_URL}/social/profiles/${currentProfileName}/unfollow`;
export const profileFollowButton = document.getElementById("loggedInProfileFollow");
export const followText = document.getElementById("follow-text");
export const urlParams = new URLSearchParams(window.location.search);
export const nameParam = urlParams.get("name");

let URLProfilename = null;
if (nameParam) {
  URLProfilename = nameParam;
}
export { URLProfilename };

export const profileURL = `${API_BASE_URL}/social/profiles/${URLProfilename}?_following=true&_followers=true&_posts=true`;
export const profilePostsURL = `${API_BASE_URL}/social/profiles/${URLProfilename}/posts?_following=true&_followers=true&_posts=true&_comments=true&_author=true&_reactions=true`;
export const reactionsAndCommentsURL = `${API_BASE_URL}/social/profiles/${URLProfilename}?_reactions=true&_comments=true&_count=true`;
export const token = localStorage.getItem("accessToken");
export const currentProfilePosts = JSON.parse(localStorage.getItem("currentProfilePosts"));
// export const searchURL = `${API_BASE_URL}/social/posts?&limit=100&offset=0&_comments=true&_author=true&_reactions=true&_count=true`;
export const searchURL = `${API_BASE_URL}/social/posts?_comments=true&_author=true&_reactions=true&_count=true`;
export const profilePostsData = JSON.parse(localStorage.getItem("profilePostsData"));
export const postId = localStorage.getItem("postId");
export const getSinglePostURL = `https://api.noroff.dev/api/v1/social/posts/${postId}?_comments=true&_author=true&_reactions=true`;
export const authorName = localStorage.getItem("authorName");
export const profileLinks = document.querySelectorAll(".profile-link");

export const clickHandler = (event) => {
  event.preventDefault();
  const originalHref = `../profile/index.html?name=${loggedInUser}`;
  if (originalHref) {
    event.target.href = `../profile/index.html?name=${loggedInUser}`; // Modify the href
  }
  event.target.href = `${originalHref}`;
  window.location.href = event.target.href;
};

export const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // body: "Test in fetch body",
};

export const addNewPostOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // body: JSON.stringify(newPostData),
};

export const addNewCommentURL = `${API_BASE_URL}/social/posts/${postId}/comment`;
export const newCommentOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: "What an awesome movie! Recommended", // Required
  // "replyToId": 0 // Optional - Only required if replying to another comment
};

export const editPostOptions = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: {
    //Get these values from the form (postForm? edit in addNewPost?)
    title: "string",
    body: "string",
    tags: ["string"],
    media: "https://url.com/image.jpg",
    // body: JSON.stringify(postData),
  },
};

export const reactToPostURL = `${API_BASE_URL}/social/posts/${postId}/react/👍`;
export const reactionOptions = {
  method: "PUT",
  headers: {
    host: host, // Gave error without this
    Authorization: `Bearer ${token}`,
  },
  // body: {
  //   // body: "", // Required - remember the 👍 in the put url
  //   // replyToId: 0, // Optional - Only required if replying to another comment
  // },
};

export const deletePostURL = `${API_BASE_URL}/social/posts/${postId}`;
export const deletePostOptions = {
  method: "DELETE",
  headers: {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // body: JSON.stringify(newPostData),
};

export const followUserURL = `${API_BASE_URL}/social/posts/${authorName}/follow`;
export const unFollowUserURL = `${API_BASE_URL}/social/posts/${authorName}/unfollow`;
if (!authorName && currentProfileName) {
  localStorage.setItem("authorName", currentProfileName);
}
export const followOptions = {
  method: "PUT",
  headers: {
    host: host, // Nescessary ???
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // body: JSON.stringify(newPostData),
};
