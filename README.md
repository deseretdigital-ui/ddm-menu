# Menu

Creates an offscreen menu. See the [demo](http://creatives.deseretdigital.com/ksl-assets/build/static/components/menu/index.html).


## Setup

Attach files:

```html
<script src="ksl-assets/static/components/common.js"></script>
<link href="ksl-assets/static/components/menu/menu.css" rel="stylesheet" type="text/css" />
<script src="ksl-assets/static/components/menu/menu.js"></script>
```

The menu also relies on jQuery, which you probably already have somewhere.

There are very specific requirements for the HTML structure in order for the menu to work properly.
If you want it to work correctly, do it like this, otherwise you are on your own:

```html
<body>

  <div class="ksl-assets-container">
    <div class="inner">

      <!-- fixed/absolute position elements here. -->

      <div class="content">

        <!-- your menus and content here. -->

        <div class="ksl-assets-menu">
          <!-- menu content here! -->
        </div>

        <!-- your content here! -->

      </div><!-- /.content -->

    </div><!-- /.inner -->
  </div><!-- /.container -->

</body>
```

How it works ...

+ The `.ksl-assets-container` fills the entire screen and hides overflow.
+ The `.inner` element fills the `.ksl-assets-container` and is what moves over when a menu opens.
  Any elements you want to move over, with the page, when the menu opens, should be inside this
  element. The `.content` element and `.ksl-assets-menu` elements are positioned absolute against
  this element, so they move over when it moves over as well.
+ The `.content` element fills the `.inner` element and is made scrollable. When the menu is open
  scrolling is locked on this element. Because `-webkit-overflow-scrolling: touch` is used on this
  element it must not contain, except for `.ksl-asset-menu` elements, any fixed or absolute
  position elements. Place these elements in the `.inner` element if you want them to move with the
  page. Any elements that you want to scroll as part of the page belong in here.
+ The `.ksl-assets-menu` elements are positioned absolute to the `.inner` element. They can be
  placed anywhere inside the `.inner` element, even in `.content`, but must have static position
  parents all the way up to the `.inner` element. Nesting them in `.content` allows you to design
  them responsively, for example, as a menu on smaller screens, but as a sidebar on larger screens.

Initializing the menu is simple. Here is code from the demo page:

```javascript
$(function () {

  ksl.assets.menu($('.menu-left')).addToggles(
    $('.menu-left .head'),
    $('.header .menu-left-toggle')
  );

  ksl.assets.menu($('.menu-right')).addToggles(
    $('.menu-right .head'),
    $('.header .menu-right-toggle')
  );

});
```

In the past we tried to wire up toggles for you for free but decided explicitly registering toggles
with your menus is cleaner and easier to manage.


## Right Menu

Just add the `menu-right` modifier class to the menu element:

```html
<div class="ksl-assets-menu menu-right">
  <!-- menu content here! -->
</div>
```

That simple.


## jQuery Plugin

Alternatively, a jQuery plugin is registered if there is no conflict with other jQuery plugins.
The code from the demo page would look like this instead:

```javascript
$(function () {

  $('.menu-left').menu().addToggles(
    $('.menu-left .head'),
    $('.header .menu-left-toggle')
  );

  $('.menu-right').menu().addToggles(
    $('.menu-right .head'),
    $('.header .menu-right-toggle')
  );

});
```


## API


### `ksl.assets.menu($element)`

Constructs a new menu object.

| Parameter  | Type   | Description                            |
|------------|--------|----------------------------------------|
| `$element` | jQuery | jQuery object that represents element. |

Returns a `Menu` object.


### `$element.menu()`

jQuery plugin and alias for `ksl.assets.menu($element)`. Only defined if it hasn't been
defined.


### `Menu`

Javascript object that represents a single menu.

| Method                                | Description                                                                                                                            |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `isOpen()`                            | Tells you if the menu is open or not.                                                                                                  |
| `open()`                              | Triggers the open event.                                                                                                               |
| `close()`                             | Triggers the close event.                                                                                                              |
| `toggle()`                            | Triggers toggle event.                                                                                                                 |
| `addToggles($toggle1, $toggle2, ...)` | Attaches one or more $toggle jQuery objects to the menu component. Click event on any toggle will simply trigger toggle event on menu. |
| `teardown()`                          | Triggers the teardown event.                                                                                                           |

| Event      | Description                                                             |
|------------|-------------------------------------------------------------------------|
| `open`     | Triggered when the menu begins opening.                                 |
| `close`    | Triggered whent the menu begins closing.                                |
| `toggle`   | Triggers open or close events.                                          |
| `teardown` | Removes styling classes and event handlers on menu element and toggles. |
