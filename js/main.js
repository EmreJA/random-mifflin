/*
To-do:
- Exclude episodes
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
*/

// Listens to the Random Mifflin button.
document.getElementById("randomMifflin").addEventListener("click", randomMifflin);
var seasonNo;
var pageURL;
//Runs the random episode selector.
function randomMifflin() {

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

  //Change Page Title // DONE
  var pageTitle = 'Random Mifflin | ' + 'S' + seasonNo + 'E' + episodeNo;
  document.title = pageTitle;
  console.log(pageTitle);
  //Change Page Title // DONE

  //change page URL
  history.pushState(null, '', '?S' + seasonNo + 'E' + episodeNo);
  pageURL = '?S' + seasonNo + 'E' + episodeNo;
  //TMDB API generates episode thumbnail
  var thumbRequest = new XMLHttpRequest();

  thumbRequest.open('GET', 'https://api.themoviedb.org/3/tv/2316/season/' + seasonNo + '/episode/' + episodeNo + '/images?api_key=c4e0e43db456cb63f04bead90cf06afc');

  thumbRequest.onload = function () {
    var thumbData = JSON.parse(thumbRequest.responseText);
    console.log('https://image.tmdb.org/t/p/original/' + thumbData.stills['0'].file_path);
    var imgURL = 'https://image.tmdb.org/t/p/original/' + thumbData.stills['0'].file_path;
    document.getElementById('thumbnail').src = imgURL;
  };
  thumbRequest.send();

  // Trakt API - Gets the information of the random episode.
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
      console.log(response.runtime + ' mins.');
      document.getElementById('runtime').innerHTML = response.runtime + ' mins.';
      console.log(response.rating + '/10');
      document.getElementById('rating').innerHTML = (response.rating).toFixed(1) + '/10';
      //console.log('Aired On: ' + response.first_aired);
      //document.getElementById('aired').innerHTML = 'Aired On: ' + response.first_aired;
      console.log('Season ' + response.season + ' ' + 'Episode ' + response.number);
      document.getElementById('seasonInfo').innerHTML = response.season;
      document.getElementById('episodeInfo').innerHTML = response.number;
      console.log(response.overview);
      document.getElementById('overview').innerHTML = response.overview;
      var element = document.getElementById("info");

      if (element.classList.contains('hidden') == true) {
        element.classList.toggle('hidden');
      }
    }
  };
  request.send();
}



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

//DISQUS (Needs fixing. Page Identifier needs to be dynamically generated.)
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
}
//DISQUS

/*
Exclude option:
Scott's Tots - Season 6 Episode 12
Phyllis' Wedding - Season 3 Episode 15
Dinner Party - Season 4 Episode 13
The Banker - Season 6 Episode 14 (Filler Episode)
*/
