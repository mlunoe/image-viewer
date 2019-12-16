Image Viewer
===

A minimal Image Viewer application in plain JavaScript using the shadow dom and web components, which is supported in Firefox (63 and onwards), Chrome, Opera, Safari, and the new Chromium-based Edge (75 and onwards). This application is used as an example for testing the abilities and limitations of the shadow dom and web components: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.

See an example usage here: [SearchBar.js](https://github.com/mlunoe/image-viewer/blob/master/src/components/SearchBar.js).

### Usage

Tested on Chrome v78.0.3904.108, Firefox v71.0, and Safari v13.0.3

```
$ yarn
$ yarn start
$ open http://localhost:8080
```

See it running here [https://mlunoe.github.io/image-viewer](https://mlunoe.github.io/image-viewer/)

<img src="https://raw.githubusercontent.com/mlunoe/image-viewer/master/screenshots/image-viewer.png" width="75%" />

### Focus:
- The focus of this application is on building out a modular application structure with self-contained components
- The main building blocks of the app is the shadow dom and custom events.

### Limitations
- This application is built without Babel polyfill or any JavaScript framework or libraries
- There is still some polish left to do there for it to be super appealing visually
- Using JSONP, which is a hacky way of working around cross origin issues (it also has the problem of not being cancellable and not handling errors very well). This app should really have its own server to request content from
- A bug where the image viewer re-displays after closing it and hitting an arrow key
- Very rudimentary error handling in the application
- Images that do not follow the 9/16 ratio get cut off in thumbnails and modal to fit the ratio, in order to make the elements look nice

### Features
- The page displays images from the Flickr feed
- Typing something in the search bar and hitting enter or clicking "search" will display images from that search
- Clicking an image opens the image viewer modal
- When the modal is open you can use the left and right arrow keys to navigate back and forth
- When the modal is open you can click close button (×) to close the modal, or use the esc key

### License
Copyright (c) 2016, [@mlunoe](https://github.com/mlunoe)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
