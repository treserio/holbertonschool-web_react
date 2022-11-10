import * as courseActions from './courseActionCreators';
import fetchMock from 'jest-fetch-mock';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

fetchMock.enableMocks();

describe('courseActionCreators testing', () => {
  const data = ['a', 'b', 'c', 'd'];
  const initStore = mockStore([thunk]);
  let store = initStore();

  it('confirm selectCourse returns correct object', () => {
    expect(courseActions.selectCourse({ index: 1 }))
      .toEqual({
        type: 'SELECT_COURSE',
        index: 1,
      });
  });

  it('confirm unSelectCourse returns correct object', () => {
    expect(courseActions.unSelectCourse({ index: 1 }))
      .toEqual({
        type: 'UNSELECT_COURSE',
        index: 1,
      });
  });

  it('confirm setCourses returns correct object', () => {
    expect(courseActions.setCourses(data))
      .toEqual({
        type: 'SET_COURSES',
        data,
      });
  });

  it('confirm fetchCourses dispatches correct actions', () => {
    fetch.mockResponseOnce(JSON.stringify(data));
    // test the .then on the dispatch call to see all the dispatch inside the async thunk action
    store.dispatch(courseActions.fetchCourses())
      .then(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        // console.log(store.getActions());
        // confirm that all of the actions we expected to be called have been
        expect(store.getActions())
          .toEqual(
            expect.arrayContaining([
              { type: 'SET_COURSES', data: data },
              // since the meta.requestId changes on call need partial match here
              expect.objectContaining({
                type: 'courses/fetchCourses/fulfilled',
                payload: undefined,
              }),
            ])
          );
      });
  });
});
