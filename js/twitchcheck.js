
function checkTwitch(container, url) {
  $.ajax({ 
    url: url,
    dataType:'jsonp',
    success: function(data) { 
      var channel = data._links.channel;
      $.ajax({
        url: channel,
        dataType: 'jsonp',
        success: function(channel_info) {
          document.getElementById(container).href = channel_info.url;
        }
      });
      var status = "OFFLINE";
      document.getElementById(container).style.background = "#ffe5e5";
      if (data.stream != null) {
        status = "LIVE";
        document.getElementById(container).style.background = "#c5ecc5";
        document.getElementById(container + "Title").innerHTML = "<em>" + data.stream.channel.status + "<em>";
        document.getElementById(container + "Game").innerHTML = "Playing <b>" + data.stream.game + "</b>";
      } 
      document.getElementById(container + "Status").innerHTML  = status
    }
 });
}