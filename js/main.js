// DOM Elements
const button = document.getElementById('fetch-btn');
const dateInput = document.getElementById('media-date');
const image = document.getElementById('nasa-media');
const video = document.getElementById('nasa-video');
const title = document.getElementById('media-title');
const explanationCard = document.getElementById('explanation-card');
const explanation = document.getElementById('media-explanation');

explanationCard.hidden = false;
explanation.innerText = data.explanation;

// NASA API Key
const API_KEY = 'YOUR_API_KEY';

// Event Listener
button.addEventListener('click', getFetch);

// Fetch NASA APOD Data
function getFetch() {

  const selectedDate = dateInput.value;

  const url =
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      title.innerText = data.title;
      dateDisplay.innerText = data.date;
      explanation.innerText = data.explanation;

      if (data.media_type === 'image') {

        image.src = data.url;
        image.style.display = 'block';

        video.style.display = 'none';
        video.src = '';

      } else if (data.media_type === 'video') {

        video.src = data.url;
        video.style.display = 'block';

        image.style.display = 'none';
        image.src = '';

      }

    })
    .catch(error => {
      console.error('NASA API Error:', error);
    });
}
