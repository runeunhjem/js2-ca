
export const API_BASE_URL = "https://api.noroff.dev/api/v1";
export const loggedInUser = localStorage.getItem("loggedInUser");

export const postForm = document.getElementById("postForm");
export const createPostURL = `${API_BASE_URL}/social/posts`;
export const postsURL = `${API_BASE_URL}/social/posts?limit=10&offset=0&_comments=true&_author=true&_reactions=true&_count=true`;
// export const postsURL = `${API_BASE_URL}/social/posts?limit=10&offset=113&_comments=true&_author=true&_reactions=true&_count=true`;

export const urlParams = new URLSearchParams(window.location.search);
export const userName = urlParams.get("name");
export const profileURL = `${API_BASE_URL}/social/profiles/${userName}?_following=true&_followers=true&_posts=true`;
export const profilePostsURL = `${API_BASE_URL}/social/profiles/${userName}/posts?_following=true&_followers=true&_posts=true&_comments=true&_author=true&_reactions=true`;
export const reactionsAndCommentsURL = `${API_BASE_URL}/social/profiles/${userName}?_reactions=true&_comments=true&_count=true`;
export const token = localStorage.getItem("accessToken");
export const currentProfileName = localStorage.getItem("currentProfileName");
// export const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));
export const currentProfilePosts = JSON.parse(localStorage.getItem("profilePostsData"));
// export const searchURL = `${API_BASE_URL}/social/posts?&limit=10&offset=0&_comments=true&_author=true&_reactions=true&_count=true`;
export const searchURL = `${API_BASE_URL}/social/posts?_comments=true&_author=true&_reactions=true&_count=true`;
export const profilePostsData = JSON.parse(localStorage.getItem("profilePostsData"));

export const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const addNewPostOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // body: JSON.stringify(newPostData),
};

export const commentOptions = {
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
  body: { //Get these values from the form (postForm? edit in addNewPost?)
    title: "string",
    body: "string",
    tags: ["string"],
    media: "https://url.com/image.jpg",
    // body: JSON.stringify(postData),
  },
};
export const reactionOptions = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: {
    body: "", // Required - remember the 👍 in the put url
    replyToId: 0, // Optional - Only required if replying to another comment
  },
};

export const deletePostOptions = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // body: JSON.stringify(newPostData),
};
