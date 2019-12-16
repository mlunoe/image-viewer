import getImageID from '../utils/getImageID';
import jsonp from '../utils/jsonp';
import keyCodes from '../utils/keyCodes';

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

  disconnectedCallback() {
    this.shadowRoot.querySelector('ml-grid').removeEventListener('click');
    document.removeEventListener('keydown');
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
    const modal = this.shadowRoot.querySelector('ml-modal');
    const handleClick = async (event) => {
      const thumbnail = event.detail;
      this._lastShown = thumbnail;
      const found = this.items.find(item => item.media.m === thumbnail);
      if (!found) {
        alert('Did not find clicked image in list of items');
        return;
      }
      // TODO: Display loader
      const image = await fetchLargeImage(found.link);
      if (!image) {
        alert('Image failed to fetch');
        return;
      }
      let original = image.sizes.size.find(item => item.label === 'Original');
      if (!original || !original.source) {
        console.error('Did not find the original size image. Defaulting to thumbnail size');
        original = { source: thumbnail };
      }
      modal.content = `
        <div class="fill-image" style="background-image: url(${original.source})"></div>
      `;
    }
    this.shadowRoot.querySelector('ml-grid').addEventListener('click', handleClick);

    document.addEventListener('keydown', (event) => {
      const { keyCode } = event;

      if (this._lastShown && keyCode === keyCodes.leftArrow) {
        const foundIndex = this.items.findIndex(item => item.media.m === this._lastShown);
        const prevIndex = (this.items.length + foundIndex - 1) % this.items.length;
        handleClick({ detail: this.items[prevIndex].media.m });
      }
      if (this._lastShown && keyCode === keyCodes.rightArrow) {
        const foundIndex = this.items.findIndex(item => item.media.m === this._lastShown);
        const nextIndex = (foundIndex + 1) % this.items.length;
        handleClick({ detail: this.items[nextIndex].media.m });
      }
    });
  }
}

window.customElements.define('ml-image-grid', ImageGrid);
