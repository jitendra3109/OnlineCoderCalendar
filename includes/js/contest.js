/* globals $ XMLHttpRequest */

function changeTimezone (date) {
  var d = new Date(date)
  var offset = -(d.getTimezoneOffset())
  var newDate = new Date(d.getTime() + offset * 60000 - 19800000)
  return newDate
}

function parse_url (url) {
  var matches = url.match(/\.com\/(.*)$/)
  var res = matches[1]
  if (res.indexOf('.html') > -1) {
    res = res.split('.html')[0]
  }
  return res
}

$(document).ready(function () {
  var req = new XMLHttpRequest()
  req.open('GET', 'http://contesttrackerapi.herokuapp.com/', false)
  req.send()
  var jsonData = JSON.parse(req.responseText)
  var url = window.location.href
  var targetPlatform = parse_url(url).toUpperCase()
  var i, temp
  for (i = 0; i < jsonData['result']['ongoing'].length; i++) {
    temp = jsonData['result']['ongoing'][i]
    var endTime = changeTimezone(temp.EndTime).toString.slice(0, 21)
    if (temp.Platform !== targetPlatform) {
      continue
    }
    $('.ongoing').append('<div class=\'post-preview\'><a href=\'' + temp.url + '\'><h2 class=\'post-title\'>' + temp.Name + '</h2></a><p class=\'post-meta\'>Hosted by ' + temp.Platform + '  | Ends: ' + endTime + '</p><hr>')
  }
  for (i = 0; i < jsonData['result']['upcoming'].length; i++) {
    temp = jsonData['result']['upcoming'][i]
    var startTime = changeTimezone(temp.StartTime).toString.slice(0, 21)
    if (temp['Platform'] !== targetPlatform) {
      continue
    }
    $('.upcoming').append('<div class=\'post-preview\'><a href=\'' + temp.url + '\'><h2 class=\'post-title\'>' + temp.Name + '</h2><h3 class=\'post-subtitle\'>Duration: ' + temp['Duration'] + '</h3></a><p class=\'post-meta\'>Hosted by ' + temp.Platform + '  | Starts: ' + startTime + '</p><hr>')
  }
})

