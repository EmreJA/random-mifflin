var seasonNo, episodeNo;
var seasonInfo = [[1, 6], [2, 22], [3, 23], [4, 14], [5, 26], [6, 26], [7, 24], [8, 24], [9, 23]];
var excludedSeasons = [];
var excludedEpisodes = [];

function randomMifflin () {
  seasonNo = seasonInfo[Math.floor(Math.random() * seasonInfo.length)][0];
  episodeNo = Math.ceil(Math.random() * seasonInfo[seasonNo - 1][1]);
}

randomMifflin();