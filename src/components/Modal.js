import keyCodes from "../utils/keyCodes";

export default class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._content = null;
    this.render();
  }

  set content(value) {
    this._content = value;
    this.renderContent();
  }

  get content() {
    return this._content;
  }

  renderContent() {
    this.shadowRoot.querySelector('.content-placeholder').innerHTML = this._content;
    this.shadowRoot.querySelector('.modal').classList.add('show-modal');
  }

  disconnectedCallback() {
    const closeButton = this.shadowRoot.querySelector('.close-button');
    closeButton.removeEventListener('click');
    document.removeEventListener('keydown');
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .modal {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transform: scale(1.1);
          transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
        }
        .modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 1rem 1.5rem;
          width: 50rem;
          border-radius: 0.5rem;
        }
        .close-button {
          float: right;
          width: 1.5rem;
          line-height: 1.5rem;
          text-align: center;
          margin-top: -3rem;
          margin-right: -3rem;
          cursor: pointer;
          color: violet;
          background-color: black;
          border-radius: 1rem;
        }
        .show-modal {
          opacity: 1;
          visibility: visible;
          transform: scale(1.0);
          transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
        }
        .fill-image {
          border-radius: 4px;
          background-position: center;
          background-size: cover;
        }
        .fill-image:before {
          content: '';
          display: block;
          padding-bottom: calc(100% * 9/16);
        }
      </style>
      <div class="modal">
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <div class="content-placeholder"></div>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const closeButton = this.shadowRoot.querySelector('.close-button');
    const modal = this.shadowRoot.querySelector('.modal');

    function toggleModal() {
      modal.classList.toggle('show-modal');
    }

    // Attach event listeners
    closeButton.addEventListener('click', toggleModal);
    document.addEventListener('keydown', (event) => {
      const { keyCode } = event;
      if (keyCode === keyCodes.esc) {
        toggleModal();
      }
    });
  }
}

window.customElements.define('ml-modal', Modal);
