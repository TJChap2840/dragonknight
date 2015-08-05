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
      var report_base = 'https://www.warcraftlogs.com/reports/';
      var counter = 0;
      for (var i = raids.length - 1; i >= raids.length - 5; i--) {
        counter++;
        var raid = raids[i];
        var title = raid.title;
        var report_url = report_base + raid.id;

        var date = new Date(raid.start);
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var dayOfTheWeek = days[date.getDay()];

        document.getElementById("link" + counter).href = report_url;
        document.getElementById("title" + counter).innerHTML = title;
        document.getElementById("day" + counter).innerHTML = "<em>" + dayOfTheWeek + "</em>";
        var fight_url = base_url + '/report/fights/' + raid.id + '?api_key=' + api_key;

        var div = $("#stats" + counter);
    
        $.ajax({
          url: fight_url,
          dataType: 'json',
          success: function (data) {
            var kills = [];
            var wipes = [];
            for (var i = 0; i < data.fights.length; i++) {
              var fight = data.fights[i];
              if (fight.kill) {
                kills.push(fight);
              } else {
                wipes.push(fight);
              }
            }
            if (kills.length > 0) {
              div.append($("<span></span>").text(kills.length + 'k'));
              if (wipes.length > 0) {
                div.append($("<span></span>").text('/'));
              }
            }

            if (wipes.length > 0) {
              div.append($("<span></span>").text(wipes.length + 'w'));
            }
          }
        });
      };
    },
    error: function() {
      alert("error");
    }
  });

  /* MMO CHAMPION */
  url = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=';
  url +=  encodeURIComponent('http://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=5');
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(data) {

      var counter = 0;
      $.each(data.responseData.feed.entries, function(key, value) {
        counter++;
        document.getElementById("mmo" + counter).href = value.link;
        document.getElementById("mmo" + counter).innerHTML = value.title; 
      });
    }
  });

  
}