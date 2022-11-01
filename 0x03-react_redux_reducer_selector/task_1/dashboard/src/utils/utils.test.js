import { getFullYear, getFooterCopy, getLatestNotification } from './utils';
import { assert } from 'chai';

describe('Utils', () => {
  describe('getFullYear', () => {
    it('returns the current year', () => {
      assert.equal(getFullYear(), new Date().getFullYear());
    });
  });

  describe('getFooterCopy', () => {
    it('returns the right string when passing true', () => {
      assert.equal(getFooterCopy(true), 'Holberton School');
    });

    it('returns the right string when passing false', () => {
      assert.equal(getFooterCopy(false), 'Holberton School main dashboard');
    });
  });

  describe('getLatestNotification', () => {
    it('returns the right string', () => {
      assert.equal(
        getLatestNotification(),
        '<strong>Urgent requirement</strong> - complete by EOD'
      );
    });
  });
});
