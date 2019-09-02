const Q = require('q');

// eslint-disable-next-line func-names
exports.process = function (msg) {
    const msgId = msg.id;
    this.logger.info('Received new message:\n', JSON.stringify(msg));

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

        this.logger.info('Updated body: \n', JSON.stringify(msg.body));
    }

    // eslint-disable-next-line consistent-this
    let self = this;

    function emitData() {
        self.logger.info('Emitting data of message: ', msgId);
        self.emit('data', msg);
    }

    function onError(e) {
        self.logger.info(e);
        self.emit('error', e);
    }

    function onEnd() {
        self.logger.info('Finished processing message: ', msgId);
        self.emit('end');
    }

    Q()
        .then(emitData)
        .fail(onError)
        .finally(onEnd);
};

