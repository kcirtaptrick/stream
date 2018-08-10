

$(document).ready(() => {
var local = {};
local.templates = {
  test: 'hello',
  section: (title, link = '#') => { return `
    <div id="${title.toLowerCase().replace(' ', '-')}" class="section">
      <a href="${link}"><header class='main'>${title}</header></a>
      <ul class="card-list">
      </ul>
    </div>`
  },
  card: (title, cover) => {return `
    <li>
      <a href="#">
        <img src='${cover}'/>
        <div class='info'></div>
        <header>${title}</header>
      </a>
    </li>`
  }
}

for(let a = 0; a < keys.length; a++) {
  let section = {
    id: keys[a].toLowerCase().replace(' ', '-'),
    title: keys[a],
    data: vData[keys[a]] 
  }
  $('#sections').append(local.templates.section(section.title, $(`nav#main ul li:nth-of-type(${a + 2}) a`).attr('href')))
  for(let b = 0; b < vData[keys[a]].length; b++) {
    let card = {
      data: vData[keys[a]][b],
      title: vData[keys[a]][b].title,
      image: () => {
        switch (vData[keys[a]][b].image.location){
          case "Google Drive":
            return `https://lh3.google.com/u/0/d/${vData[keys[a]][b].image.id}`;
            break;
          case "URL":
            return vData[keys[a]][b].image.url;
            break;
          case "Local":
            return vData[keys[a]][b].image.path;
            break;
        }
          
      }
    }
    console.log(keys[a].toLowerCase().replace(' ', '-'))
    $(`#${section.id} .card-list`).append(local.templates.card(card.title, card.image()));
  }
}
})