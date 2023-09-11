//----------------------Request with token----------------------

const postsURL = `${API_BASE_URL}/api/v1/social/posts`;
const token = localStorage.getItem("accessToken");
const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
async function getWithToken(url, options) {
  try {
    const response = await fetch(url, options);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

getWithToken(postsURL, fetchOptions);
