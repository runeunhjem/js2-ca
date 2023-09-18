export const API_BASE_URL = "https://api.noroff.dev";
export const loggedInUser = localStorage.getItem("loggedInUser");
export const postForm = document.getElementById("postForm");
export const createPostURL = `${API_BASE_URL}/api/v1/social/posts`;
export const postsURL = `${API_BASE_URL}/api/v1/social/posts?limit=10&_comments=true&_author=true&_reactions=true&_count=true`;
// export const postsURL = `${API_BASE_URL}/api/v1/social/posts?limit=10&offset=259&_comments=true&_author=true&_reactions=true&_count=true`;
// export const profileURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_following=true&_followers=true&_posts=true`;
// export const reactionsAndCommentsURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_reactions=true&_comments=true&_count=true`;
export const token = localStorage.getItem("accessToken");
export const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));

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
export const editPostOptions = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // body: JSON.stringify(newPostData),
};
