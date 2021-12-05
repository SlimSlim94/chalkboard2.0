const hostingAddress = 'http://localhost';
const apiPath = `${hostingAddress}/api`;

// Processes the received target to get the error message
function getErrorMessage(target) {
  let result = '';
  if (target.response) {
    const response = JSON.parse(target.response);
    result = response.message;
  } else result = `Status ${target.status}. ${target.statusText}`;

  return result;
}

// Logouts the user
function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Returns current user
function getCurrentUser() {
  const userItem = sessionStorage.getItem('currentUser');

  let result = null;
  if (userItem) {
    result = JSON.parse(userItem);
  }
  return result;
}

// Checks whether current user is admin
function isAdmin() {
  const currentUser = getCurrentUser();
  return currentUser ? currentUser.role === 'admin' : false;
}

// Checks whether current user is professor
function isProfessor() {
  const currentUser = getCurrentUser();
  return currentUser ? currentUser.role === 'teacher' : false;
}

// Checks whether current user is student
function isStudent() {
  const currentUser = getCurrentUser();
  return currentUser ? currentUser.role === 'student' : false;
}
