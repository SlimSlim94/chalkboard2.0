// Checking the current user
if (!isStudent()) {
  window.location.href = 'index.html';
} else {
  // Searching on the start
  search();
}
