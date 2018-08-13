var vData, queryString, $, keys;
// var local.templates = {
  
// }
var episodeData = vData['TV Shows'].find((x) => {
  return vData.getId(x.title) == queryString.title;
}).seasons[queryString.season - 1].episodes[queryString.episode - 1];
console.logs('episodeData:', episodeData) 
var getVideo = (data) => {
  switch (data.video.location){
    case "Google Drive":
      return `
      <iframe class="video" src="https://drive.google.com/file/d/${data.video.id}/preview"></iframe>`
    case "URL":
      return `
      <video class="video" src="${data.video.url}"`
    case "local":
      return `
      <video class="video" srv="${data.video.path}`
  }
}
console.logs('getVideo(episodeData)', getVideo(episodeData))
$('#player').html(`
  ${getVideo(episodeData)}
  <div class="info">
     <header>${episodeData.title}</header>
     <tag>3 dots icon float right</tag>
     <p>Season: ${queryString.season}, Episode: ${queryString.episode} <span>${episodeData.airdate}</span></p>
     <p>${episodeData.summary}</p>
  </div>
`)
$("#list").html(`
<header>${queryString.title} season ${queryString.season} episode list:</header>
<ul class=>
`)