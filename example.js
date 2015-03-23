$(function () {
  $('.dummy-content[data-fill]').each(function (index, element) {
    var $element = $(element);
    var fill = $element.data('fill');
    for (var i = 0; i < fill; i++) {
      $element.append('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus congue porta felis non fringilla. Etiam nisl turpis, volutpat ut ipsum id, semper ornare velit. Aliquam non lectus rhoncus, laoreet nisl eget, elementum nisi. Nullam diam ligula, faucibus quis orci rhoncus, blandit facilisis odio. Curabitur iaculis convallis felis ut iaculis. Etiam ut orci ullamcorper ligula elementum elementum vel at odio. Pellentesque feugiat lorem leo, non interdum nisl tristique nec. Suspendisse iaculis urna non convallis.</p>');
    }
    if ($element.is('[data-fin]')) {
      $element.append('<p><a href="http://i.imgur.com/0KlIArS.gif">Fin</a></p>');
    }
  });
});
