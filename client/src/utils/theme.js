// Theme toggle functionality
const themeToggle = () => {
  const root = document.documentElement;
  const currentTheme = localStorage.getItem("theme") || "light";

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      root.style.setProperty("--primary-color", "#6d7aed");
      root.style.setProperty("--background-light", "#121212");
      root.style.setProperty("--background-dark", "#1e1e1e");
      root.style.setProperty("--dark-text", "#ffffff");
      root.style.setProperty("--light-text", "#b0b0b0");
      root.classList.add("dark-theme");
    } else {
      root.style.setProperty("--primary-color", "#4361ee");
      root.style.setProperty("--background-light", "#f8f9fa");
      root.style.setProperty("--background-dark", "#f1f3f4");
      root.style.setProperty("--dark-text", "#333333");
      root.style.setProperty("--light-text", "#666666");
      root.classList.remove("dark-theme");
    }
  };

  // Initialize theme
  if (currentTheme === "dark") {
    toggleTheme();
  }

  return { toggleTheme };
};

export default themeToggle;
