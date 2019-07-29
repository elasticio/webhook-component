'use strict';
const request = require('./request.js');

exports.process = function (msg, conf, next) {
    request.get.call(this, msg, conf);
};
