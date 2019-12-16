export default class Component extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.render(shadow);
  }


  render(shadowRoot) {
    throw new Error('Please implement render(shadowRoot)')
  }
}
