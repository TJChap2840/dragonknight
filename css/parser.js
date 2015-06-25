/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 */
function parseRSS(url, container) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'jsonp',
    success: function(data) {
      // <span class="list-group-item"><b>MMO Champion News</b></span>

      //console.log(data.responseData.feed);
      $(container).html("<span class='list-group-item'><b>MMO Champion Latest News</b></span>");


      $.each(data.responseData.feed.entries, function(key, value) {
        // var thehtml = '<h3><a href="'+value.link+'" target="_blank">'+value.title+'</a></h3>';
        // $(container).append(thehtml);
        var thehtml = "<a href='" + value.link + "' target='_blank' class='list-group-item'>" + value.title + "</a>";
        $(container).append(thehtml);
      });
      // alert(data.responseData.feed.title);
    }
  });
}

function parseAPI(url, container) {
  // url = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url);
  $.ajax({

    // The 'type' property sets the HTTP method.
    // A value of 'PUT' or 'DELETE' will trigger a preflight request.
    type: 'GET',

    // The URL to make the request to.
    url: url,
    dataType: "jsonp",
    crossDomain: true,
    // The 'contentType' property sets the 'Content-Type' header.
    // The JQuery default for this property is
    // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
    // a preflight. If you set this value to anything other than
    // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
    // you will trigger a preflight request.
    contentType: 'application/json',

    xhrFields: {
      // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
      // This can be used to set the 'withCredentials' property.
      // Set the value to 'true' if you'd like to pass cookies to the server.
      // If this is enabled, your server must respond with the header
      // 'Access-Control-Allow-Credentials: true'.
      withCredentials: true
    },

    headers: {
      // Set any custom headers here.
      // If you set any non-simple headers, your server must include these
      // headers in the 'Access-Control-Allow-Headers' response header.
    },

    success: function(data) {
      // Here's where you handle a successful response.
      for (var obj in data) {
        console.log(obj + "=" + data[obj]);
      }
    },

    error: function(data) {
      console.log(data.toString());
      for (var obj in data) {
        console.log(obj + "=" + data[obj]);
      }
      // Here's where you handle an error response.
      // Note that if the error was due to a CORS issue,
      // this function will still fire, but there won't be any additional
      // information about the error.
    }
  });
}