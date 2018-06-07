/*
To-do:
- Exclude episodes
- affiliate URL systems https://www.geni.us/
- URL based generation with ? and disqus comments based on url.
- Select season: if a season is selected, generate numbers only for that season. Also, disable options for episodes according to the selected season.
- Info Card: Episode's information from Trakt API.
- format dates
- for images https://developers.themoviedb.org/3/getting-started/images see this website
- Info links for the episodes: Trakt.TV - IMDB - TVDB
- Streaming Links for the episodes: Netflix - Itunes - Amazon - Google Play Movies
- Google Analytics
- (Maybe) Links for purchasing BoxSet etc.
- (Maybe) Load comments for the episode: Disqus comments can be generated. User can "Load Comments"
- (Maybe) A quote from the episode: Can use The Office Quotes API.
- (Maybe) Order of appearance amounts for charaters for that specific episode: Can use couple of APIs to generate. With character portraits.
- (Maybe) 1 advertisement. Amazon Products related to The Office or Google Adsense.
-share buttons
-change page share meta according to the episode (title, description, thumb.)
*/

// Listens to the Random Mifflin button.
document.getElementById("randomMifflin").addEventListener("click", randomMifflin);
document.getElementById("randomMifflin").addEventListener("click", loadComments);
document.getElementById("fltr").addEventListener("click", filterToggle);
document.getElementById("loadComments").addEventListener("click", showDisqus);


var seasonNo;
var episodeNo;
var pageURL;

seasonNo = getQueryVariable('s');
episodeNo = getQueryVariable('e');

if (seasonNo && episodeNo !== undefined) {
  getThumb() //get thumbnail TMDB API
  getInfo() //get episode info TRAKT API
  loadDisqus() //get disqus comments
  loadComments() //Show comments button
}

//gets the url and splits it
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
//gets the url and splits it

//Runs the random episode selector.
function randomMifflin() {
// add loader

  seasonNo = Math.ceil(Math.random() * 9);
  if (seasonNo == 1) {
    episodeNo = Math.ceil(Math.random() * 6);
  } else if (seasonNo == 2) {
    episodeNo = Math.ceil(Math.random() * 22);
  } else if (seasonNo == 3) {
    episodeNo = Math.ceil(Math.random() * 23);
  } else if (seasonNo == 4) {
    episodeNo = Math.ceil(Math.random() * 14);
  } else if (seasonNo == 5) {
    episodeNo = Math.ceil(Math.random() * 26);
  } else if (seasonNo == 6) {
    episodeNo = Math.ceil(Math.random() * 26);
  } else if (seasonNo == 7) {
    episodeNo = Math.ceil(Math.random() * 24);
  } else if (seasonNo == 8) {
    episodeNo = Math.ceil(Math.random() * 24);
  } else {
    episodeNo = Math.ceil(Math.random() * 23);
  }

  getThumb() //get thumbnail TMDB API
  getInfo() //get episode info TRAKT API
  changeTitle() //Change Page Title
  changeURL() // Change Page URL
  loadDisqus() //get disqus comments

}

//TMDB API generates episode thumbnail
function getThumb(){
  var thumbRequest = new XMLHttpRequest();

  thumbRequest.open('GET', 'https://api.themoviedb.org/3/tv/2316/season/' + seasonNo + '/episode/' + episodeNo + '/images?api_key=c4e0e43db456cb63f04bead90cf06afc');

  thumbRequest.onload = function () {
    var thumbData = JSON.parse(thumbRequest.responseText);
    var imgURL = 'https://image.tmdb.org/t/p/original/' + thumbData.stills['0'].file_path;
    document.getElementById('thumbnail').src = imgURL;
  };
  thumbRequest.send();
}
//TMDB API generates episode thumbnail

// Trakt API - Gets the information of the random episode.
function getInfo(){
  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.trakt.tv/shows/the-office/seasons/' + seasonNo + '/episodes/' + episodeNo + '?extended=full');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('trakt-api-version', '2');
  request.setRequestHeader('trakt-api-key', 'c66faa4cdb7c9815a82e9e066821f317ebc6086a6217a1b0934169ea55fbd492');

  request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response.title);
        document.getElementById('title').innerHTML = response.title;
        document.getElementById('runtime').innerHTML = response.runtime + ' mins.';
        document.getElementById('rating').innerHTML = (response.rating).toFixed(1) + '/10';
        //document.getElementById('aired').innerHTML = 'Aired On: ' + response.first_aired;
        document.getElementById('seasonInfo').innerHTML = response.season;
        document.getElementById('episodeInfo').innerHTML = response.number;
        document.getElementById('overview').innerHTML = response.overview;
        var element = document.getElementById("info");

        if (element.classList.contains('hidden') == true) {
          element.classList.toggle('hidden');
          // remove loader
        }
      }
    };
    request.send();
}
// Trakt API - Gets the information of the random episode.

// Opens the filter menu. // DONE //
function filterToggle() {
  var element = document.getElementById("filters");
  element.classList.toggle('hidden');
}
// Opens the filter menu. // DONE //

//Shows comments button (needs a fix. after clicking again it becomes hidden.)
function loadComments() {
  var element = document.getElementById("loadCom");
  if (element.classList.contains('hidden') == true) {
    element.classList.toggle('hidden');
  }
}

//DISQUS
function loadDisqus() {
  var disqus_config = function () {
    this.page.identifier = pageURL; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    console.log(this.page.identifier);
  };

  (function() { // DON'T EDIT BELOW THIS LINE
  var d = document, s = d.createElement('script');
  s.src = 'https://randommifflin.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
  })();
};
//DISQUS
function showDisqus(){
  var element = document.getElementById("disqus_thread");
  if (element.classList.contains('hidden') == true) {
    element.classList.remove('hidden');
    document.getElementById('loadComments').innerHTML = 'Hide Comments';
  } else {
    element.classList.add('hidden')
    document.getElementById('loadComments').innerHTML = 'Show Comments';
  }
}
  //Change Page Title // DONE
function changeTitle(){
  var pageTitle = 'Random Mifflin | ' + 'Season ' + seasonNo + ' Episode ' + episodeNo;
  document.title = pageTitle;
  console.log(pageTitle);
}
//Change Page Title

//change page URL
function changeURL(){
  history.pushState(null, '', '?' + 's=' + seasonNo + '&' + 'e=' + episodeNo);
  pageURL = '?' + 's=' + seasonNo + '&' + 'e=' + episodeNo;
}
//change page URL

/*
Exclude option:
Scott's Tots - Season 6 Episode 12
Phyllis' Wedding - Season 3 Episode 15
Dinner Party - Season 4 Episode 13
The Banker - Season 6 Episode 14 (Filler Episode)
*/
