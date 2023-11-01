// ONLY START THIS IF I HAVE TIME !!!

// MAYBE: Use a different file extension for this file (e.g. .js) to avoid CORS issues.
// TMDB? https://developers.themoviedb.org/3/getting-started/introduction
// https://www.themoviedb.org/documentation/api
// https://developers.themoviedb.org/3/movies/get-movie-details
// https://developers.themoviedb.org/3/movies/get-popular-movies
// https://developers.themoviedb.org/3/movies/get-top-rated-movies
// https://developers.themoviedb.org/3/movies/get-upcoming
// https://developers.themoviedb.org/3/movies/get-now-playing
// https://developers.themoviedb.org/3/search/search-movies
// https://developers.themoviedb.org/3/search/search-companies
// https://developers.themoviedb.org/3/search/search-collections
// https://developers.themoviedb.org/3/search/search-keywords
// https://developers.themoviedb.org/3/search/search-collections
// https://developers.themoviedb.org/3/search/search-multi-search
// https://developers.themoviedb.org/3/search/search-tv-shows
// https://developers.themoviedb.org/3/search/search-people
// https://developers.themoviedb.org/3/search/search-networks
// https://developers.themoviedb.org/3/search/search-tv-episodes
// https://developers.themoviedb.org/3/search/search-tv-seasons

// RSS EXAMPLE: (Replace 'YOUR_RSS_FEED_URL_HERE' with the actual URL of the RSS feed you want to use.
// Find RSS feeds for many websites by searching for "RSS feed" followed by the name of the website.For example, "RSS feed CNN".)
const newsFeed = document.getElementById("news-feed");

/**
 * Asynchronously fetches and displays news data from the specified RSS feed URL.
 */
async function fetchAndDisplayNews() {
  try {
    const response = await fetch("YOUR_RSS_FEED_URL_HERE");
    const data = await response.json(); // Use the appropriate method based on the response format (JSON or XML).

    // Process the news data and create HTML elements to display it.
    data.items.forEach((item) => {
      const newsItem = document.createElement("div");
      newsItem.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Read more</a>
      `;
      newsFeed.appendChild(newsItem);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// Call the function to fetch and display news.
fetchAndDisplayNews();
