var seCount = [1, 2, 3, 4, 5, 6, 7, 8, 9]

var epCount = {
  "1" : 6,
  "2" : 22,
  "3" : 23,
  "4" : 14,
  "5" : 26,
  "6" : 26,
  "7" : 24,
  "8" : 24,
  "9" : 23
}

document.getElementById('phyllis').checked == true 
? randomMifflin() 
: episodeNo = Math.ceil(Math.random() * 23);

if (document.getElementById('phyllis').checked == true && episodeNo == 15) {
  randomMifflin();
}

function episodeFilter (elementID, filteredEpisodeNo) {
  if (document.getElementById(elementID).checked == true && episodeNo == filteredEpisodeNo) {
    randomMifflin();
  }
}

function seasonFilter (elementID) {
  if (document.getElementById(elementID).checked == true) {
    console.log(`${elementID} detected, rerunning the script.`);
    randomMifflin();
  }
};