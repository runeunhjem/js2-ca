import { mockLogOut } from "./mock-main.js";

global.localStorage = {
  clear: jest.fn(),
};

describe("Logout Button Event Listener", () => {
  it("should call localStorage.clear when the Logout button is clicked", () => {
    //simulates clicking the logout button
    mockLogOut();

    expect(localStorage.clear).toHaveBeenCalled();
  });
});
