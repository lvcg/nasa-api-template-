// NASA APOD API
// This key is unchanged from your original file
const API_KEY = 'bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6';

// DOM elements
const button = document.getElementById('fetch-btn');
const dateInput = document.getElementById('media-date');
const statusMessage = document.getElementById('status-message');

const mediaCard = document.getElementById('media-card');
const explanationCard = document.getElementById('explanation-card');

const title = document.getElementById('media-title');
const dateDisplay = document.getElementById('media-date-display');
const image = document.getElementById('nasa-media');
const video = document.getElementById('nasa-video');
const explanation = document.getElementById('media-explanation');

// Run getFetch when button is clicked
button.addEventListener('click', getFetch);

function getFetch() {
const choice = dateInput.value;

if (!choice) {
statusMessage.textContent = 'Please select a date first.';
return;
}

const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${choice}`;

button.disabled = true;
button.textContent = 'Loading...';
statusMessage.textContent = 'Loading NASA media...';

mediaCard.hidden = true;
explanationCard.hidden = true;
image.hidden = true;
video.hidden = true;
image.src = '';
video.src = '';

fetch(url)
.then(res => res.json())
.then(data => {
console.log(data);

```
  if (data.code || data.msg) {
    throw new Error(data.msg || 'NASA API error');
  }

  title.textContent = data.title || 'NASA Media';
  dateDisplay.textContent = data.date || choice;
  explanation.textContent = data.explanation || 'No explanation available.';

  mediaCard.hidden = false;
  explanationCard.hidden = false;

  if (data.media_type === 'image') {
    image.src = data.url;
    image.alt = data.title || 'NASA Astronomy Picture of the Day';
    image.hidden = false;

    video.hidden = true;
    video.src = '';
  } else if (data.media_type === 'video') {
    video.src = data.url;
    video.hidden = false;

    image.hidden = true;
    image.src = '';
  } else {
    throw new Error('Unsupported media type.');
  }

  statusMessage.textContent = '';
})
.catch(err => {
  console.log(`error ${err}`);

  statusMessage.textContent = 'Unable to load NASA media. Please try another date.';
  title.textContent = 'Unable to load media';
  dateDisplay.textContent = '';
  explanation.textContent = 'There was a problem loading the NASA content. Try another date.';

  mediaCard.hidden = false;
  explanationCard.hidden = false;
  image.hidden = true;
  video.hidden = true;
})
.finally(() => {
  button.disabled = false;
  button.textContent = 'View NASA Media';
});
```

}


