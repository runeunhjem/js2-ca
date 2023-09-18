// let loggedInUser;

export const API_BASE_URL = "https://api.noroff.dev";
export const createPostURL = `${API_BASE_URL}/api/v1/social/posts`;
export const postsURL = `${API_BASE_URL}/api/v1/social/posts?limit=10&offset=125&_comments=true&_author=true&_reactions=true&_count=true`;
// export const profileURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_following=true&_followers=true&_posts=true`;
// export const reactionsAndCommentsURL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}?_reactions=true&_comments=true&_count=true`;
export const token = localStorage.getItem("accessToken");

export const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const newPostData = {
  title: "My New Post", // Required
  body: "This is the body of my new post.", // Optional
  tags: ["Movies", "Actors"], // Optional
  media: "https://url.comhttps://picsum.photos/id/237/200/300", // Optional
};

export const addNewPosthOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(newPostData),
};