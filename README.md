# Menu

Creates an offscreen menu. See the [example](http://ui.deseretdigital.com/ddm-menu/)
for working examples.


## Bower

```shell
bower install --save ddm-menu
```


## Setup

Attach files:

```html
<link href="menu.css" rel="stylesheet" />
<script src="menu.js"></script>
```

The menu also relies on jQuery, which you probably already have somewhere.

The menu requires the following markup:

```html
<body>

  <div class="ddm-menu-container">
      <div class="ddm-menu-container__content">

        <!-- your menus and content here. -->

        <div class="ddm-menu">
          <!-- menu content here! -->
        </div>

        <!-- your content here! -->

      </div>
  </div><!-- /.ddm-menu-container -->

</body>
```

Initializing the menu is simple. Here is code from the demo page:

```javascript
// initialize left menu
$(function () {
  var menu = ddm.menu($('#left-menu-example'));
  menu.addToggles(
    $('#left-menu-example .my-menu__toggle'),
    $('#left-menu-example-toggle')
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
```

In the past we tried to wire up toggles for you for free but decided explicitly
registering toggles with your menus is cleaner and easier to manage.


## Right Menu

Just add the `ddm-menu--right` modifier class to the menu element:

```html
<div class="ddm-menu ddm-menu--right">
  <!-- menu content here! -->
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
