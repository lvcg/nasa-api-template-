// ==========================================
// NASA Astronomy Picture of the Day App
// Uses async/await for cleaner API handling
// ==========================================

// Wait until the full HTML document is loaded before running JavaScript
document.addEventListener('DOMContentLoaded', () => {
// ==========================================
// API CONFIGURATION
// ==========================================

// NASA API key — unchanged from your original project
const API_KEY = 'bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6';

// NASA APOD endpoint
const API_URL = 'https://api.nasa.gov/planetary/apod';

// ==========================================
// DOM ELEMENTS
// ==========================================

const fetchButton = document.querySelector('#fetch-btn');
const randomButton = document.querySelector('#random-btn');
const themeToggle = document.querySelector('#theme-toggle');

const dateInput = document.querySelector('#media-date');
const statusMessage = document.querySelector('#status-message');
const spinner = document.querySelector('#spinner');

const mediaCard = document.querySelector('#media-card');
const explanationCard = document.querySelector('#explanation-card');

const mediaTitle = document.querySelector('#media-title');
const mediaDate = document.querySelector('#media-date-display');
const mediaType = document.querySelector('#media-type');
const mediaCopyright = document.querySelector('#media-copyright');
const mediaExplanation = document.querySelector('#media-explanation');
const charCount = document.querySelector('#char-count');

const image = document.querySelector('#nasa-media');
const videoMessage = document.querySelector('#video-message');

const downloadButton = document.querySelector('#download-btn');
const shareButton = document.querySelector('#share-btn');
const favoriteButton = document.querySelector('#favorite-btn');
const viewFavoriteButton = document.querySelector('#view-favorite-btn');

// Stores the most recent NASA response for favorite/share actions
let currentMedia = null;

// ==========================================
// INITIAL APP SETUP
// ==========================================

// Set today's date as the default date
const today = getTodayDate();
dateInput.value = today;
dateInput.max = today;

// Load saved theme preference
loadThemePreference();

// Automatically load today's NASA APOD when the page opens
getNASAmedia(today);

// ==========================================
// EVENT LISTENERS
// ==========================================

// Fetch NASA media when the main button is clicked
fetchButton.addEventListener('click', () => {
getNASAmedia(dateInput.value);
});

// Generate and load a random NASA APOD date
randomButton.addEventListener('click', () => {
const randomDate = getRandomDate();
dateInput.value = randomDate;
getNASAmedia(randomDate);
});

// Toggle dark/light theme
themeToggle.addEventListener('click', toggleTheme);

// Copy current media link to clipboard
shareButton.addEventListener('click', copyMediaLink);

// Save current NASA media to localStorage
favoriteButton.addEventListener('click', saveFavorite);

// Load favorite NASA media from localStorage
viewFavoriteButton.addEventListener('click', viewFavorite);

// ==========================================
// MAIN ASYNC FUNCTION
// ==========================================

async function getNASAmedia(selectedDate) {
// Stop if user did not select a date
if (!selectedDate) {
showStatus('Please select a date first.');
return;
}

```
// Prepare the UI before fetching data
setLoadingState(true);
resetMediaDisplay();

try {
  // Build the NASA API URL
  const url = `${API_URL}?api_key=${API_KEY}&date=${selectedDate}`;

  // Fetch NASA data
  const response = await fetch(url);

  // Handle failed HTTP responses
  if (!response.ok) {
    throw new Error('NASA API request failed.');
  }

  // Convert API response to JavaScript object
  const data = await response.json();

  // NASA may return an error object even when fetch succeeds
  if (data.code || data.msg) {
    throw new Error(data.msg || 'NASA returned an error.');
  }

  // Store the current media object for share/favorite features
  currentMedia = data;

  // Render NASA data to the DOM
  renderNASAmedia(data);

  // Clear status message after successful render
  showStatus('');
} catch (error) {
  console.error('NASA API Error:', error);
  showStatus('Unable to load NASA media. Please try another date.');
} finally {
  // Always turn loading state off after request finishes
  setLoadingState(false);
}
```

}

// ==========================================
// RENDER FUNCTION
// ==========================================

function renderNASAmedia(data) {
// Show result cards
mediaCard.hidden = false;
explanationCard.hidden = false;

```
// Add text content from API
mediaTitle.textContent = data.title || 'NASA Media';
mediaDate.textContent = `Date: ${data.date || 'N/A'}`;
mediaType.textContent = `Media Type: ${data.media_type || 'Unknown'}`;
mediaCopyright.textContent =
  `Copyright: ${data.copyright || 'NASA Public Domain'}`;

mediaExplanation.textContent =
  data.explanation || 'No explanation available.';

// Show character count for explanation
charCount.textContent =
  `${mediaExplanation.textContent.length} characters`;

// If NASA returns an image, display it
if (data.media_type === 'image') {
  image.src = data.url;
  image.alt = data.title || 'NASA Astronomy Picture of the Day';
  image.hidden = false;

  videoMessage.hidden = true;
  videoMessage.textContent = '';

  // Enable image actions
  downloadButton.href = data.hdurl || data.url;
  downloadButton.hidden = false;
  shareButton.hidden = false;
  favoriteButton.hidden = false;
} else {
  // If NASA returns a video, show a friendly message instead of iframe
  image.hidden = true;
  image.src = '';

  videoMessage.textContent =
    'This date returned a video instead of an image. Try another date or copy the media link.';
  videoMessage.hidden = false;

  downloadButton.href = data.url;
  downloadButton.hidden = false;
  shareButton.hidden = false;
  favoriteButton.hidden = false;
}
```

}

// ==========================================
// FAVORITES
// ==========================================

function saveFavorite() {
if (!currentMedia) {
showStatus('No NASA media available to save.');
return;
}

```
localStorage.setItem('favoriteNASAmedia', JSON.stringify(currentMedia));
showStatus('Favorite saved!');
```

}

function viewFavorite() {
const favorite = localStorage.getItem('favoriteNASAmedia');

```
if (!favorite) {
  showStatus('No favorite saved yet.');
  return;
}

const data = JSON.parse(favorite);
currentMedia = data;

dateInput.value = data.date;
renderNASAmedia(data);
showStatus('Favorite loaded.');
```

}

// ==========================================
// SHARE FEATURE
// ==========================================

async function copyMediaLink() {
if (!currentMedia || !currentMedia.url) {
showStatus('No media link available to copy.');
return;
}

```
try {
  await navigator.clipboard.writeText(currentMedia.url);
  showStatus('Media link copied!');
} catch (error) {
  console.error('Clipboard Error:', error);
  showStatus('Could not copy link. Try opening the image instead.');
}
```

}

// ==========================================
// THEME TOGGLE
// ==========================================

function toggleTheme() {
document.body.classList.toggle('light-theme');

```
const theme = document.body.classList.contains('light-theme')
  ? 'light'
  : 'dark';

localStorage.setItem('nasaTheme', theme);
```

}

function loadThemePreference() {
const savedTheme = localStorage.getItem('nasaTheme');

```
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
}
```

}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function setLoadingState(isLoading) {
fetchButton.disabled = isLoading;
randomButton.disabled = isLoading;

```
fetchButton.textContent = isLoading
  ? 'Loading...'
  : 'View NASA Media';

spinner.hidden = !isLoading;
```

}

function resetMediaDisplay() {
mediaCard.hidden = true;
explanationCard.hidden = true;

```
image.hidden = true;
image.src = '';

videoMessage.hidden = true;
videoMessage.textContent = '';

downloadButton.hidden = true;
shareButton.hidden = true;
favoriteButton.hidden = true;
```

}

function showStatus(message) {
statusMessage.textContent = message;
}

function getTodayDate() {
return new Date().toISOString().split('T')[0];
}

function getRandomDate() {
// NASA APOD started on June 16, 1995
const start = new Date('1995-06-16');
const end = new Date();

```
const randomTime =
  start.getTime() + Math.random() * (end.getTime() - start.getTime());

return new Date(randomTime).toISOString().split('T')[0];
```

}
});
