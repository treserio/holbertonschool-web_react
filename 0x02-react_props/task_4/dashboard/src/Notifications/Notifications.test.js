import React from 'react';
import Notifications from './Notifications';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('Notifications Renders', () => {
  // add test for displayDrawer={false}
  const notificationsOn = shallow(<Notifications displayDrawer={true} />);
  const notificationsOff = shallow(<Notifications />);
  const ul = notificationsOn.find('ul');
  const p = notificationsOn.find('p');

  it('without crashing', () => {
    assert.equal(notificationsOn.length, 1)
    assert.equal(notificationsOff.length, 1)
  });

  it('menuItem with or without displayDrawer', () => {
    assert.equal(notificationsOn.find('.menuItem').length, 1);
    assert.equal(notificationsOff.find('.menuItem').length, 1);
  });

  it('Notifications class div when displayDrawer=true, & Not when false', () => {
    assert.equal(notificationsOn.find('.Notifications').length, 1);
    assert.equal(notificationsOff.find('.Notifications').length, 0);
  });

  it('ul with li x3', () => {
    assert.equal(ul.children().length, 3);
  });

  it('correct p tag', () => {
    assert.equal(p.text(), 'Here is the list of notifications');
  });

  it('li items correctly', () => {
    assert.equal(ul.children().first().render()[0].attribs['data-priority'], 'default');
    assert.equal(ul.children().first().render()[0].children[0].data, 'New course available');
  });

});
