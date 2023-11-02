export const logout = (event) => {
  localStorage.clear();

  window.location.href = "../index.html";
  event.preventDefault();
};
