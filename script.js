const movies = document.getElementById('movie-list')
const singleMovie = document.getElementById('movie')

// Set up HTTP request
let xhr = new XMLHttpRequest()


//show trending 
function getTrend() {

  xhr.onload = function () {

    // Process return data
    if (xhr.status >= 200 && xhr.status < 300) {
      
      let data = JSON.parse(xhr.responseText)
      let list = data.results

      list.forEach(function(movie) {
        let listItem = document.createElement("LI")
        listItem.innerHTML = `<a id=${movie.id} href="#/${movie.id}">${movie.title}</a>`
        listItem.addEventListener("click", showMovie)
        movies.appendChild(listItem)
      })
      
    } 
  }
  xhr.open('GET', 'https://api.themoviedb.org/3/trending/movie/week?api_key=c613a3d9010f7539521c26f2750f05f1')
  xhr.send()
}


//show clicked movie
function showMovie(e) {

  //clear movie list
  movies.innerHTML = ``

  let movieID = e.target.id
  xhr.onload = function () {

    // Process return data
    if (xhr.status >= 200 && xhr.status < 300) {
        

      let data = JSON.parse(xhr.responseText)
      singleMovie.innerHTML =
      `
        <img src="http://image.tmdb.org/t/p/w185/${data.poster_path}">
        <h1>${data.title}</h1>
        <p>${data.overview}</p>
        <h2>Recommendations:</h2>
        <ul id=recommendations></ul>
      `
      getRecommendations(movieID)
    
    } 
  }
  xhr.open('GET', `https://api.themoviedb.org/3/movie/${movieID}?api_key=c613a3d9010f7539521c26f2750f05f1`)
  xhr.send()

}


//get a list of recommendations
function getRecommendations(ID) {

  const recommendations  = document.getElementById('recommendations')

  xhr.onload = function () {

    // Process return data
    if (xhr.status >= 200 && xhr.status < 300) {
      let data = JSON.parse(xhr.responseText)
      let list = data.results
      list.forEach(function(movie) {
        let listItem = document.createElement("LI")
        listItem.innerHTML = `<a id=${movie.id} href="#/${movie.id}">${movie.title}</a>`
        listItem.addEventListener("click", showMovie)
        recommendations.appendChild(listItem)
      })
    }
  }
  xhr.open('GET', `https://api.themoviedb.org/3/movie/${ID}/recommendations?api_key=c613a3d9010f7539521c26f2750f05f1`)
  xhr.send()

}

//get a list of movies by search query
function searchMovies() {

  //clear movie list
  movies.innerHTML = ``

  //clear single movie info
  singleMovie.innerHTML = ``

 let query = document.getElementById('searchInput').value
 
 xhr.onload = function () {

  // Process return data
  if (xhr.status >= 200 && xhr.status < 300) {
    
    let data = JSON.parse(xhr.responseText)
    let list = data.results

    list.forEach(function(movie) {
      let listItem = document.createElement("LI")
      listItem.innerHTML = `<a id=${movie.id} href="#/${movie.id}">${movie.title}</a>`
      listItem.addEventListener("click", showMovie)
      movies.appendChild(listItem)
    })
    
  } 
}


xhr.open('GET', `https://cors.io/?https://api.themoviedb.org/3/search/multi/?api_key=c613a3d9010f7539521c26f2750f05f1&query=${query}`)
xhr.send()
}

getTrend()
