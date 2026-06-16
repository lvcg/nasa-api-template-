document.querySelector('#fetch-btn').addEventListener('click', getFetch);

function getFetch() {
  const choice = document.querySelector('#media-date').value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6&date=${choice}`;

  const statusMessage = document.querySelector('#status-message');
  const mediaCard = document.querySelector('#media-card');
  const explanationCard = document.querySelector('#explanation-card');
  const title = document.querySelector('#media-title');
  const dateDisplay = document.querySelector('#media-date-display');
  const image = document.querySelector('#nasa-media');
  const video = document.querySelector('#nasa-video');
  const explanation = document.querySelector('#media-explanation');

  if (!choice) {
    statusMessage.innerText = 'Please select a date first.';
    return;
  }

  statusMessage.innerText = 'Loading NASA media...';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      mediaCard.hidden = false;
      explanationCard.hidden = false;

      title.innerText = data.title;
      dateDisplay.innerText = data.date;
      explanation.innerText = data.explanation;

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

      statusMessage.innerText = '';
    })
    .catch(err => {
      console.log(`error ${err}`);
      statusMessage.innerText = 'Something went wrong. Try another date.';
    });
}


