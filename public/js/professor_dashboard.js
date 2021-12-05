// Checking the current user
if (!isProfessor()) {
  window.location.href = 'index.html';
} else {
  // Searching on the start
  search();
}
