function randomMifflin() {
  // add loader

  seasonNo = Math.ceil(Math.random() * 9);
  if (seasonNo == 1) {
    episodeNo = Math.ceil(Math.random() * 6);
  } else if (seasonNo == 2) {
    episodeNo = Math.ceil(Math.random() * 22);
  } else if (seasonNo == 3) {
    episodeNo = Math.ceil(Math.random() * 23);
    if (document.getElementById('phyllis').checked == true && episodeNo == 15) {
      randomMifflin();
    }
  } else if (seasonNo == 4) {
    episodeNo = Math.ceil(Math.random() * 14);
    if (document.getElementById('jan').checked == true && episodeNo == 13) {
      randomMifflin();
    };
  } else if (seasonNo == 5) {
    episodeNo = Math.ceil(Math.random() * 26);
  } else if (seasonNo == 6) {
    episodeNo = Math.ceil(Math.random() * 26);
    if (
      (document.getElementById('scott').checked == true && episodeNo == 12) ||
      (document.getElementById('scott').checked == true && episodeNo == 14)){
      randomMifflin();
    };
  } else if (seasonNo == 7) {
    episodeNo = Math.ceil(Math.random() * 24);
  } else if (seasonNo == 8) {
    episodeNo = Math.ceil(Math.random() * 24);
  } else {
    episodeNo = Math.ceil(Math.random() * 23);
  }

  getURL() //get and change product urls
  changeTitle() //Change Page Title
  changeURL() // Change Page URL
  getThumb() //get thumbnail TMDB API
  getInfo() //get episode info TRAKT API
  loadDisqus() //get disqus comments

}

function randomMifflin(){
  seasonNo = shuffle(9);
  switch (seasonNo) {
    case 1:
      episodeNo = shuffle(6));
      break;
    case 2:
      episodeNo = shuffle(22));
      break;
    case 3:
      episodeNo = shuffle(23);
      if (document.getElementById('phyllis').checked == true && episodeNo == 15) {
        randomMifflin();
      }
      break;
    case 4:
      episodeNo = shuffle(14);
      if (document.getElementById('jan').checked == true && episodeNo == 13) {
        randomMifflin();
      };
      break;
    case 5:
      episodeNo = shuffle(26);
      break;
    case 6:
      episodeNo = shuffle(26);
      if (
        (document.getElementById('scott').checked == true && episodeNo == 12) ||
        (document.getElementById('scott').checked == true && episodeNo == 14)){
        randomMifflin();
      };
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
  loadDisqus() //get disqus comments

};

function shuffle (episodeCount){
  Math.ceil(Math.random() * episodeCount);
};