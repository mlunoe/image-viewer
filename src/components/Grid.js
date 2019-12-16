export default class Grid extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this._children = [];
    this.render();
  }

  set children(value) {
    this._children = value;
    this.renderChildren();
  }

  get children() {
    return this._children;
  }

  renderChildren() {
    const children = this.children.map((child) => {
      return (
        `<div class="grid-item">
          ${child}
        </div>`
      );
    });

    this.shadowRoot.querySelector('.grid').innerHTML = children.join('\n');
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .grid {
          display: flex;
          flex-wrap: wrap;
        }

        .grid-item {
          width: 100%;
        }

        @media (min-width: 768px) {
          .grid-item {
            flex: 1;
          }

          .grid--fit > .grid-item {
            flex: 1;
          }

          .grid--full > .grid-item {
            flex: 0 0 100%;
          }

          .grid--1of2 > .grid-item {
            flex: 0 0 50%;
            width: 50%;
          }

          .grid--1of3 > .grid-item {
            flex: 0 0 33.3333%;
            width: 33.3333%;
          }

          .grid--1of4 > .grid-item {
            flex: 0 0 25%;
            width: 25%;
          }
        }

        .thumbnail {
          background-color: $white;
          border-radius: 4px;
          border: 1px solid $gray;
          box-shadow: 1px 1px 5px $black;
          padding: 5px;
        }
        .fill-image {
          border-radius: 4px;
          background-position: center;
          background-size: cover;
          cursor: pointer;
        }
        .fill-image:before {
          content: '';
          display: block;
          padding-bottom: calc(100% * 9/16);
        }
      </style>
      <div class="grid grid grid--1of4">
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      let node = event.target;
      // Walk up dom tree to first element from event.target with `data-src`,
      // stop if we reach the image grid node
      while (typeof node.getAttribute === 'function' && typeof node.getAttribute('data-src') !== 'string' && node !== this) {
        node = node.parentNode;
      }

      const src = node.getAttribute('data-src');
      if (typeof src !== 'string') {
        // TODO: Handle error
        console.error('Did not find node with data-src');
        return;
      }
      this.dispatchEvent(new CustomEvent('click', { detail: src }));
    })
  }
}

window.customElements.define('ml-grid', Grid);
