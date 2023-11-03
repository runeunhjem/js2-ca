import { logout } from "./utils/logout.mjs";
import { locationMock } from "./jestMock/mock.js";

global.localStorage = {
  clear: jest.fn(),
};

describe("Logout Function", () => {
  it("should clear local storage  and update window.location", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    logout(mockEvent);

    expect(localStorage.clear).toHaveBeenCalled();
    expect(locationMock.href).toBe("../index.html");
  });
});
