const backToTopButton = document.querySelector(".back-to-top-button");

/**
 * Function to show or hide the "Back to Top" button based on the user's scroll position and scroll smoothly to the top when clicked.
 */
export function toTopButton() {
  window.addEventListener("scroll", () => {
    const desktopOffset = 400;
    const mobileOffset = 300;
    const pageYOffset = window.scrollY;
    const offset = window.innerWidth >= 768 ? desktopOffset : mobileOffset;

    if (pageYOffset > offset) {
      backToTopButton.classList.add("back-to-top-button-show");
    } else {
      backToTopButton.classList.remove("back-to-top-button-show");
    }
  });

  // Scroll me to the top baby, but smoothly
  backToTopButton.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}