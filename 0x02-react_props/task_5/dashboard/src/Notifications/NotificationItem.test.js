import React from 'react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('NotificationItem Renders', () => {
  const NI = shallow(<NotificationItem />);
  const typeValue = shallow(<NotificationItem value='test' />);
  const typeHtml = shallow(<NotificationItem type='urgent' html={{ __html: '<u>test</u>' }} />);

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
});
