export const login = (email, password) => {
  // hardcoded admin login
  if (email === "admin@medicare.com" && password === "admin123") {
    const user = { role: "ADMIN", email };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  throw new Error("Invalid credentials");
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
