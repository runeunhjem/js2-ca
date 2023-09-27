/**
 * Function to create a new post
 * @param {string} url
 * @param {object} options
 * 
 */
export async function createNewPost(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const newPost = await response.json();
      console.log("New Post Created: ", newPost);
    } else {
      console.error("Failed to create a new post");
    }
  } catch (error) {
    console.error(error);
  }
}
