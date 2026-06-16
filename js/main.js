document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  const choice = document.querySelector('input').value
  const url = `https://api.nasa.gov/planetary/apod?api_key=bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6&date=${choice}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)

      const image = document.getElementById('nasa-media')
      const iframe = document.querySelector('iframe')

      if (data.media_type === 'image') {
        image.src = data.url
        image.style.display = 'block'
        iframe.style.display = 'none'
        iframe.src = ''
      } else if (data.media_type === 'video') {
        iframe.src = data.url
        iframe.style.display = 'block'
        image.style.display = 'none'
        image.src = ''
      }

      document.querySelector('h3').innerText = data.explanation
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}
