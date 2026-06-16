/**

Display NASA media and information on the page
@param {Object} data - NASA APOD API response object
*/
function renderNASAmedia(data) {

// Show the hidden cards
mediaCard.hidden = false;
explanationCard.hidden = false;

// Display media title
mediaTitle.textContent =
data.title || 'NASA Media';

// Display the date of the APOD
mediaDate.textContent =
'Date: ' + (data.date || 'N/A');

// Display media type (image or video)
mediaType.textContent =
'Media Type: ' + (data.media_type || 'Unknown');

// Display copyright information if available
mediaCopyright.textContent =
'Copyright: ' +
(data.copyright || 'NASA Public Domain');

// Display NASA explanation text
mediaExplanation.textContent =
data.explanation || 'No explanation available.';

// If NASA returns an image
if (data.media_type === 'image') {

// Set image source
image.src = data.url;

// Add descriptive alt text
image.alt =
  data.title ||
  'NASA Astronomy Picture of the Day';

// Show image
image.hidden = false;

// Hide video message
videoMessage.hidden = true;
videoMessage.textContent = '';

// Enable action buttons
downloadButton.href =
  data.hdurl || data.url;

downloadButton.hidden = false;
shareButton.hidden = false;
favoriteButton.hidden = false;

} else {

// Hide image if media is not an image
image.hidden = true;
image.src = '';

// Show message for video content
videoMessage.textContent =
  'This date returned a video instead of an image. Try another date or copy the media link.';

videoMessage.hidden = false;

// Enable action buttons
downloadButton.href = data.url;
downloadButton.hidden = false;
shareButton.hidden = false;
favoriteButton.hidden = false;

}
}
