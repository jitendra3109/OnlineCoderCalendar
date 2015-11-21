/* globals Date $ XMLHttpRequest */

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

  for (var i = 0; i < jsonData['result']['ongoing'].length; i++) {
    var temp = jsonData['result']['ongoing'][i]
    var extLink = temp.Platform.toLowerCase()
    console.log(extLink)
    if (temp.Name === 'Are you a Github User? \'Star\' Our Repo if you find it cool!') {
      continue
    }
    var endTime = changeTimezone(temp.EndTime).toString().slice(0, 21)
    $('.ongoing').append('<div class=\'post-preview\'><a href=\'' + temp.url + '\'><h2 class=\'post-title\'>' + temp.Name + '</h2></a><p class=\'post-meta\'>Hosted by <a href=\'http://codingcalendar.com/' + extLink + '\'>' + temp.Platform + '</a>  | Ends: ' + endTime + '</p><hr>')
  }
})
