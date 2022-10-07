import React from 'react';
import Notifications from './Notifications';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('Notifications component', () => {
  const notifications = shallow(<Notifications />);
  const ul = notifications.find('ul');
  const p = notifications.find('p');

  it('renders without crashing', () => {
    assert.equal(notifications.length, 1)
  });

  it('Notifications renders 3 list items', () => {
    assert.equal(ul.children().length, 3);
  });

  it('Notifications renders correct p tag', () => {
    assert.equal(p.text(), 'Here is the list of notifications');
  });

  it('li items render correctly', () => {
    assert.equal(ul.children().first().render()[0].attribs['data-priority'], 'default');
    assert.equal(ul.children().first().render()[0].children[0].data, 'New course available');
  });
});
