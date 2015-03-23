var ddm = ddm || {};
ddm.menu = (function ($) {

  /*= helpers =*/

  var helpers = {};
  helpers.scrollCap = function ($element) {
    var cap = function () {
      var scrollTop = $element.scrollTop();
      var minScrollTop = 0;
      var maxScrollTop = $element.get(0).scrollHeight - $element.height() - 1;

      if (scrollTop < minScrollTop) {
        $element.scrollTop(minScrollTop);
      } else if (scrollTop > maxScrollTop) {
        $element.scrollTop(maxScrollTop);
      }
    };

    $(function () {
      $element.on('touchstart.ddm.scroll-cap', cap);
      cap();
    });
  };

  helpers.styleSupported = (function () {
    var supported = [];

    var check = function (property) {
      var body = document.body || document.documentElement;
      var style = body.style;

      // check for standard
      if (typeof style[property] == 'string') { return true; }

      // check for vendor specific
      var vendors = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
      property = property.charAt(0).toUpperCase() + property.substr(1);

      for (var i = 0; i < vendors.length; i++) {
        var vendorProperty = vendors[i];
        if (typeof style[vendorProperty] == 'string') { return true; }
      }

      return false;
    };

    return function (property) {
      if (supported[property] === undefined) {
        supported[property] = check(property);
      }
      return supported[property];
    };
  })();

  helpers.transitionEnd = function (namespace) {
    return $.map([
      'webkitTransitionEnd',
      'otransitionend',
      'oTransitionEnd',
      'msTransitionEnd',
      'transitionend'
    ], function (event) {
      return event + '.' + namespace;
    }).join(' ');
  };



  /*= Container constructor =*/

  var Container = function ($element) {

    /* private */

    var container = this;
    $element.addClass('ddm-menu-container');
    var $content = $element.find('.ddm-menu-container__content');

    helpers.scrollCap($content);

    (function ensureOverlay($element) {
      var $inner = $element.find('.ddm-menu-container__inner');
      var $overlay = $inner.find('.ddm-menu-container__overlay');
      if ($overlay.length !== 0) { return; }
      $overlay = $('<div class="ddm-menu-container__overlay"></div>');
      $overlay.prependTo($inner);
      $overlay.on('click', function (event) {
        $('.ddm-menu--open').trigger('close.ddm.menu');
      });
    })($element);

    var lockScroll = function () {
      $content.addClass('ddm-menu-container__content--scroll-lock');
    };

    var unlockScroll = (function () {
      var unlock = function () {
        $content.removeClass('ddm-menu-container__content--scroll-lock');
      };

      if (!helpers.styleSupported('transition')) { return unlock; }

      var transitionEnd = helpers.transitionEnd('ddm.menu.container');
      return function () {
        $element.on(transitionEnd, function (event) {
          var isContainerInner = event.target === $element.find('.ddm-menu-container__inner').get(0);
          if (!isContainerInner) { return; }

          unlock();
          $element.off(transitionEnd);
        });
      };

    })();



    /* public */

    this.open = function (openClass) {
      $element.addClass(openClass);
      lockScroll();
    };

    this.close = function (openClass) {
      $element.removeClass(openClass);
      unlockScroll();
    };

  };



  /*= Menu constructor =*/

  var Menu = function ($element, $container) {

    /* private */

    $element.addClass('ddm-menu');
    var container = new Container($container);
    var menu = this;
    var containerClass = $element.hasClass('ddm-menu--right')
      ? 'ddm-menu-container--right-open'
      : 'ddm-menu-container--open';
    var toggles = [];



    /* public */

    this.isOpen = function () {
      return $element.hasClass('ddm-menu--open');
    };

    this.open = function () {
      $element.trigger('ddm.menu.open');
    };

    this.close = function () {
      $element.trigger('close.ddm.menu');
    };

    this.toggle = function () {
      $element.trigger('toggle.ddm.menu');
    };

    this.addToggles = function ($toggle1, $toggle2, $toggle3) {
      var args = Array.prototype.slice.apply(arguments);
      Array.prototype.push.apply(toggles, args);
      $.each(args, function (index, $toggle) {
        $toggle.on('click.ddm.menu', function () {
          menu.toggle();
        });
      });
    };

    this.teardown = function () {
      $element.trigger('teardown.ddm.menu');
    };



    /*= events =*/

    helpers.scrollCap($element);

    $element.on('open.ddm.menu', function () {
      $element.scrollTop(0);
      $element.addClass('ddm-menu--open');
      container.open(containerClass);
    });

    $element.on('close.ddm.menu', function () {
      container.close(containerClass);

      if (!helpers.styleSupported('transition')) {
        $element.removeClass('ddm-menu--open');
      }

      var transitionEnd = helpers.transitionEnd('ddm.menu.containerClose');
      $container.on(transitionEnd, function (event) {
        var isContainerInner = event.target === $container.find('.ddm-menu-container__inner').get(0);
        if (!isContainerInner) { return; }

        $element.removeClass('ddm-menu--open');
        $container.off(transitionEnd);
      });
    });

    $element.on('toggle.ddm.menu', function () {
      if (menu.isOpen()) {
        $element.trigger('close.ddm.menu');
      } else {
        $element.trigger('open.ddm.menu');
      }
    });

    $element.on('click.ddm.menu', function (event) {
      if (event.target === $element.get(0)) {
        $element.trigger('close.ddm.menu');
      }
    });

    $element.on('teardown.ddm.menu', function () {
      if (menu.isOpen()) {
        $element.trigger('close.ddm.menu');
      }
      $element.removeClass('ddm-menu ddm-menu--right');
      $element.off('.ddm.menu');
      $.each(toggles, function (index, $toggle) {
        $toggle.off('.ddm.menu');
      });
      $element.removeData('ddm-menu-api');
    });

  };



  /*= menu function =*/

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
