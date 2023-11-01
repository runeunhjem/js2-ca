// your-script-mock.js
// mock of the logout eventlistener because the original nameless function could not be imported

export const mockLogOut = () => {
  localStorage.clear();
};
