/*
To-do:
- Exclude episodes
- Select season: if a season is selected, generate numbers only for that season. Also, disable options for episodes according to the selected season.
- Info Card: Episode's information from Trakt API.
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

//Runs the random episode selector.
function randomMifflin() {

  var seasonNo = Math.ceil(Math.random() * 9);

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

  //Writes the random episode info into the HTML.
  document.getElementById("episodeInfo").innerHTML = 'You may want to watch Season ' + seasonNo + ', Episode ' + episodeNo + '.';

  // Trakt API - Gets the information of the random episode.
  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.trakt.tv/shows/the-office/seasons/' + seasonNo + '/episodes/' + episodeNo + '?extended=full');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('trakt-api-version', '2');
  request.setRequestHeader('trakt-api-key', 'c66faa4cdb7c9815a82e9e066821f317ebc6086a6217a1b0934169ea55fbd492');

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', JSON.parse(this.responseText));
    }
  };

  request.send();

}

// Opens the filter menu.
function filterToggle() {
  var element = document.getElementById("filters");
  element.classList.toggle('hidden');
}

/*
Exclude option:
Scott's Tots - Season 6 Episode 12
Phyllis' Wedding - Season 3 Episode 15
Dinner Party - Season 4 Episode 13
The Banker - Season 6 Episode 14 (Filler Episode)
*/
