const request = require('request')
const cheerio = require('cheerio')
// const mongoose = require('mongoose')

const url = 'https://999.md/ru/list/real-estate/apartments-and-rooms?applied=1&aof=32&ef=32&ef=33&view_type=short'

const getUrls = new Promise((resolve, reject) => {
  request(url, (err, res, body) => {
    if (err) throw err

    if (res.statusCode === 200) resolve(body)
  })
})

let urls = []
getUrls
  .then((result) => {
    let $ = cheerio.load(result)

    $('.ads-list-table tbody tr').each((index, el) => {
      if ($(el).children('.ads-list-table-price').text() !== '  ') {
        urls.push(
          `https://999.md${$(el).children('.ads-list-table-title').find('a').attr('href')}`
        )
      }
    })
  })
  .then(() => console.log(urls))

// Promise.all(urls)
//   .then((url) => {
//     url.forEach(el => some(el))
//   })
//   .then(() => console.log(urls))

// let results = []
// Promise.all(urls)
//   .then(url => {
//     url.forEach(el => results.push(`https://999.md${el}`))
//   })
//   .then(() => {
//     console.log(results)
//   })
//   .catch(console.log.bind(console))

// var fs = require('fs')
// var urls = []
// var names = []
// var prices = []
// var dates = []
// var createDate = new Date()
// var monthNames = ['янв.', 'februarie', 'martie', 'aprilie', 'мая', 'июня', 'июля', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.']
// var todayDate = createDate.getDate() + ' ' + monthNames[createDate.getMonth()] + ' ' + createDate.getFullYear()
//
// request('http://999.md/list/real-estate/apartments-and-rooms?applied=1&o_32_7=12909', function (err, resp, body) { // apartamente
//   if (!err && resp.statusCode === 200) {
//     var $ = cheerio.load(body)
//     $('.ads-list-table-title-wrapper a').each(function () {
//       var url = $(this).attr('href')
//       urls.push(url)
//
//       var rawName = $(this).text()
//       var adName = rawName.replace(/"/g, '\'')
//       names.push(adName)
//     })
//
//     $('.ads-list-table-price').each(function () {
//       var price = $(this).text()
//       if (price === '\n\n') {
//         price = 'some price'
//       }
//       prices.push(price.slice(2, -2)) // When parse data, price have two new line simbols at start and at the end (\n)
//     })
//
//     $('.ads-list-table-date').each(function () {
//       var date = $(this).text()
//       var newDate = date.split(',')
//
//       dates.push(newDate[0])
//     })
//   }
//
//   var yesterdayDate
//
//   if (parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'янв.' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'мая' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'iulie' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'окт.' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'дек.') {
//     yesterdayDate = '30 ' + (monthNames[createDate.getMonth() - 1]) + ' ' + createDate.getFullYear()
//   } else if (parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'februarie' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'aprilie' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'июня' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'авг.' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'сент.' ||
//     parseInt(todayDate) === '1' && monthNames[createDate.getMonth()] === 'нояб.') {
//     yesterdayDate = '31 ' + (monthNames[createDate.getMonth() - 1]) + ' ' + createDate.getFullYear()
//   } else {
//     yesterdayDate = (createDate.getDate() - 1) + ' ' + monthNames[createDate.getMonth()] + ' ' + createDate.getFullYear()
//   }
//
//   for (var i = 0; i < urls.length; i++) {
//     if (yesterdayDate === dates[i] && prices[i] !== 'me pri') {
//       fs.appendFile('links.txt',
//         ('\t{' + '\n\t\t' + '"url": "http://999.md' + urls[i] + '",' + '\n\t\t' + '"adName": ' + '"' + names[i] + '",' + '\n\t\t' + '"price": ' + '"' + prices[i] + '",' + '\n\t\t' + '"date": ' + '"' + dates[i] + '",' + '\n\t\t' + '"category" :' + ' "apartaments"' + '\n\t},\n'),
//         function (err) {
//           if (err) throw err
//         })
//     }
//   }
// })
