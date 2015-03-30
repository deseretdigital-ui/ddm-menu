  // initialize left menu
  $(function () {
    var menu = ddm.menu($('#left-menu-example'));
    menu.addToggles(
      $('#left-menu-example .my-menu__head'),
      $('#left-menu-example-toggle')
    );
  });

  // initialize another left menu
  $(function () {
    var menu = ddm.menu($('#another-left-menu-example'));
    menu.addToggles(
      $('#another-left-menu-example .my-menu__head'),
      $('#another-left-menu-example-toggle')
    );
  });

  // initialize right menu
  $(function () {
    var menu = ddm.menu($('#right-menu-example'));
    menu.addToggles(
      $('#right-menu-example .my-menu__head'),
      $('#right-menu-example-toggle')
    );
  });


  // teardown menu
  $(function () {
    var initializeTeardownMenu = function () {
      $('#teardown-menu-example-buttons .toggle').show()
      $('#teardown-menu-example-buttons .teardown').show();
      $('#teardown-menu-example-buttons .initialize').hide();
      ddm.menu($('#teardown-menu-example')).addToggles(
        $('#teardown-menu-example .my-menu__head'),
        $('#teardown-menu-example-buttons .toggle')
      );
    };

    var teardownTeardownMenu = function () {
      $('#teardown-menu-example-buttons .toggle').hide();
      $('#teardown-menu-example-buttons .teardown').hide();
      $('#teardown-menu-example-buttons .initialize').show();
      ddm.menu($('#teardown-menu-example')).teardown();
    };
    $('#teardown-menu-example-buttons .teardown').on('click', teardownTeardownMenu);
    $('#teardown-menu-example-buttons .initialize').on('click', initializeTeardownMenu);
    initializeTeardownMenu();
  });
