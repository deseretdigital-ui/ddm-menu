var ddm = ddm || {};
ddm.menu = (function ($) {


  // self documenting scroll helpers
  var scroll = {
    atTop: function (el, delta) {
      delta = delta || 0;
      return el.scrollTop + delta <= 0;
    },
    atBottom: function (el, delta) {
      delta = delta || 0;
      var currentScroll = el.scrollTop + el.offsetHeight;
      return currentScroll + delta >= el.scrollHeight;
    },
    cap: function (el) {
      if (this.atTop(el)) {
        el.scrollTop = 1;
      } else if (this.atBottom(el)) {
        el.scrollTop = el.scrollTop - 1;
      }
    },
    kill: function (el, eventNamespace) {
      var events = $.map([
        'touchmove', 'wheel'
      ], function (event) {
        return event + '.scroll-kill' + eventNamespace;
      }).join(' ');

      $(el).on(events, function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    },
    hasStuff: function (el) {
      // is there stuff to scroll?
      return el.offsetHeight < el.scrollHeight;
    },
    isolate: function (el, eventNamespace) {
      var scroll = this;
      var $element = $(el);

      // for mouse devices
      $element.on('wheel.scroll-isolate' + eventNamespace, function (event) {
        var el = this;

        // nothing to scroll
        if (!scroll.hasStuff(el)) {
          event.preventDefault();
          return;
        }

        // cap scroll if would leak to parent
        var delta = parseInt(event.originalEvent.deltaY, 10);
        var outOfBounds = scroll.atTop(el, delta) || scroll.atBottom(el, delta);
        if (outOfBounds) {
          scroll.cap(el);
          return;
        }

        // everything else
        event.stopImmediatePropagation();
      });

      // for touch devices
      $element.on('touchmove.scroll-isolate' + eventNamespace, function(event) {
        var el = this;

        // nothing to scroll
        if (!scroll.hasStuff(el)) {
          event.preventDefault();
          return;
        }

        // cap scroll prevents bounce on parents
        scroll.cap(el);
      });
    }
  };



  $(function ensureOverlay() {

    // check for existing overlay
    var $overlay = $('.ddm-menu-container__overlay');
    if ($overlay.length !== 0) { return; }

    // create overlay
    $overlay = $('<div class="ddm-menu-container__overlay"></div>');
    $overlay.prependTo('.ddm-menu-container');

    // events
    scroll.kill($overlay.get(0), '.overlay.ddm-menu');

    $overlay.on('click.overlay.ddm-menu', function (event) {
      ddm.menu($('.ddm-menu--open')).close();
    });

    $(document).on('keydown', function (event) {
      var ESC_KEY = 27;
      if (event.keyCode === ESC_KEY) {
        ddm.menu($('.ddm-menu--open')).close();
      }
    });

  });



  var Menu = function ($element, $container) {

    $element.addClass('ddm-menu');
    var menu = this;
    var containerClass = 'ddm-menu-container--open-left';
    if ($element.hasClass('ddm-menu--right')) {
      containerClass = 'ddm-menu-container--open-right';
    }
    var toggles = [];



    /* public methods */

    this.isOpen = function () {
      return $element.hasClass('ddm-menu--open');
    };

    this.open = function () {
      $element.trigger('open.ddm-menu');
    };

    this.close = function () {
      $element.trigger('close.ddm-menu');
    };

    this.toggle = function () {
      $element.trigger('toggle.ddm-menu');
    };

    this.addToggles = function ($toggle1, $toggle2, $toggle3) {
      var args = Array.prototype.slice.apply(arguments);
      Array.prototype.push.apply(toggles, args);
      $.each(args, function (index, $toggle) {
        $toggle.on('click.toggle.ddm-menu', function () {
          menu.toggle();
        });
      });
    };

    this.teardown = function () {
      $element.trigger('teardown.ddm-menu');
    };


    var hack = {
      do: function () {
        console.log('hack.do');
        $(document).trigger('resize');
        $('body').addClass('ddm-menu-scroll-hack');
      },
      undo: function () {
        console.log('hack.undo');
        $('body').removeClass('ddm-menu-scroll-hack');
      }
    };



    /*= events =*/
    scroll.isolate($element.get(0));

    $element.on('open.ddm-menu', function () {
      $element.scrollTop(0);
      $element.addClass('ddm-menu--open');
      $element.focus();
      $container.addClass(containerClass);
      hack.do();
    });

    $element.on('close.ddm-menu', function () {
      $container.removeClass(containerClass);
      $element.removeClass('ddm-menu--open');
      hack.undo();
    });

    $element.on('toggle.ddm-menu', function () {
      if (menu.isOpen()) {
        $element.trigger('close.ddm-menu');
      } else {
        $element.trigger('open.ddm-menu');
      }
    });

    $element.on('teardown.ddm-menu', function () {
      if (menu.isOpen()) {
        $element.trigger('close.ddm-menu');
      }
      $element.removeClass('ddm-menu ddm-menu--right');
      $element.off('.ddm-menu');
      $.each(toggles, function (index, $toggle) {
        $toggle.off('.ddm-menu');
      });
      $element.removeData('ddm-menu-api');
    });

  };



  var menu = function ($element) {
    $element = $element.eq(0); // only handles one menu at a time
    var api = $element.data('ddm-menu-api');
    if (!api) {
      var $container = $('.ddm-menu-container');
      api = new Menu($element, $container);
      $element.data('ddm-menu-api', api);
    }
    return api;
  };



  return menu;

})(jQuery);
