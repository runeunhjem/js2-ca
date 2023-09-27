export function updateReactionCount(card, reactionsCount) {
  const likesCount = card.querySelector(".reaction-count");
  likesCount.innerHTML = `<i class="bi bi-hand-thumbs-up-fill text-primary"></i> ${reactionsCount} Likes`;
}
