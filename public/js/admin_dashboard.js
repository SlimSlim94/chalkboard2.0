function search() {
  // Request for the signup
  const XHR = new XMLHttpRequest();
  // Form data to send
  const FD = new FormData(document.getElementById('searchForm'));

  const searchResults = document.getElementById('searchResults');
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }

  // Listener when request is completed
  XHR.addEventListener('load', (event) => {
    // If not HTTP Created, then displaying status in the message
    if (event.target.status !== 200) {
      searchResults.innerHTML = getErrorMessage(event.target);
    } else {
      const result = JSON.parse(event.target.response);
      result.forEach((item) => {
        // Creating the new list item
        const child = document.createElement('li');
        child.innerHTML = item.username;
        // Adding the new child
        searchResults.appendChild(child);
      });
    }
  });

  // Listener when request has failed
  XHR.addEventListener('error', () => {
    searchResults.innerHTML = 'Network error';
  });

  XHR
    .open(
      'GET',
      `${apiPath}/admin/search?${new URLSearchParams(FD).toString()}`,
    );
  XHR.send(FD);

  return false;
}

// Checking the current user
if (!isAdmin()) {
  window.location.href = 'index.html';
} else {
  // Searching on the start
  search();
}