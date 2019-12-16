import jsonp from '../utils/jsonp'

async function fetchImages(query = '') {
  const url = `/feeds/photos_public.gne?format=json&safe_search=1&media=photos&tags=${query}`;
  return jsonp(url, 'jsonFlickrFeed');
}

export default class SearchBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('form').removeEventListener('submit');
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        input {
          margin: 0.5rem;
          max-width: 100%;
          flex: 1 0 auto;
          outline: 0;
          text-align: left;
          line-height: 1.2em;
          font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
          padding: .67em 1em;
          background: #fff;
          border: 1px solid lightgray;
          border-radius: .28rem;
        }
        button {
          cursor: pointer;
          min-height: 1em;
          outline: 0;
          border: none;
          vertical-align: baseline;
          background: #2185d0 none;
          color: #fff;
          font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
          margin: 0 .25em 0 0;
          padding: .78571429em 1.5em .78571429em;
          text-transform: none;
          text-shadow: none;
          font-weight: 700;
          line-height: 1em;
          font-style: normal;
          text-align: center;
          text-decoration: none;
          border-radius: .28rem;
          box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
          user-select: none;
          transition: opacity .1s ease,background-color .1s ease,color .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
          transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;
          transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
          will-change: '';
        }
        button:hover {
          background-color: #1678c2;
        }
        button:active {
          background-color: #1a69a4;
        }
      </style>
      <div class="search-bar">
        <form>
          <input />
          <button type="submit">Search</button>
        </form>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const images = await fetchImages(this.shadowRoot.querySelector('input').value);
      if (!images || !Array.isArray(images.items) || images.items.length === 0) {
        alert('Did not find any images. Please try a different search query.');
        return;
      }
      this.dispatchEvent(new CustomEvent('submit', { detail: images }));
    }, false);
  }
}

window.customElements.define('ml-search-bar', SearchBar);
