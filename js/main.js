document.getElementById("randomMifflin").addEventListener("click", randomMifflin);
// document.getElementById("randomMifflin").addEventListener("click", showComm);
document.getElementById("fltr").addEventListener("click", filterToggle);

var seasonNo;
var episodeNo;
var pageURL;
var urlData;
seasonNo = getQueryVariable('s');
episodeNo = getQueryVariable('e');

if (seasonNo && episodeNo !== undefined) {
  getURL() //get and change product urls
  getThumb() //get thumbnail TMDB API
  getInfo() //get episode info TRAKT API
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
function randomMifflin () {
  seasonNo = shuffle(9);
  switch (seasonNo) {
    case 1:
      episodeNo = shuffle(6);
      break;
    case 2:
      episodeNo = shuffle(22);
      break;
    case 3:
      episodeNo = shuffle(23);
      episodeFilter ('phyllis', 15);
      break;
    case 4:
      episodeNo = shuffle(14);
      episodeFilter ('jan', 13);
      break;
    case 5:
      episodeNo = shuffle(26);
      break;
    case 6:
      episodeNo = shuffle(26);
      episodeFilter ('scott', 12);
      episodeFilter ('filler', 14);
      break;
    case 7:
      episodeNo = shuffle(24);
      break;
    case 8:
      episodeNo = shuffle(24);
      break;
    case 9:
      episodeNo = shuffle(23);
      break;
    default:
      break;
  };
 
  getURL() //get and change product urls
  changeTitle() //Change Page Title
  changeURL() // Change Page URL
  getThumb() //get thumbnail TMDB API
  getInfo() //get episode info TRAKT API

};

function shuffle (episodeCount){
  return Math.ceil(Math.random() * episodeCount);
};

function episodeFilter (elementID, filteredEpisodeNo) {
  if (document.getElementById(elementID).checked == true && episodeNo == filteredEpisodeNo) {
    console.log(`Episode ${filteredEpisodeNo} detected, rerunning the script.`);
    randomMifflin();
  }
};
//gets amazon and itunes urls from db.json
function getURL() {
  var dataRequest = new XMLHttpRequest();
  dataRequest.open('GET', 'js/db.json');
  dataRequest.onload = () => {
    urlData = JSON.parse(dataRequest.response);
    document.getElementById('aHREF').href = urlData.season[seasonNo - 1]["0"];
    document.getElementById('iHREF').href = urlData.season[seasonNo - 1][1];
  }
  dataRequest.send();
}
//gets amazon and itunes urls from db.json

//TMDB API generates episode thumbnail
function getThumb() {
  var thumbRequest = new XMLHttpRequest();
  thumbRequest.open('GET', `https://api.themoviedb.org/3/tv/2316/season/${seasonNo}/episode/${episodeNo}/images?api_key=c4e0e43db456cb63f04bead90cf06afc`);
  thumbRequest.onload = () => {
    var thumbData = JSON.parse(thumbRequest.responseText);
    var imgURL = `https://image.tmdb.org/t/p/original/${thumbData.stills['0'].file_path}`;
    document.getElementById('thumbnail').src = imgURL;
  };
  thumbRequest.send();
}
//TMDB API generates episode thumbnail

// Trakt API - Gets the information of the random episode.
function getInfo() {
  var request = new XMLHttpRequest();

  request.open('GET', `https://api.trakt.tv/shows/the-office/seasons/${seasonNo}/episodes/${episodeNo}?extended=full`);

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('trakt-api-version', '2');
  request.setRequestHeader('trakt-api-key', 'c66faa4cdb7c9815a82e9e066821f317ebc6086a6217a1b0934169ea55fbd492');

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      document.getElementById('title').innerHTML = response.title;
      document.getElementById('runtime').innerHTML = `${response.runtime} mins.`;
      document.getElementById('rating').innerHTML = `${(response.rating).toFixed(1)}/10`;
      document.getElementById('seasonInfo').innerHTML = response.season;
      document.getElementById('episodeInfo').innerHTML = response.number;
      document.getElementById('overview').innerHTML = response.overview;
      document.getElementById('imdbHREF').href = `https://www.imdb.com/title/${response.ids.imdb}`;
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

//Change Page Title // DONE
function changeTitle() {
  var pageTitle = `Random Mifflin | Season ${seasonNo} Episode ${episodeNo}`;
  document.title = pageTitle;
  console.log(pageTitle);
}
//Change Page Title

//change page URL
function changeURL() {
  history.pushState(null, '', `?s=${seasonNo}&e=${episodeNo}`);
  pageURL = `?s=${seasonNo}&e=${episodeNo}`; 
}
//change page URL