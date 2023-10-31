import { loginUser } from "./login.mjs";

const mockAccessToken = "mockAccessToken";
const mockResponse = jest.fn().mockResolvedValue({
  status: 200,
  json: () =>
    Promise.resolve({
      accessToken: mockAccessToken,
    }),
});

global.fetch = mockResponse;

describe("loginUser", () => {
  beforeEach(() => {
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should store the access token in local storage upon successful login", async () => {
    await loginUser();

    expect(localStorage.setItem).toHaveBeenCalledWith("accessToken", mockAccessToken);
  });

  it("should not store the access token in local storage upon failed login", async () => {
    const mockResponseError = {
      status: 401,
    };

    global.fetch = mockResponseError;

    await loginUser();

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
