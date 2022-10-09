import React from 'react';
import Notifications from './Notifications';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import { getLatestNotification } from '../utils/utils';

const listNotifications = [
  { id: 1, type: 'default', value: 'Test 1' },
  { id: 2, type: 'urgent', value: 'Test 2' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

describe('Notifications Renders', () => {
  // add test for displayDrawer={false}
  const notificationsOn = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
  const notificationsOff = shallow(<Notifications />);
  const noListNotes = shallow(<Notifications displayDrawer={true} />);
  const ul = notificationsOn.find('ul');
  const p = notificationsOn.find('p');

  it('without crashing', () => {
    assert.equal(notificationsOn.length, 1)
    assert.equal(notificationsOff.length, 1)
    assert.equal(noListNotes.length, 1)
  });

  it('menuItem with or without displayDrawer', () => {
    assert.equal(notificationsOn.find('.menuItem').length, 1);
    assert.equal(notificationsOff.find('.menuItem').length, 1);
    assert.equal(noListNotes.find('.menuItem').length, 1);
  });

  it('Notifications class div when displayDrawer=true, & Not when false', () => {
    assert.equal(notificationsOn.find('.Notifications').length, 1);
    assert.equal(notificationsOff.find('.Notifications').length, 0);
    assert.equal(noListNotes.find('.Notifications').length, 1);
  });

  it('ul with li x3', () => {
    assert.equal(ul.children().length, 3);
  });

  it('correct p tag', () => {
    assert.equal(p.text(), 'Here is the list of notifications');
  });

  it('li items correctly', () => {
    assert.equal(ul.children().first().render()[0].attribs['data-priority'], 'default');
    assert.equal(ul.children().first().render()[0].children[0].data, 'Test 1');
    assert.equal(ul.children().at(1).render()[0].attribs['data-priority'], 'urgent');
    assert.equal(ul.children().at(1).render()[0].children[0].data, 'Test 2');
    // html returns a strong div inside the li, much more difficult to confirm all values
    assert.equal(ul.children().last().props().type, 'urgent');
    assert.notStrictEqual(ul.children().last().props().html, { __html: getLatestNotification() });
  });

  it('With displayDrawer & Not listNotifications: ul with 1 li and correct text', () => {
    assert.equal(noListNotes.find('ul').children().length, 1);
    assert.equal(noListNotes.find('ul').find('p').text(), 'No new notification for now');
  });
});
