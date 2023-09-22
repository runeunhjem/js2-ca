const logoutLinks = document.querySelectorAll(".logout-link");

logoutLinks.forEach(function (logoutLink) {
  logoutLink.addEventListener("click", function (logout) {
    logout.preventDefault();

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUserData");
    localStorage.removeItem("viewedProfileNameDetails");
    localStorage.removeItem("viewedProfileName");
    localStorage.removeItem("reactionsAndComments");

    window.location.href = "../index.html";
  });
});
