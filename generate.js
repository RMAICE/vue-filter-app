const fs = require('fs');
const uniq = require('uniqid');

let brands = ['Samsung', 'LG', 'Sony', 'Vizio', 'TCL', 'Hisense']
let techs = ['LED', 'OLED']
let resolution = ['full HD', 'ultra HD (4k)']
let features = ['Поддержка 3Д', 'Изогнутый экран']

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomFeatures() {
  let generatedFeatures = features.slice(random(0, 3), random(1, 3))

  return generatedFeatures
}

let tvScreens = []

for (let i = 0; i < 2001; i++) {
  let id = uniq()
  let brand = brands[random(0, 5)]
  let size = random(36, 44)
  let res = resolution[random(0, 2)]
  let name = `${brand} ${id} ${res} ${size}"`
  let tvScreen = {
    brand,
    size,
    res,
    name,
    tech: techs[random(0, 2)],
    price: random(6800, 680000),
    features: randomFeatures(),
    image: `https://fakeimg.pl/350x200/?text=${id}`
  }

  tvScreens.push(tvScreen)
}

fs.writeFileSync('./public/static/screens.json', JSON.stringify(tvScreens))