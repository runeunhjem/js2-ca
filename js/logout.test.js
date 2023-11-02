import { logout } from "./utils/logout.mjs";

global.localStorage = {
  clear: jest.fn(),
};

describe("Logout Button Event Listener", () => {
  it("should call localStorage.clear when the Logout button is clicked", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    logout(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
