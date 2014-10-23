# Menu

Creates an offscreen menu. See the [example](http://deseretdigital-ui.github.io/ddm-menu/).


## Bower

```shell
bower install --save ddm-menu
```


## Setup

Attach files:

```html
<link href="menu.css" rel="stylesheet" type="text/css" />
<script src="menu.js"></script>
```

The menu also relies on jQuery, which you probably already have somewhere.

There are very specific requirements for the HTML structure in order for the menu to work properly.
If you want it to work correctly, do it like this, otherwise you are on your own:

```html
<body>

  <div class="ddm-menu-container">
    <div class="ddm-menu-container__inner">

      <!-- fixed/absolute position elements here. -->

      <div class="ddm-menu-container__content">

        <!-- your menus and content here. -->

        <div class="ddm-menu">
          <div class="ddm-menu__inner">
            <!-- menu content here! -->
          </div>
        </div>

        <!-- your content here! -->

      </div>

    </div>
  </div>

</body>
```

How it works ...

+ The `.ddm-menu-container` fills the entire screen and hides overflow.
+ The `.ddm-menu-container__inner` element fills the `.ddm-menu-container` and is what moves over when a menu opens.
  Any elements you want to move over, with the page, when the menu opens, should be inside this
  element. The `.ddm-menu-container__content` element and `.ddm-menu` elements are positioned absolute against
  this element, so they move over when it moves over as well.
+ The `.ddm-menu-container__content` element fills the `.ddm-menu-container__inner` element and is made scrollable. When the menu is open
  scrolling is locked on this element. Because `-webkit-overflow-scrolling: touch` is used on this
  element it must not contain, except for `.ksl-asset-menu` elements, any fixed or absolute
  position elements. Place these elements in the `.ddm-menu-container__inner` element if you want them to move with the
  page. Any elements that you want to scroll as part of the page belong in here.
+ The `.ddm-menu` elements are positioned absolute to the `.ddm-menu-container__inner` element. They can be
  placed anywhere inside the `.ddm-menu-container__inner` element, even in `.ddm-menu-container__content`, but must have static position
  parents all the way up to the `.ddm-menu-container__inner` element. Nesting them in `.ddm-menu-container__content` allows you to design
  them responsively, for example, as a menu on smaller screens, but as a sidebar on larger screens.

Initializing the menu is simple. Here is code from the demo page:

```javascript
$(function () {

  ddm.menu($('.menu-left')).addToggles(
    $('.menu-left .head'),
    $('.header .menu-left-toggle')
  );

  ddm.menu($('.menu-right')).addToggles(
    $('.menu-right .head'),
    $('.header .menu-right-toggle')
  );

});
```

In the past we tried to wire up toggles for you for free but decided explicitly registering toggles
with your menus is cleaner and easier to manage.


## Right Menu

Just add the `ddm-menu--right` modifier class to the menu element:

```html
<div class="ddm-menu ddm-menu--right">
  <div class="ddm-menu__inner">
    <!-- menu content here! -->
  </div>
</div>
```


## API

### `ddm.menu($element)`

Constructs a new menu object.

| Parameter  | Type   | Description                            |
|------------|--------|----------------------------------------|
| `$element` | jQuery | jQuery object that represents element. |

Returns a `Menu` object.


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

All DDM Menu events are namespaced with `.ddm.menu`.