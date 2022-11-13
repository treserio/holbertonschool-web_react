import React from 'react';
import ReduxWrapper from '../HOC/ReduxWrapper';
import Notifications from '../Notifications/Notifications';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';
import { mount } from 'enzyme';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('ReduxWrapper Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    store.clearActions();
  });

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

  fetch.mockResponseOnce(JSON.stringify({ thing: 'stuff' }));
  const wrappedNotes = mount(
    <Provider store={store}>
      <ReduxWrapper
        wrapped={Notifications}
        displayDrawer={true}
      />
    </Provider>
  );

  const ul = wrappedNotes.find('ul');
  const p = wrappedNotes.find('p');

  it('without crashing', () => {
    expect(wrappedNotes.length).toEqual(1);
    expect(store.getActions())
      .toEqual(
        expect.arrayContaining([
          { type: 'SET_LOADING_STATE', loading: true },
          { type: 'SET_LOADING_STATE', loading: false },
          { type: 'SET_NOTIFICATIONS', data: { thing: 'stuff' } },
          // since the meta.requestId changes on call need partial match here
          expect.objectContaining({
            type: 'notes/fetchNotes/fulfilled',
          }),
        ])
      );
    // expect(out).toHaveBeenCalledWith('fetchNotifications missing');
  });

  it('menuItem without displayDrawer and not with', () => {
    expect(wrappedNotes.find('.menuItem').length).toEqual(0);
  });

  it('Notifications class div when displayDrawer=true', () => {
    expect(wrappedNotes.find('.Notifications').length).toEqual(1);
  });

  it('ul with li x3', () => {
    expect(ul.children().length).toEqual(3);
  });

  it('correct p tag', () => {
    expect(p.text()).toEqual('Here is the list of notifications');
  });

  it('li items correctly', () => {
    expect(ul.children().first().render()[0].attribs['data-priority']).toEqual('default');
    expect(ul.children().first().render()[0].children[0].data).toEqual('Test 1');
    expect(ul.children().at(1).render()[0].attribs['data-priority']).toEqual('urgent');
    expect(ul.children().at(1).render()[0].children[0].data).toEqual('Test 2');
    // html returns a strong div inside the li, much more difficult to confirm all values
    expect(ul.children().last().props().type).toEqual('urgent');
    expect(ul.children().last().props().html).toEqual({ __html: getLatestNotification() });
  });

  it('li items run onClick correctly', () => {
    const liList = wrappedNotes.find('li');
    liList.first().simulate('click');
    liList.at(1).simulate('click');
    liList.last().simulate('click');
    expect(store.getActions())
      .toEqual(
        expect.arrayContaining([
          { type: 'MARK_AS_READ', index: '1' },
          { type: 'MARK_AS_READ', index: '2' },
          { type: 'MARK_AS_READ', index: '3' },
        ])
      );
  });

  it('buttons that dispatch the correct action to change our notes.filter', () => {
    const buttons = wrappedNotes.find('button');
    buttons.first().simulate('click');
    buttons.at(1).simulate('click');
    expect(store.getActions())
      .toEqual(
        expect.arrayContaining([
          { 'filter': 'URGENT', 'type': 'SET_TYPE_FILTER' },
          { 'filter': 'DEFAULT', 'type': 'SET_TYPE_FILTER' },
        ])
      );
  });
});
