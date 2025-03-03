# alpine-prefetch

An AlpineJs directive to prefetch on page links on hover and viewport intersection. Add the `x-prefetch` directive to any `<a href="...">` tag to have it automatically preteched using the `<link>` element.

By default the prefetch will occur when the user mouses over a link with the `x-prefetch` directive. For mobile devices, since they don't support mouse events, the link will prefetch when the link is scrolled into the viewport the first time.

```html
<!-- The below link with prefetch on either mouseover or viewport intersection -->
<a href="https://my-awesome-site.com/page-1" x-data x-prefetch> Page 1 </a>

<!-- The below link will only prefetch on mouseover -->
<a href="https://my-awesome-site.com/page-2" x-data x-prefetch.mouse>
    Page 2
</a>

<!-- The below link will only prefetch on viewport intersection -->
<a href="https://my-awesome-site.com/page-3" x-data x-prefetch.intersect>
    Page 3
</a>
```

## Installation

-   Run `npm install alpine-prefetch --save`.

## Usage

Import the plugin, you can name it anything (for example Prefect) and then set it as an Alpine plugin.

```js
// Import
import Alpine from "alpinejs";
import Prefetch from "alpine-prefetch";

// Set as alpine.js plugin
Alpine.plugin(Prefetch);

// Start alpine.js
Alpine.start();
```
