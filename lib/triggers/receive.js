exports.process = async function receive(msg) {
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

    this.logger.info('Emitting data of message: ', msgId);
    await this.emit('data', msg);
    this.logger.info('Data emitted');
};

