// Called when the main hamburger menu button is clicked
function handleMainMenuClick(ev) {
  const globalNav = document.querySelector(".global-nav");

  // Toggle the nav open or closed
  globalNav.classList.toggle("show");

  // Walk up from the click target to find the <button> element
  // (the click might have landed on an <svg> or <span> inside the button)
  const button = ev.target.closest("button");

  const isOpen = globalNav.classList.contains("show");

  // Keep aria-expanded in sync so screen readers know the state
  button.setAttribute("aria-expanded", isOpen);
  button.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
}

// Called when one of the submenu arrow buttons is clicked
function handleSubMenuClick(ev) {
  const button = ev.currentTarget;

  // Go up to the parent <li>, then find the <ul> submenu inside it
  const parentLi = button.closest("li");
  const submenu = parentLi.querySelector(".global-nav__submenu");

  // Show or hide the submenu
  submenu.classList.toggle("show");

  // Flip the arrow icon direction
  button.querySelector(".icon").classList.toggle("rotate");
}

// Attach all the event listeners — call this once per page load
export default function enableNavigation() {
  const mainButton = document.querySelector("#global-nav-toggle");
  const subMenuButtons = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  mainButton.addEventListener("click", handleMainMenuClick);

  subMenuButtons.forEach(function (btn) {
    btn.addEventListener("click", handleSubMenuClick);
  });
}
