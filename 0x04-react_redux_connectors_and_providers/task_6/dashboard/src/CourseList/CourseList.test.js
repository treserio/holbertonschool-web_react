import React from 'react';
import CourseList, { ReduxCourses } from './CourseList';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';
import { List } from 'immutable';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('CourseList Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const courses = List([
    { id: '1', name: 'Test 1', credit: 10, isSelected: false },
    { id: '2', name: 'Test 2', credit: 20, isSelected: false },
    { id: '3', name: 'Test 3', credit: 30, isSelected: false },
  ]);

  const initStore = mockStore([thunk]);
  let store = initStore({
    courses: List([]),
  })
  // no courses
  let store2 = initStore({
    courses,
  })
  fetch.mockResponseOnce(JSON.stringify([]));
  const noCourseList = mount(
    <Provider store={store}>
      <ReduxCourses />
    </Provider>
  );

  fetch.mockResponseOnce(JSON.stringify([]));
  const courseList = mount(
    <Provider store={store2}>
      <ReduxCourses />
    </Provider>
  );

  const noListRows = noCourseList.find('CourseListRow');
  const listCoursesR = courseList.find('CourseListRow');

  it('without crashing', () => {
    assert.equal(noCourseList.length, 1);
    assert.equal(courseList.length, 1);
  });

  it('with listCourses: 5 rows with array of 3', () => {
    assert.equal(listCoursesR.length, 5);
  });

  it('with listCourses: correct text in rows', () => {
    assert.equal(listCoursesR.at(2).render().find('td').first().text(), 'Test 1');
    assert.equal(listCoursesR.at(2).render().find('td').last().text(), 10);
    assert.equal(listCoursesR.at(3).render().find('td').first().text(), 'Test 2');
    assert.equal(listCoursesR.at(3).render().find('td').last().text(), 20);
    assert.equal(listCoursesR.at(4).render().find('td').first().text(), 'Test 3');
    assert.equal(listCoursesR.at(4).render().find('td').last().text(), 30);
  });

  it('correct actions dispatched to the store', () => {
    // console.log(store.getActions());
    expect(store.getActions())
      .toEqual(
        expect.arrayContaining([
          { type: 'SET_COURSES', data: [] },
          // since the meta.requestId changes on call need partial match here
          expect.objectContaining({
            type: 'courses/fetchCourses/fulfilled',
            payload: undefined,
          }),
        ])
      );
  });

  it('Not listCourses: 3 rows', () => {
    assert.equal(noListRows.length, 3);
  });

  it('Not listCourses: correct text in the last row', () => {
    assert.equal(noListRows.last().render().find('th').text(), 'No course available yet');
  });

});
