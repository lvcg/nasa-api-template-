const API_KEY = 'bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6';

const button = document.getElementById('fetch-btn');
const dateInput = document.getElementById('media-date');
const image = document.getElementById('nasa-media');
const video = document.getElementById('nasa-video');
const title = document.getElementById('media-title');
const dateDisplay = document.getElementById('media-date-display');
const explanation = document.getElementById('media-explanation');
const explanationCard = document.getElementById('explanation-card');

button.addEventListener('click', getMedia);

function getMedia() {
  const selectedDate = dateInput.value;

  if (!selectedDate) {
    alert('Please select a date.');
    return;
  }

  button.disabled = true;
  button.textContent = 'Loading...';

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      title.textContent = data.title;
      dateDisplay.textContent = data.date;
      explanation.textContent = data.explanation;
      explanationCard.hidden = false;

      if (data.media_type === 'image') {
        image.src = data.url;
        image.alt = data.title;
        image.hidden = false;

        video.hidden = true;
        video.src = '';
      } else if (data.media_type === 'video') {
        video.src = data.url;
        video.hidden = false;

        image.hidden = true;
        image.src = '';
      }
    })
    .catch(error => {
      console.error(error);
      title.textContent = 'Unable to load NASA media.';
      explanation.textContent = 'Try another date or refresh the page.';
      explanationCard.hidden = false;
    })
    .finally(() => {
      button.disabled = false;
      button.textContent = 'View NASA Media';
    });
}
