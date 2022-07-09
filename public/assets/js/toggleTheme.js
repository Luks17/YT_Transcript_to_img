
const body = document.body;
const themeToggleButton = selectElement("#toggle-theme");


// Restores current saved theme after refreshes
if(localStorage.getItem("currentTheme")) {
  body.classList.add("light-theme");
}


function toggleTheme() {
  body.classList.toggle("light-theme");

  // Saves current theme
  if(body.classList.contains("light-theme"))
    localStorage.setItem("currentTheme", "themeActive");
  
  else
    localStorage.removeItem("currentTheme");
}


themeToggleButton.addEventListener("click", toggleTheme);

