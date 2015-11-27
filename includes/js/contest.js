/* globals $ XMLHttpRequest */

function changeTimezone (date) {
  var d = new Date(date)
  var offset = -(d.getTimezoneOffset())
  var newDate = new Date(d.getTime() + offset * 60000 - 19800000)
  return newDate
}

function parse_url (url) {
  if (url.indexOf('file') > -1) {
    return 'codeforces'
  }
  var matches = url.match(/\.com\/(.*)$/)
  var res = matches[1]
  if (res.indexOf('.html') > -1) {
    res = res.split('.html')[0]
  }
  return res
}

$(document).ready(function () {
  var req = new XMLHttpRequest()
  req.onload = function () {
    try {
      var url = window.location.href
      var targetPlatform = parse_url(url).toUpperCase()
      var i, temp
      var jsonData = JSON.parse(this.responseText)
      for (i = 0; i < jsonData['result']['ongoing'].length; i++) {
        temp = jsonData['result']['ongoing'][i]
        var endTime = changeTimezone(temp.EndTime).toString().slice(0, 21)
        if (temp.Platform !== targetPlatform) {
          continue
        }
        $('.ongoing').append('<div class=\'post-preview\'><a href=\'' + temp.url + '\'><h2 class=\'post-title\'>' + temp.Name + '</h2></a><p class=\'post-meta\'>Hosted by ' + temp.Platform + '  | Ends: ' + endTime + '</p><hr>')
      }
      for (i = 0; i < jsonData['result']['upcoming'].length; i++) {
        temp = jsonData['result']['upcoming'][i]
        var startTime = changeTimezone(temp.StartTime).toString().slice(0, 21)
        if (temp['Platform'] !== targetPlatform) {
          continue
        }
        $('.upcoming').append('<div class=\'post-preview\'><a href=\'' + temp.url + '\'><h2 class=\'post-title\'>' + temp.Name + '</h2><h3 class=\'post-subtitle\'>Duration: ' + temp['Duration'] + '</h3></a><p class=\'post-meta\'>Hosted by ' + temp.Platform + '  | Starts: ' + startTime + '</p><hr>')
      }
    } catch (err) {
      console.log('Error while trying to fetch the API')
      console.log(err)
      $('.ongoing').append('<div class=\'post-preview\' style=\'text-align: center\'><a href=\'' + '#' + '\'><h2 class=\'post-title\'>' + 'Oops! That request didn\'t go long!!' + '</h2><hr />')
    }
  }
  req.open('GET', 'http://contesttrackerapi.herokuapp.com/')
  req.send()
})
