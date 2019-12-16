import './SearchBar';
import './ImageGrid';

export default class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <ml-search-bar></ml-search-bar>
      <ml-image-grid></ml-image-grid>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('ml-search-bar').addEventListener('submit', (event) => {
      this.shadowRoot.querySelector('ml-image-grid').items = event.detail.items;
    });
  }
}

window.customElements.define('ml-app', App);
