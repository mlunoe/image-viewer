require('./index.html');
require('./index.scss');

import './App';

document.querySelector('.app').innerHTML = `<ml-app name="world!"></ml-app>`;
setTimeout(() => {
    document.querySelector('.app').innerHTML = `<ml-app name="Yikes!"></ml-app>`;
}, 2000);
