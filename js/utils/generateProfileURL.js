import { API_BASE_URL } from '../variables/consts.js';
export function generateProfileURL(viewedProfileName, loggedInUser) {
  const baseProfileURL = `${API_BASE_URL}/api/v1/social/profiles/`;

  // Check if viewedProfileName is defined (not null)
  if (viewedProfileName) {
    return `${baseProfileURL}${viewedProfileName}?_following=true&_followers=true&_posts=true`;
  } else {
    return `${baseProfileURL}${loggedInUser}?_following=true&_followers=true&_posts=true`;
  }
}