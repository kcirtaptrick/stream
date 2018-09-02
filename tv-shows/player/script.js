var vData, queryString, $, keys;
// var local.templates = {
  
// }
var getEpisodeData = (titleId, season, episode) => {
  return vData['TV Shows'].find((x) => {
    return vData.getId(x.title) == titleId;
  }).seasons[season - 1].episodes[episode - 1];
}
var episodeData = getEpisodeData(queryString.title, queryString.season, queryString.episode);
console.logs('episodeData:', episodeData) 
var getVideo = (data) => {
  switch (data.video.location){
    case "Google Drive":
      return `
      <iframe class="video" src="https://drive.google.com/file/d/${data.video.id}/preview"></iframe>`
    case "URL":
      return `
      <video class="video" controls src="${data.video.url}"`
    case "local":
      return `
      <video class="video" controls srv="${data.video.path}`
  }
};
var getList = () => {
  
}
console.logs('getVideo(episodeData)', getVideo(episodeData))
$('#player').html(`
  ${getVideo(episodeData)}
  <div class="info">
     <div><header>${episodeData.title}</header>
     <tag>:</tag></div>
     <p>Season: ${queryString.season}, Episode: ${queryString.episode} <span>${episodeData.airdate}</span></p>
     <p>Summary: ${episodeData.summary}</p>
  </div>
`);
$("#list").html(`
<header>${queryString.title} season ${queryString.season} episode list:</header>
<ul>
  ${getList()}
</ul>
`);
$("#comments").html(`
<header>Comments</header>
<form action="comment.php">
  <input type="text" placeholder="Type your comment here.">
  <input type="submit" value="Comment">
</form>
<div class="info">
  <p>${'number of comments'} comments<p>
  <span>Sort By</span>
</div>
<div class="list"></div>
`)
for(var comment of episodeData.comments.list) {
  function replacer(match, p1, p2, p3, p4, p5, p6, offset, string) {
    return `<div class="comment"><header>${escapeStr.html(p1)}<p>${p2} ${p3}</p></header><div class="content">${escapeStr.html(p4)}</div><div class="rating">${p5 - p6}</div>`;
  }
  ${'#comments .list').append(JSON.stringify(comment, null, ' ').replace(/{\s*"username": "(.*)",\s*"datetime": "(.*)",\s*"note": "(.*)",\s*"content": "(.*)",\s*"likes": ([0-9]*),\s*"dislikes": ([0-9]*),?/g, replacer).replace(/},?|],?/g, '</div>').replace('"replies": [', '<div class="replies">'))
}

//http://jsbin.com/tofiluqeku/edit?html,css,js,console,output

