var vData, keys, $;
var local = {};
local.templates = {
  test: 'hello',
  section: (title, link = '#') => { return `
    <div id="${vData.getId(title)}" class="section">
      <a href="${link}"><header class='main'>${title}</header></a>
      <ul class="card-list">
      </ul>
    </div>`
  },
  card: (title, cover) => {return `
    <li>
      <a href="#">
        <img src='${cover}'/>
        <div class="placeholder"></div>
        <div class='info'></div>
        <header>${title}</header>
      </a>
    </li>`
  }
}
var test = (cover) => {
  setTimeout(() => {
    return `<image src='${cover}'/>`;
  }, 3000)
}

console.log(document.querySelector(`nav#main ul li`));

var list = $(`nav#main ul li a`).map((x) => {
  return x.firstChild;
});
console.logs('list.length:',list.length)
for(var i = 0; i < list.length; i++) {
  console.log(`list[i]: ${list[i]}`)
}
for(let a = 0; a < keys.length; a++) {
  let section = {
    id: vData.getId(keys[a]),
    title: keys[a],
    data: vData[keys[a]] 
  }
  if(typeof vData[keys[a]] == 'object'){
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
            default:
            return "unknown"
          }
            
        }
      }
      $(`#${section.id} .card-list`).append(local.templates.card(card.title, card.image()));
      // $(`#${section.id} .card-list .li:nth-of-type(${b}) .placeholder`).css("height", )
    }
  }
}


