console.log("hi")

$(document).ready(function () {
  $.ajax({
    url: "https://api.spotify.com/v1/search?q=linkin+park&type=artist",
    datatype: 'JSONP'
  })
    .done(function(data) {
      console.log('data', data.artists);
        let itemArr = data.artists.items;
        let images = [];
        for (let i = 0; i < 1; i += 1) {
          images.push(itemArr[i].images[0].url);
        }
        console.log('images', images)
        for (let i = 0; i < images.length; i += 1) {
        let $img = $('<img>', { src: images[i] });
        $('#main').append($img)
        }
    })
    .fail(function(data) {
      console.log('error', data)
    })
});

$('#search').submit(function() {
  $('img').remove();
  $('p').remove();
  console.log('fire')
  event.preventDefault();
    var $inputs = $('#search :input');
    console.log('inputs', $inputs)
    let $url = "https://api.spotify.com/v1/search?q=" + $inputs[0].value + "&type=artist"
    console.log('url', $url)
      $.ajax({
    url: $url,
    datatype: 'JSONP'
  })
    .done(function(data) {
      let $name = $('<p>', { text: data.artists.items[0].name });
      $('#main').append($name)
      console.log('data', data.artists.items[0].images);
        let itemArr = data.artists.items;
        let images = [];
        for (let i = 0; i < 1; i += 1) {
          images.push(itemArr[i].images[0].url);
        }
        console.log('images', images)
        for (let i = 0; i < images.length; i += 1) {
        let $img = $('<img>', { src: images[i] });
        // let tempSRC = images[i]
        // $(img).attr("src", tempSRC)
        $('#main').append($img)
      }
      let genres = data.artists.items[0].genres
      console.log(genres)
        let $genreTitle = $('<p>GENRES</p>')
        $('#main').append($genreTitle)
        for (let i = 0; i < genres.length; i += 1) {
        let $genre = $('<p>', { id: 'genres' });
        $('#main').append($genre)
        $('p').last().text(genres[i]);
        }
    })
    .fail(function(data) {
      console.log('error', data)
      let $error = $('<p>', { text: 'Error' });
        $('#main').append($error)
    })
    $("#input").val("");
});