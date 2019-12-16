import getImageID from '../utils/getImageID';
import jsonp from '../utils/jsonp';

import './Grid';
import './Modal';

async function fetchLargeImage(link) {
  const imageID = getImageID(link);
  const url = `/rest/?method=flickr.photos.getSizes&api_key=1c00c6a8b785a5baf3fb98859ae3ed18&photo_id=${imageID}&format=json`;
  return jsonp(url, 'jsonFlickrFeed');
}

export default class ImageGrid extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this._items = [];
    this.render();
  }

  set items(value) {
    this._items = value;
    this.renderImages();
  }

  get items() {
    return this._items;
  }

  renderImages() {
    const images = this.items.map((item) => {
      return (
        `<div class="thumbnail">
          <div class="fill-image" style="background-image: url(${item.media.m})" data-src="${item.media.m}"></div>
        </div>`
      );
    });
    // Transfer images to ml-grid
    this.shadowRoot.querySelector('ml-grid').children = images;
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
      </style>
      <ml-modal></ml-modal>
      <ml-grid></ml-grid>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('ml-grid').addEventListener('click', async (event) => {
      const found = this.items.find(item => item.media.m === event.detail);
      if (!found) {
        // TODO: Handle error
        console.error('Did not find clicked image in list of items');
      }
      // TODO: Display loader
      const image = await fetchLargeImage(found.link);
      if (!image) {
        // TODO: Handle error
        console.error('Image failed to fetch');
      }
      const original = image.sizes.size.find(item => item.label === 'Original');
      this.shadowRoot.querySelector('ml-modal').content = `
        <div class="fill-image" style="background-image: url(${original.source})"></div>
      `;

    });
  }
}

window.customElements.define('ml-image-grid', ImageGrid);
