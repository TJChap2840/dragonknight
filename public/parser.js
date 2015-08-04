/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 */
function sideBar(container) {
  var base_url = 'https://www.warcraftlogs.com:443/v1';
  var api_key = '4e6b85c57f6b99e30c1e296575957e12';
  var reports_url = base_url + '/reports/guild/Dragon%20Knight/Boulderfist/US?api_key=' + api_key;
  $.ajax({
    url: reports_url,
    dataType: 'json',
    success: function(raids) {
      $(container).append("<span class='list-group-item'><b>Recent Raid Logs</b></span>");
      var report_base = 'https://www.warcraftlogs.com/reports/';
      for (var i = raids.length - 1; i >= raids.length - 5; i--) {
        var raid = raids[i];
        var title = raid.title;
        var report_url = report_base + raid.id;
        var date = new Date(raid.start);
        
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var dayOfTheWeek = days[date.getDay()];
        // alert(dayOfTheWeek);
        var fight_url = base_url + '/report/fights/' + raid.id + '?api_key=' + api_key;
        // alert(fight_url);
        var thehtml = "<a href='" + report_url + "' target=_blank' class='list-group-item'>" + title + " • " + dayOfTheWeek + "</a>";
        $(container).append(thehtml);
        
        
        // $.ajax({
        //   url: fight_url,
        //   dataType: 'json',
        //   success: function (data) {
        //     var fight_text = " • ";
        //     var kills = [];
        //     var wipes = [];
        //     for (var i = 0; i < data.fights.length; i++) {
        //       var fight = data.fights[i];
        //       if (fight.kill) {
        //         kills.push(fight);
        //       } else {
        //         wipes.push(fight);
        //       }
        //     }
        //     if (kills.length > 0) {
        //       fight_text += kills.length + ' kill' + (kills.length > 1 ? 's' : '');
        //       if (wipes.length > 0) {
        //         fight_text += ' : ';
        //       }
        //     }

        //     if (wipes.length > 0) {
        //       fight_text += wipes.length + ' wipe' + (wipes.length > 1 ? 's' : '');
        //     }
        //     // var thehtml = "<a href='" + report_url + "' target=_blank' class='list-group-item'>" + title + " • " + dayOfTheWeek;
        //     fight_text += "</a>";
        //     $(container).append(fight_text);
        //   }
        // });
      };
    },
    error: function() {
      alert("error");
    }
  });

  url = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=';
  url +=  encodeURIComponent('http://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=5');
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(data) {
      $(container).append("<span class='list-group-item'><b>MMO Champion Latest News</b></span>");


      $.each(data.responseData.feed.entries, function(key, value) {
        var thehtml = "<a href='" + value.link + "' target='_blank' class='list-group-item'>" + value.title + "</a>";
        $(container).append(thehtml);
      });
    }
  });

  
}