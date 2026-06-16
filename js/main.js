// NASA APOD API Key
const API_KEY = 'bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6';

// DOM Elements
const button = document.getElementById('fetch-btn');
const dateInput = document.getElementById('media-date');
const image = document.getElementById('nasa-media');
const video = document.getElementById('nasa-video');
const title = document.getElementById('media-title');
const dateDisplay = document.getElementById('media-date-display');
const explanation = document.getElementById('media-explanation');
const explanationCard = document.getElementById('explanation-card');

// Add click event listener
button.addEventListener('click', getMedia);

// Fetch NASA Media
function getMedia() {

  // Prevent empty date searches 
  if (!dateInput.value) {
    alert('Please select a date.');
    return;
  }

  // Show loading state
  button.disabled = true;
  button.textContent = 'Loading...';

  const selectedDate = dateInput.value;

  const url =
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`;

  fetch(url)
    .then(response => {

      if (!response.ok) {
        throw new Error('Failed to fetch NASA media');
      }

      return response.json();
    })

    .then(data => {

      console.log(data);

      // Update text content
      title.textContent = data.title || '';
      dateDisplay.textContent = data.date || '';
      explanation.textContent = data.explanation || '';

      // Show explanation card
      explanationCard.hidden = false;

      // Handle images
      if (data.media_type === 'image') {

        image.src = data.hdurl || data.url;
        image.hidden = false;

        video.hidden = true;
        video.src = '';
      }

      // Handle videos
      else if (data.media_type === 'video') {

        video.src = data.url;
        video.hidden = false;

        image.hidden = true;
        image.src = '';
      }
    })

    .catch(error => {

      console.error(error);

      title.textContent = 'Unable to load NASA media';
      dateDisplay.textContent = '';
      explanation.textContent =
        'Please try another date or refresh the page.';

      explanationCard.hidden = false;
    })

    .finally(() => {

      button.disabled = false;
      button.textContent = 'View NASA Media';

    });
}
