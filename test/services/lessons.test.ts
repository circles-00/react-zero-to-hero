import assert from 'assert';
import app from '../../src/app';

describe('\'Lessons\' service', () => {
  it('registered the service', () => {
    const service = app.service('lessons');

    assert.ok(service, 'Registered the service');
  });
});
