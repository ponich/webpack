import "styles/app.scss"
import jquery from "jquery";
import bootstrap from "bootstrap";

//
//window._ = require('lodash');
window.Popper = require('popper.js').default;
window.$ = window.jQuery = jquery;

//
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';