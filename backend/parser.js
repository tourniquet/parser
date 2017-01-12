const request = require('request')
const cheerio = require('cheerio')

const categories = [
  'https://999.md/ru/list/real-estate/apartments-and-rooms?applied=1&aof=32&ef=32&ef=33&view_type=short'
]

function parsePage (url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (!err && res.statusCode === 200) resolve(body)
    })
  })
}

function promisePages (arr) {
  let promises = []
  arr.forEach(el => promises.push(parsePage(el)))
  return Promise.all(promises)
}

let urls = []
function parseUrls (body) {
  let $ = cheerio.load(body)

  $('.ads-list-table tbody tr').each((index, el) => {
    if ($(el).children('.ads-list-table-price').text() !== '  ') {
      let url = $(el).children('.ads-list-table-title').find('a').attr('href')
      urls.push(`https://999.md${url}`)
    }
  })
}

// let details = []
function getAdDetails (url, data) {
  let $ = cheerio.load(data)

  let title = $('.adPage__header h1').text()
  let phone = $('.adPage__content__phone').find('a').attr('href').slice(-8)

  // details.push({ title, phone })
  request(`http://localhost:1337/create?url=${url}&title=${title}&phone=${phone}`, (err, res, body) => {
    if (!err && res.statusCode === 200) console.log('Ok')
  })
}

promisePages(categories)
  .then(res => res.forEach(el => parseUrls(el)))
  .then(() => promisePages(urls))
  .then(res => res.forEach((el, i, arr) => getAdDetails(urls[i], el)))
  .catch(console.log.bind(console))

// const theAnswerToEverything = new Promise(resolve => {
//   setTimeout(()=>{
//     resolve(42)
//   }, 1000)
// })
