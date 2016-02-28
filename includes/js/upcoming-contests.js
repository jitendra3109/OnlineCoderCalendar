/* globals NProgress $ XMLHttpRequest */

function changeTimezone (date) {
  var d = new Date(date)
  var offset = -(d.getTimezoneOffset())
  var newDate = new Date(d.getTime() + offset * 60000 - 19800000)
  return newDate
}

$(document).ready(function () {
  var req = new XMLHttpRequest()
  NProgress.start()
  req.onload = function () {
    try {
      var jsonData = JSON.parse(this.responseText)
      NProgress.inc()
      for (var i = 0; i < jsonData['result']['upcoming'].length; i++) {
        var temp = jsonData['result']['upcoming'][i]
        var startTime = changeTimezone(temp.StartTime).toString().slice(0, 21)
        var extLink = temp.Platform.toLowerCase()
        if (temp.Platform === 'OTHER') {
          continue
        }
        $('.upcoming').append('<div class=\'post-preview\'><a href=\'' + temp.url + '\'><h2 class=\'post-title\'>' + temp.Name + '</h2><h3 class=\'post-subtitle\'>Duration: ' + temp['Duration'] + '</h3></a><p class=\'post-meta\'>Hosted by <a href=\'http://codingcalendar.com/' + extLink + '\'>' + temp.Platform + '</a>  | Starts: ' + startTime + '</p><hr>')
      }
    } catch (err) {
      console.log('Error occured')
      console.log(err)
    }
    NProgress.done()
  }
  req.onerror = function () {
    console.log('Error while trying to fetch the API')
    $('.ongoing').append('<div class=\'post-preview\' style=\'text-align: center\'><a href=\'' + '#' + '\'><h2 class=\'post-title\'>' + 'Oops! That request didn\'t go long!!' + '</h2><hr />')
  }
  req.open('GET', 'http://contesttrackerapi.herokuapp.com/')
  NProgress.set(0.4)
  req.send()
})
