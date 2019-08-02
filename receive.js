"use strict";
const Q = require("q");

exports.process = function (msg, conf) {
    const msgId = msg.id;
    this.logger.info("Received new message with id", msgId);
    this.logger.info(msg);

    if (msg.query && msg.body) {
        msg.body._query = msg.query;
    }

    const self = this;

    Q()
        .then(emitData)
        .fail(onError)
        .finally(onEnd);

    function emitData() {
        self.logger.info("Emitting data of message:", msgId);
        self.emit('data', msg);
    }

    function onError(e) {
        self.logger.error(e);
        self.emit('error', e);
    }

    function onEnd() {
        self.logger.info("Finished processing message:", msgId);
        self.emit('end');
    }
};