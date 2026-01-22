// DOM elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const backArrowIcon = document.querySelector('.back-arrow-icon');
const mainPanel = document.getElementById('mobileMenuMain');
const openServicesMenu = document.getElementById('openServicesMenu');
const servicePanel = document.getElementById('mobileMenuServices');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

// State
let isSubmenuOpen = false;

// Toggle main menu
function toggleMainMenu() {
  const isActive = mainPanel.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active', isActive);
  mobileMenuOverlay.classList.toggle('active', isActive);
}

// Open submenu
function openSubmenu() {
  isSubmenuOpen = true;
  servicePanel.classList.add('active');
  hamburgerIcon.classList.add('hidden');
  backArrowIcon.classList.add('active');
}

// Close submenu
function closeSubmenu() {
  isSubmenuOpen = false;
  servicePanel.classList.remove('active');
  hamburgerIcon.classList.remove('hidden');
  backArrowIcon.classList.remove('active');
}

// Close everything
function closeAll() {
  closeSubmenu();
  mainPanel.classList.remove('active');
  mobileMenuToggle.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
}

// Event listeners
openServicesMenu.addEventListener('click', (e) => {
  e.preventDefault();
  openSubmenu();
});

mobileMenuToggle.addEventListener('click', () => {
  if (isSubmenuOpen) {
    closeSubmenu();
  } else {
    toggleMainMenu();
  }
});

mobileMenuOverlay.addEventListener('click', () => {
  if (isSubmenuOpen) {
    closeAll();
  } else {
    toggleMainMenu();
  }
});
