import "styles/app.scss"
import jquery from "jquery";
import bootstrap from "bootstrap";
window.Popper = require('popper.js').default;

try {
    window.$ = window.jQuery = jquery;
} catch (e) {
}


