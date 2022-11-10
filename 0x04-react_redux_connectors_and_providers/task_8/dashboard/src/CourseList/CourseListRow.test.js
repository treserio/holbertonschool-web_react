import React from 'react';
import CourseListRow, { ReduxCourseRow } from './CourseListRow';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';
import mockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('CourseListRow Renders', () => {
  const initStore = mockStore();
  let store = initStore();

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const colSpan2 = shallow(<CourseListRow isHeader={true} textFirstCell='colSpan=2' />);
  const th2 = shallow(<CourseListRow isHeader={true} textFirstCell='First th' textSecondCell='Second th' />);
  const td2 = mount(
    <Provider store={store} >
      <table>
        <tbody>
          <ReduxCourseRow
            id='99'
            textFirstCell='First td'
            textSecondCell='Second td'
          />
        </tbody>
      </table>
    </Provider>
  );

  it('without crashing', () => {
    assert.equal(colSpan2.length, 1);
    assert.equal(th2.length, 1);
    assert.equal(td2.length, 1);
  });

  it('colSpan=2 th when isHeader=true & textSecondCell=null', () => {
    assert.equal(colSpan2.children().length, 1)
    assert.equal(th2.children().first().type(), 'th');
  });

  it('th x2 when isHeader=true & textSecondCell != null', () => {
    assert.equal(th2.children().length, 2);
    assert.equal(th2.children().first().type(), 'th');
  });

  it('td x2 when isHeader=false & textSecondCell != null', () => {
    assert.equal(td2.find('td').length, 2);
  });

  it('checkbox with label that changes the dispatches correct action', () => {
    assert.equal(td2.find('input').length, 1);
    assert.equal(td2.find('label').length, 1);
    td2.find('input').simulate('change');
    expect(store.getActions()).toEqual([ { type: 'SELECT_COURSE', index: '99' } ])
  });
})

