/* globals $ XMLHttpRequest */

$(document).ready(function () {
  var req = new XMLHttpRequest()
  req.open('GET', 'http://contesttrackerapi.herokuapp.com/', false)
  req.send()
  var jsonData = JSON.parse(req.responseText)

  for (var i = 0; i < jsonData['result']['ongoing'].length; i++) {
    var temp = jsonData['result']['ongoing'][i]
    if (temp.Name === 'Are you on Github? Star our Repo if you find it cool!') {
      continue
    }
    $('.ongoing').append('<div class=\'post-preview\'><a href=\'' + temp.url + '\'><h2 class=\'post-title\'>' + temp.Name + '</h2></a><p class=\'post-meta\'>Hosted by ' + temp.Platform + '  | Ends: ' + temp.EndTime + '</p><hr>')
  }
})
