var seasonNo, episodeNo;
var seasonInfo = [[1, 6], [2, 22], [3, 23], [4, 14], [5, 26], [6, 26], [7, 24], [8, 24], [9, 23]];
var excludedSeasons = [];
var excludedEpisodes = [];

function randomMifflin () {
  seasonNo = seasonInfo[Math.floor(Math.random() * seasonInfo.length)][0];
  episodeNo = Math.ceil(Math.random() * seasonInfo[seasonNo - 1][1]);
}

randomMifflin();

// // document.querySelector('#follower-stats').style.display = 'none';

// var seasonNo, episodeNo;
// var seasonInfo = [[1, 6], [2, 22], [3, 23], [4, 14], [5, 26], [6, 26], [7, 24], [8, 24], [9, 23]];

// // var seasonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// // var episodeCount = [6, 22, 23, 14, 26, 26, 24, 24, 23];
// var excludedSeasons = [];
// var excludedEpisodes = [];
// var toExEp = {
//   phyllis: {
//     season: 3,
//     episode: 15
//   },
//   jan: {
//     season: 4,
//     episode: 13
//   },
//   scott: {
//     season: 6,
//     episode: 12
//   },
//   filler: {
//     season: 6,
//     episode: 14
//   }
// };

// function randomMifflin () {
//   //choose a season number
//   seasonNo = seasonInfo[Math.floor(Math.random() * seasonInfo.length)][0];
//   //check if the season is excluded
//   if (excludedSeasons.indexOf(seasonNo) > -1) {
//     randomMifflin();
//   }
//   //choose an episode number
//   episodeNo = Math.ceil(Math.random() * seasonInfo[seasonNo - 1][1]);
//   //check if the episode is excluded
//   // pushEpisodeFilter();
// }

// function pushEpisodeFilter (elementID, fltrEpNo) {
//   let eID = document.getElementById(elementID);
//   if (eID.checked == true && episodeNo == fltrEpNo) {
//     randomMifflin();
//   }
// };

// // function randomMifflin () {
// //   seasonNo = seasonCount[Math.floor(Math.random() * seasonCount.length)]; 
// //   episodeNo = Math.floor(Math.random() * episodeCount[seasonNo - 1]) + 1;
// // };


// randomMifflin();
// console.log(seasonNo);
// console.log(episodeNo);
// console.table(toExEp);
