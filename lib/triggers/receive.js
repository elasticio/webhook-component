'use strict';
const Q = require('q');

// eslint-disable-next-line func-names
exports.process = function (msg) {
    const msgId = msg.id;
    // eslint-disable-next-line no-console
    console.log('Received new message with id', msg);

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

        // eslint-disable-next-line no-console
        console.log('Updated body', msg.body);
    }

    // eslint-disable-next-line consistent-this
    let self = this;

    function emitData() {
        // eslint-disable-next-line no-console
        console.log('Emitting data of message:', msgId);
        self.emit('data', msg);
    }

    function onError(e) {
        // eslint-disable-next-line no-console
        console.log(e);
        self.emit('error', e);
    }

    function onEnd() {
        // eslint-disable-next-line no-console
        console.log('Finished processing message:', msgId);
        self.emit('end');
    }

    Q()
        .then(emitData)
        .fail(onError)
        .finally(onEnd);
};

