export async function receive(msg) {
  const msgId = msg.id;
  this.logger.info('Received new message');

  if (msg.body) {
    const propertiesToAssign = ['query', 'headers', 'method', 'url', 'additionalUrlPath'];

    propertiesToAssign.forEach((prop) => {
      if (msg[prop]) {
        msg.body[`_${prop}`] = msg[prop];
      }
    });
  }

  this.logger.info('Emitting data of message');
  this.logger.trace('Emitting data of message: ', msgId);
  await this.emit('data', msg);
  this.logger.info('Data emitted');
}

module.exports.process = receive;
