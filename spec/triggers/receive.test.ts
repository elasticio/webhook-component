import { describe, it } from 'node:test';
import assert from 'node:assert';
import { receive } from '../../src/triggers/receive';
import { getContext } from '../common';

describe('Receive', () => {
  it('should add properties to msg.body when they are present', async () => {
    const msg = {
      id: 'testId',
      body: {},
      query: 'someQuery',
      headers: { key: 'value' },
      method: 'GET',
      url: 'http://example.com',
      additionalUrlPath: '/path'
    };

    const context = getContext();
    await receive.call(context, msg);

    assert.deepEqual(context.emit.mock.calls[0].arguments[1].body, {
      _query: 'someQuery',
      _headers: { key: 'value' },
      _method: 'GET',
      _url: 'http://example.com',
      _additionalUrlPath: '/path'
    });
  });

  it('should not modify msg.body if no properties are present', async () => {
    const msg = {
      id: 'testId',
      body: {}
    };

    const context = getContext();
    await receive.call(context, msg);
    assert.deepEqual(context.emit.mock.calls[0].arguments[1].body, {});
  });

  it('should only add present properties to msg.body', async () => {
    const msg = {
      id: 'testId',
      body: {},
      query: 'someQuery',
      url: 'http://example.com'
    };

    const context = getContext();
    await receive.call(context, msg);

    assert.deepEqual(context.emit.mock.calls[0].arguments[1].body, {
      _query: 'someQuery',
      _url: 'http://example.com'
    });
  });
});
