/* globals $ XMLHttpRequest */

function changeTimezone (date) {
  var d = new Date(date)
  var offset = -(d.getTimezoneOffset())
  var newDate = new Date(d.getTime() + offset * 60000 - 19800000)
  return newDate
}

$(document).ready(function () {
  var req = new XMLHttpRequest()
  req.open('GET', 'http://contesttrackerapi.herokuapp.com/', false)
  req.send()
  var jsonData = JSON.parse(req.responseText)

  for (var i = 0; i < jsonData['result']['upcoming'].length; i++) {
    var temp = jsonData['result']['upcoming'][i]
    var startTime = changeTimezone(temp.StartTime).toString().slice(0, 21)
    var extLink = temp.Platform.toLowerCase()
    $('.upcoming').append('<div class=\'post-preview\'><a href=\'' + temp.url + '\'><h2 class=\'post-title\'>' + temp.Name + '</h2><h3 class=\'post-subtitle\'>Duration: ' + temp['Duration'] + '</h3></a><p class=\'post-meta\'>Hosted by <a href=\'http://codingcalendar.com/' + extLink + '\'>' + temp.Platform + '</a>  | Starts: ' + startTime + '</p><hr>')
  }
})
