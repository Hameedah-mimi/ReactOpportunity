export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Could not read user:", error);
    return null;
  }
};

export const getUsername = () => {
  const user = getCurrentUser();

  return user?.username || "User";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("access");
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};
