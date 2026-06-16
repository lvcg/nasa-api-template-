// NASA Astronomy Picture of the Day App
// Uses async/await and matches the HTML IDs

document.addEventListener('DOMContentLoaded', () => {
  // NASA API settings
  const API_KEY = 'NASA_API_KEY';
  const API_URL = 'https://api.nasa.gov/planetary/apod';

  // Button and input elements
  const fetchButton = document.querySelector('#fetch-btn');
  const randomButton = document.querySelector('#random-btn');
  const themeToggle = document.querySelector('#theme-toggle');
  const dateInput = document.querySelector('#media-date');

  // Status and loading elements
  const statusMessage = document.querySelector('#status-message');
  const spinner = document.querySelector('#spinner');

  // Result cards
  const mediaCard = document.querySelector('#media-card');
  const explanationCard = document.querySelector('#explanation-card');

  // NASA content elements
  const mediaTitle = document.querySelector('#media-title');
  const mediaDate = document.querySelector('#media-date-display');
  const mediaType = document.querySelector('#media-type');
  const mediaCopyright = document.querySelector('#media-copyright');
  const mediaExplanation = document.querySelector('#media-explanation');
  const image = document.querySelector('#nasa-media');
  const videoMessage = document.querySelector('#video-message');

  // Action buttons
  const downloadButton = document.querySelector('#download-btn');
  const shareButton = document.querySelector('#share-btn');
  const favoriteButton = document.querySelector('#favorite-btn');
  const viewFavoriteButton = document.querySelector('#view-favorite-btn');

  // Stores the current NASA API response
  let currentMedia = null;

  // Set today's date as the default
  const today = getTodayDate();
  dateInput.value = today;
  dateInput.max = today;

  // Load saved theme and today's media
  loadThemePreference();
  getNASAmedia(today);

  // Event listeners
  fetchButton.addEventListener('click', () => {
    getNASAmedia(dateInput.value);
  });

  randomButton.addEventListener('click', () => {
    const randomDate = getRandomDate();
    dateInput.value = randomDate;
    getNASAmedia(randomDate);
  });

  themeToggle.addEventListener('click', toggleTheme);
  shareButton.addEventListener('click', copyMediaLink);
  favoriteButton.addEventListener('click', saveFavorite);
  viewFavoriteButton.addEventListener('click', viewFavorite);

  // Fetch NASA media by date
  async function getNASAmedia(selectedDate) {
    if (!selectedDate) {
      showStatus('Please select a date first.');
      return;
    }

    setLoadingState(true);
    resetMediaDisplay();

    try {
      const url = API_URL + '?api_key=' + API_KEY + '&date=' + selectedDate;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('NASA API request failed.');
      }

      const data = await response.json();

      if (data.code || data.msg) {
        throw new Error(data.msg || 'NASA returned an error.');
      }

      currentMedia = data;
      renderNASAmedia(data);
      showStatus('');
    } catch (error) {
      console.error('NASA API Error:', error);
      showStatus('Unable to load NASA media. Please try another date.');
    } finally {
      setLoadingState(false);
    }
  }

  // Render NASA data into the DOM
  function renderNASAmedia(data) {
    mediaCard.hidden = false;
    explanationCard.hidden = false;

    mediaTitle.textContent = data.title || 'NASA Media';
    mediaDate.textContent = 'Date: ' + (data.date || 'N/A');
    mediaType.textContent = 'Media Type: ' + (data.media_type || 'Unknown');
    mediaCopyright.textContent = 'Copyright: ' + (data.copyright || 'NASA Public Domain');
    mediaExplanation.textContent = data.explanation || 'No explanation available.';

    if (data.media_type === 'image') {
      image.src = data.url;
      image.alt = data.title || 'NASA Astronomy Picture of the Day';
      image.hidden = false;

      videoMessage.hidden = true;
      videoMessage.textContent = '';

      downloadButton.href = data.hdurl || data.url;
      downloadButton.hidden = false;
      shareButton.hidden = false;
      favoriteButton.hidden = false;
    } else {
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
  }

  // Save current media to localStorage
  function saveFavorite() {
    if (!currentMedia) {
      showStatus('No NASA media available to save.');
      return;
    }

    localStorage.setItem('favoriteNASAmedia', JSON.stringify(currentMedia));
    showStatus('Favorite saved!');
  }

  // Load favorite media from localStorage
  function viewFavorite() {
    const favorite = localStorage.getItem('favoriteNASAmedia');

    if (!favorite) {
      showStatus('No favorite saved yet.');
      return;
    }

    const data = JSON.parse(favorite);
    currentMedia = data;
    dateInput.value = data.date;

    renderNASAmedia(data);
    showStatus('Favorite loaded.');
  }

  // Copy the current media link
  async function copyMediaLink() {
    if (!currentMedia || !currentMedia.url) {
      showStatus('No media link available to copy.');
      return;
    }

    try {
      await navigator.clipboard.writeText(currentMedia.url);
      showStatus('Media link copied!');
    } catch (error) {
      console.error('Clipboard Error:', error);
      showStatus('Could not copy link.');
    }
  }

  // Toggle light and dark theme
  function toggleTheme() {
    document.body.classList.toggle('light-theme');

    const theme = document.body.classList.contains('light-theme')
      ? 'light'
      : 'dark';

    localStorage.setItem('nasaTheme', theme);
  }

  // Load saved theme from localStorage
  function loadThemePreference() {
    const savedTheme = localStorage.getItem('nasaTheme');

    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }

  // Show or hide loading state
  function setLoadingState(isLoading) {
    fetchButton.disabled = isLoading;
    randomButton.disabled = isLoading;
    fetchButton.textContent = isLoading ? 'Loading...' : 'View NASA Media';
    spinner.hidden = !isLoading;
  }

  // Hide old media before loading new data
  function resetMediaDisplay() {
    mediaCard.hidden = true;
    explanationCard.hidden = true;

    image.hidden = true;
    image.src = '';

    videoMessage.hidden = true;
    videoMessage.textContent = '';

    downloadButton.hidden = true;
    shareButton.hidden = true;
    favoriteButton.hidden = true;
  }

  // Show status message to user
  function showStatus(message) {
    statusMessage.textContent = message;
  }

  // Format today's date as YYYY-MM-DD
  function getTodayDate() {
    return new Date().toISOString().split('T')[0];
  }

  // Generate random NASA APOD date
  function getRandomDate() {
    const start = new Date('1995-06-16');
    const end = new Date();

    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());

    return new Date(randomTime).toISOString().split('T')[0];
  }
});
