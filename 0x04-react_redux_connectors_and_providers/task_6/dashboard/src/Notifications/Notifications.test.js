import React from 'react';
import Notifications, { ReduxNotes } from './Notifications';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import fetchMock from 'jest-fetch-mock';

global.console.log = jest.fn();
fetchMock.enableMocks();

// const sameLN = [
//   { id: '1', type: 'urgent', value: 'should have failed' },
//   { id: '2', type: 'default', value: 'should have failed' },
//   { id: '3', type: 'default', html: { __html: 'should have failed' } },
// ];

// const biggerLN = [
//   { id: '1', type: 'default', value: 'Test 1' },
//   { id: '2', type: 'urgent', value: 'Test 2' },
//   { id: '3', type: 'urgent', html: { __html: getLatestNotification() } },
//   { id: '4', type: 'default', value: 'Test 4' },
// ];

describe('Notifications Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  // const out = jest.spyOn(console, "log");
  const notifications = [
    { id: '1', type: 'default', value: 'Test 1' },
    { id: '2', type: 'urgent', value: 'Test 2' },
    { id: '3', type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  const initStore = mockStore([thunk]);
  let store = initStore({
    notes: Map({
      filter: 'DEFAULT',
      loading: false,
      notifications,
    })
  });
  let storeNoList = initStore({
    notes: Map({
      filter: 'DEFAULT',
      loading: false,
      notifications: [],
    })
  });

  // setProps won't process on shallow, need to use mount
  fetch.mockResponseOnce(JSON.stringify({ thing: 'stuff' }));
  const notificationsOn = mount(
    <Provider store={store}>
      <ReduxNotes displayDrawer={true} />
    </Provider>
  );
  fetch.mockResponseOnce(JSON.stringify({ thing: 'stuff' }));
  const notificationsOff = mount(
    <Provider store={store}>
      <ReduxNotes displayDrawer={false} />
    </Provider>
  );
  fetch.mockResponseOnce(JSON.stringify({ thing: 'stuff' }));
  const noListNotes = mount(
    <Provider store={storeNoList}>
      <ReduxNotes displayDrawer={true} />
    </Provider>
  );

  const ul = notificationsOn.find('ul');
  const p = notificationsOn.find('p');

  it('without crashing', () => {
    assert.equal(notificationsOn.length, 1)
    assert.equal(notificationsOff.length, 1)
  });

  it('menuItem with displayDrawer and not without', () => {
    assert.equal(notificationsOff.find('.menuItem').length, 1);
    assert.equal(notificationsOn.find('.menuItem').length, 0);
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
    const liList = notificationsOn.find('li');
    liList.first().simulate('click');
    liList.at(1).simulate('click');
    liList.last().simulate('click');
    expect(store.getActions())
      .toEqual(
        expect.arrayContaining([
          { type: 'MARK_AS_READ', index: '1' },
          { type: 'MARK_AS_READ', index: '2' },
          { type: 'MARK_AS_READ', index: '3' },
          // since the meta.requestId changes on call need partial match here
          expect.objectContaining({
            type: 'notes/fetchNotes/fulfilled',
          }),
        ])
      );
  });
});
