// Add a click event listener to the "View NASA Media" button
document.querySelector('#fetch-btn').addEventListener('click', getFetch);

// Function that runs when the button is clicked
function getFetch() {
  // Get the selected date from the date input
  const choice = document.querySelector('#media-date').value;

  // NASA APOD API URL with your API key and selected date
  const url = `https://api.nasa.gov/planetary/apod?api_key=bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6&date=${choice}`;

  // Select DOM elements from the HTML
  const statusMessage = document.querySelector('#status-message');
  const mediaCard = document.querySelector('#media-card');
  const explanationCard = document.querySelector('#explanation-card');
  const title = document.querySelector('#media-title');
  const dateDisplay = document.querySelector('#media-date-display');
  const image = document.querySelector('#nasa-media');
  const explanation = document.querySelector('#media-explanation');

  // Stop the function if no date is selected
  if (!choice) {
    statusMessage.innerText = 'Please select a date first.';
    return;
  }

  // Show loading text while waiting for NASA API response
  statusMessage.innerText = 'Loading NASA media...';

  // Fetch data from NASA APOD API
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // Log the API response to help with debugging
      console.log(data);

      // Show the hidden media and explanation cards
      mediaCard.hidden = false;
      explanationCard.hidden = false;

      // Add NASA API text content to the page
      title.innerText = data.title || '';
      dateDisplay.innerText = data.date || '';
      explanation.innerText = data.explanation || '';

      // If NASA returns an image, display it
      if (data.media_type === 'image') {
        image.src = data.url;
        image.alt = data.title || 'NASA Astronomy Picture of the Day';
        image.hidden = false;
      } else {
        // If NASA returns a video or unsupported media type, hide the image
        image.hidden = true;
        image.src = '';

        statusMessage.innerText =
          'This date returned a video instead of an image. Please try another date.';
        return;
      }

      // Clear the loading message after successful image load
      statusMessage.innerText = '';
    })
    .catch(err => {
      // Log errors in the console
      console.log(`error ${err}`);

      // Show user-friendly error message
      statusMessage.innerText = 'Something went wrong. Try another date.';
    });
}


