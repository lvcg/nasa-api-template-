// Fetch NASA Astronomy Picture of the Day
document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  const choice = document.querySelector('input').value
  console.log(choice)

  const url = `https://api.nasa.gov/planetary/apod?api_key=bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6&date=${choice}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)

      const image = document.querySelector('img')
      const iframe = document.querySelector('iframe')
      const explanation = document.querySelector('h3')

      if (data.media_type === 'image') {
        image.src = data.url
        image.style.display = 'block'

        iframe.src = ''
        iframe.style.display = 'none'
      } else if (data.media_type === 'video') {
        iframe.src = data.url
        iframe.style.display = 'block'

        image.src = ''
        image.style.display = 'none'
      }

      explanation.innerHTML = data.explanation
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}

