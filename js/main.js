// NASA Astronomy Picture of the Day App

const API_KEY = 'DEMO_KEY';

// DOM Elements
const button = document.getElementById('fetch-btn');
const dateInput = document.getElementById('media-date');
const image = document.getElementById('nasa-media');
const video = document.getElementById('nasa-video');
const title = document.getElementById('media-title');
const dateDisplay = document.getElementById('media-date-display');
const explanation = document.getElementById('media-explanation');
const explanationCard = document.getElementById('explanation-card');

// Add button click listener
button.addEventListener('click', getMedia);

function getMedia() {

const selectedDate = dateInput.value;

if (!selectedDate) {
alert('Please select a date first.');
return;
}

button.disabled = true;
button.textContent = 'Loading...';

const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`;

fetch(url)
.then(response => {
if (!response.ok) {
throw new Error('NASA API request failed');
}
return response.json();
})
.then(data => {

```
  console.log(data);

  // Populate content
  title.textContent = data.title || '';
  dateDisplay.textContent = data.date || '';
  explanation.textContent = data.explanation || '';

  // Show explanation section
  explanationCard.hidden = false;

  // IMAGE RESPONSE
  if (data.media_type === 'image') {

    image.src = data.url;
    image.alt = data.title;

    image.hidden = false;

    video.hidden = true;
    video.src = '';
  }

  // VIDEO RESPONSE
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
```

}

