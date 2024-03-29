import React from 'react';
import Notifications from './Notifications';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';

global.console.log = jest.fn()

const listNotifications = [
  { id: 1, type: 'default', value: 'Test 1' },
  { id: 2, type: 'urgent', value: 'Test 2' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

const sameLN = [
  { id: 1, type: 'urgent', value: 'should have failed' },
  { id: 2, type: 'default', value: 'should have failed' },
  { id: 3, type: 'default', html: { __html: 'should have failed' } },
];

const biggerLN = [
  { id: 1, type: 'default', value: 'Test 1' },
  { id: 2, type: 'urgent', value: 'Test 2' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  { id: 4, type: 'default', value: 'Test 4' },
];

describe('Notifications Renders', () => {
  const out = jest.spyOn(console, "log");

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  // setProps won't process on shallow, need to use mount
  const notificationsOn = mount(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
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
    assert.equal(notificationsOff.find('.menuItem').length, 1);
    assert.equal(notificationsOn.find('.menuItem').length, 0);
    assert.equal(noListNotes.find('.menuItem').length, 0);
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
    assert.equal(noListNotes.find('ul').length, 0);
    assert.equal(noListNotes.find('p').text(), 'No new notification for now');
  });

  it('li items run onClick correctly', () => {
    const render = mount(<ul>{ul.children()}</ul>);
    render.find('li').first().simulate('click');
    expect(out).toHaveBeenCalledWith('Notification 1 has been marked as read');
    render.find('li').at(1).simulate('click');
    expect(out).toHaveBeenCalledWith('Notification 2 has been marked as read');
    render.find('li').last().simulate('click');
    expect(out).toHaveBeenCalledWith('Notification 3 has been marked as read');
  });

  it('an update when listNotifications.length > previous, else No update', () => {
    expect(notificationsOn.instance().shouldComponentUpdate({listNotifications: sameLN, displayDrawer: true})).toBe(false);
    expect(notificationsOn.setProps({listNotifications: sameLN}).find('ul').children().length).toBe(3);
    expect(notificationsOn.instance().shouldComponentUpdate({listNotifications: [], displayDrawer: true})).toBe(false);
    expect(notificationsOn.setProps({listNotifications: [] }).find('ul').children().length).toBe(3);
    // seems that props update regardless on setProps, but child rendering remains untouched
    // console.log(notificationsOn.props())
    assert.equal(notificationsOn.find('ul').children().first().render()[0].attribs['data-priority'], 'default');
    assert.equal(notificationsOn.find('ul').children().first().render()[0].children[0].data, 'Test 1');
    assert.equal(notificationsOn.find('ul').children().at(1).render()[0].attribs['data-priority'], 'urgent');
    assert.equal(notificationsOn.find('ul').children().at(1).render()[0].children[0].data, 'Test 2');
    assert.equal(notificationsOn.find('ul').children().last().props().type, 'urgent');
    assert.notStrictEqual(ul.children().last().props().html, { __html: getLatestNotification() });

    expect(notificationsOn.instance().shouldComponentUpdate({listNotifications: biggerLN})).toBe(true);
    expect(notificationsOn.setProps({listNotifications: biggerLN}).find('ul').children().length).toBe(4);
    assert.equal(notificationsOn.find('ul').children().first().render()[0].attribs['data-priority'], 'default');
    assert.equal(notificationsOn.find('ul').children().first().render()[0].children[0].data, 'Test 1');
    assert.equal(notificationsOn.find('ul').children().at(1).render()[0].attribs['data-priority'], 'urgent');
    assert.equal(notificationsOn.find('ul').children().at(1).render()[0].children[0].data, 'Test 2');
    assert.equal(notificationsOn.find('ul').children().at(2).props().type, 'urgent');
    assert.notStrictEqual(notificationsOn.find('ul').children().at(2).props().html, { __html: getLatestNotification() });
    assert.equal(notificationsOn.find('ul').children().last().render()[0].attribs['data-priority'], 'default');
    assert.equal(notificationsOn.find('ul').children().last().render()[0].children[0].data, 'Test 4');
  });
});
