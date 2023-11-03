export const locationMock = {
  href: "",
};

Object.defineProperty(global, "window", {
  value: {
    location: locationMock,
  },
});
