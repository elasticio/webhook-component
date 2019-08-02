'use strict';
const Q = require('q');
const debug = require('debug')('webhook:receive');

// eslint-disable-next-line func-names
exports.process = function (msg) {
    const msgId = msg.id;
    debug('Received new message with id', msg);

    if (msg.body) {
        if (msg.query) {
            msg.body._query = msg.query;
        }

        if (msg.headers) {
            msg.body._headers = msg.headers;
        }
        if (msg.method) {
            msg.body._method = msg.method;
        }

        if (msg.url) {
            msg.body._url = msg.url;
        }

        if (msg.additionalUrlPath) {
            msg.body._additionalUrlPath = msg.additionalUrlPath;
        }

        debug('Updated body', msg.body);
    }

    // eslint-disable-next-line consistent-this
    let self = this;

    function emitData() {
        debug('Emitting data of message:', msgId);
        self.emit('data', msg);
    }

    function onError(e) {
        debug(e);
        self.emit('error', e);
    }

    function onEnd() {
        debug('Finished processing message:', msgId);
        self.emit('end');
    }

    Q()
        .then(emitData)
        .fail(onError)
        .finally(onEnd);
};

