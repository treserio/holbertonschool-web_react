import React from 'react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';
import { assert } from 'chai';

global.console.log = jest.fn()

describe('NotificationItem Renders', () => {
  const out = jest.spyOn(console, "log");
  const NI = shallow(<NotificationItem />);
  const typeValue = shallow(<NotificationItem value='test' markAsRead={() => console.log('Test 2')} />);
  const typeHtml = shallow(<NotificationItem type='urgent' html={{ __html: '<u>test</u>' }} markAsRead={() => console.log('Test 3')} />);

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
    expect(out).toHaveBeenCalledWith('markAsRead missing');
    typeValue.props().onClick();
    expect(out).toHaveBeenCalledWith('Test 2');
    typeHtml.props().onClick();
    expect(out).toHaveBeenCalledWith('Test 3');
  });
});
