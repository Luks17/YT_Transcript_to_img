
const menuToggleButton = selectElement("#toggle-menu");
const menu = selectElement("#menu");


function toggleMenu() {
  menuToggleButton.classList.toggle("activated");
  menu.classList.toggle("activated");
}


menuToggleButton.addEventListener("click", toggleMenu);
