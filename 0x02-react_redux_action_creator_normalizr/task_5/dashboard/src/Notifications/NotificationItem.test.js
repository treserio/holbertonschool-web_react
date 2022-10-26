import React from 'react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';

global.console.log = jest.fn()

describe('NotificationItem Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const out = jest.spyOn(console, "log");
  const NI = shallow(<NotificationItem id={1} />);
  const typeValue = shallow(<NotificationItem id={2} value='test' />);
  const typeHtml = shallow(<NotificationItem id={3} type='urgent' html={{ __html: '<u>test</u>' }} />);

  it('without crashing', () => {
    assert.equal(NI.length, 1);
    assert.equal(typeValue.length, 1);
    assert.equal(typeHtml.length, 1);
  });

  it('with correct data properties & html', () => {
    assert.equal(typeValue.props()['data-priority'], 'default');
    assert.equal(typeValue.text(), 'test');
    assert.equal(typeHtml.props()['data-priority'], 'urgent');
    assert.equal(typeHtml.text(), '');
    assert.equal(typeHtml.props().dangerouslySetInnerHTML.__html, '<u>test</u>');
  });

  it('with onClick function that logs correct text', () => {
    NI.props().onClick();
    expect(out).toHaveBeenCalledWith('Notification 1 has been marked as read')
    typeValue.props().onClick();
    expect(out).toHaveBeenCalledWith('Notification 2 has been marked as read')
    typeHtml.props().onClick();
    expect(out).toHaveBeenCalledWith('Notification 3 has been marked as read')
  });
});
