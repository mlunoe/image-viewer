export default class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, prevValue, value) {
    if (prevValue === value) {
      return;
    }

    this.shadowRoot.querySelector(`.${name}`).innerText = value;
  }


  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          color: darkblue;
        }
      </style>
      <h1>
        Hello <span class="name"></span>
      </h1>
      <button class="button">Click me!</button>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('.button').addEventListener('click', (event) => {
      this.shadowRoot.querySelector('.name').innerText = 'Shadow!';
    });
  }
}

window.customElements.define('ml-app', App);
