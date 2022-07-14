//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

document.getElementById('poke').removeAttribute('src');


function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://api.nasa.gov/planetary/apod?api_key=bVXu64sjdTNsOpvxVmCosAQOme5m5yQIjCc7q4s6&date=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if(data.media_type === 'image'){
          document.querySelector('img').src = data.hdurl
        }else if(data.media_type === 'video'){
          document.querySelector('iframe').src = data.url
        }
  
        document.querySelector('h3').innerHTML = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

